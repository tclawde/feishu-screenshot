---
name: feishu-screenshot
description: Capture screenshot and send to Feishu chat. Includes shell scripts for capture, send, and combined workflow.
metadata:
  {
    "openclaw":
      {
        "emoji": "📸",
        "os": ["darwin"],
        "requires": { "bins": ["node"], "env": ["FEISHU_APP_ID", "FEISHU_APP_SECRET", "FEISHU_RECEIVER_ID"] },
      },
  }
---

# feishu-screenshot

Custom OpenClaw skill for capturing screenshots and sending to Feishu.

## Structure

```
scripts/
├── send_image.cjs       # 底层发送模块
├── feishu-capture.sh    # 一键截图
├── feishu-send.sh       # 发送指定文件到飞书
└── feishu-screenshot.sh # 一键截图+发送（组合脚本）
```

## Environment Variables

```bash
export FEISHU_APP_ID="your_app_id"
export FEISHU_APP_SECRET="your_app_secret"
export FEISHU_RECEIVER_ID="receiver_open_id"  # 用户 open_id 或 chat_id
export FEISHU_RECEIVER_TYPE="open_id"         # open_id 或 chat_id
```

## Usage

### One-liner: Screenshot + Send

```bash
cd {baseDir}/scripts
./feishu-screenshot.sh "截图描述"
```

### Step by Step

```bash
# Step 1: 截图（交互式选择区域）
./feishu-capture.sh [output_path]
# 默认保存到 /tmp/feishu_capture.png

# Step 2: 发送图片到飞书
./feishu-send.sh <image_path> [caption]
# Example: ./feishu-send.sh /tmp/feishu_capture.png "今日报表"
```

### Direct Node Usage

```bash
cd {baseDir}/scripts

# 上传并发送
node send_image.cjs /tmp/screenshot.png "描述"

# 截图并发送（组合）
./feishu-screenshot.sh "捕获的截图"
```

## Examples

```bash
# 快速截屏并发送到飞书
cd ~/.openclaw/skills/feishu-screenshot/scripts
./feishu-screenshot.sh "桌面状态"

# 截取选择区域
./feishu-capture.sh
./feishu-send.sh /tmp/feishu_capture.png "选区截图"

# 发送已有文件
./feishu-send.sh ~/Downloads/image.png "图片分享"
```

## Requirements

- macOS (screencapture)
- Node.js + dependencies: axios, form-data
- Feishu App credentials (APP_ID, APP_SECRET)
- Receiver ID (open_id or chat_id)

## Install Dependencies

```bash
cd {baseDir}/scripts
npm install axios form-data
```
