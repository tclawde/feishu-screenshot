#!/bin/bash
# Feishu Send -发送指定文件到飞书
# Usage: ./feishu-send.sh <image_path> [caption]

IMAGE_PATH="${1:-}"
CAPTION="${2:-}"

if [ -z "$IMAGE_PATH" ]; then
    echo "Usage: ./feishu-send.sh <image_path> [caption]"
    echo "Example: ./feishu-send.sh /tmp/screenshot.png '截图说明'"
    exit 1
fi

if [ ! -f "$IMAGE_PATH" ]; then
    echo "❌ 文件不存在: $IMAGE_PATH"
    exit 1
fi

echo "📤 发送图片到飞书: $IMAGE_PATH"
[ -n "$CAPTION" ] && echo "📝 描述: $CAPTION"

cd "$(dirname "$0")"
node send_image.cjs "$IMAGE_PATH" "$CAPTION"
