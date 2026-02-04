#!/usr/bin/env node
/**
 * Feishu Image Sender -底层发送模块
 * Usage: node send_image.cjs <image_path> [caption]
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
const FEISHU_RECEIVER_ID = process.env.FEISHU_RECEIVER_ID; // user_id or open_id
const FEISHU_RECEIVER_TYPE = process.env.FEISHU_RECEIVER_TYPE || 'open_id'; // open_id or chat_id

async function getTenantAccessToken() {
  const response = await axios.post(
    'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    {
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
    }
  );
  return response.data.tenant_access_token;
}

async function uploadImage(imagePath) {
  const token = await getTenantAccessToken();
  const form = new FormData();
  form.append('image_type', 'message');
  form.append('image', fs.createReadStream(imagePath));

  const response = await axios.post(
    'https://open.feishu.cn/open-apis/im/v1/messages/images',
    form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data.image_key;
}

async function sendImage(imageKey, caption = '') {
  const token = await getTenantAccessToken();
  const receiveIdType = FEISHU_RECEIVER_TYPE === 'chat_id' ? 'chat_id' : 'open_id';
  
  const response = await axios.post(
    `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receiveIdType}`,
    {
      receive_id: FEISHU_RECEIVER_ID,
      msg_type: 'image',
      content: JSON.stringify({ image_key: imageKey }),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}

async function main() {
  const imagePath = process.argv[2];
  const caption = process.argv[3] || '';

  if (!imagePath) {
    console.log('Usage: node send_image.cjs <image_path> [caption]');
    console.log('Env: FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_RECEIVER_ID, FEISHU_RECEIVER_TYPE');
    process.exit(1);
  }

  if (!fs.existsSync(imagePath)) {
    console.error(`Error: File not found: ${imagePath}`);
    process.exit(1);
  }

  try {
    console.log('📤 Uploading image...');
    const imageKey = await uploadImage(imagePath);
    console.log('✅ Uploaded, image_key:', imageKey);

    console.log('📨 Sending to Feishu...');
    const result = await sendImage(imageKey, caption);
    console.log('✅ Sent successfully! message_id:', result.data.message_id);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

main();
