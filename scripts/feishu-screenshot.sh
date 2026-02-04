#!/bin/bash
# Feishu Screenshot -一键截图+发送（组合脚本）
# Usage: ./feishu-screenshot.sh [caption]

CAPTION="${1:-Feishu 截图}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CAPTURE_PATH="/tmp/feishu_screenshot.png"

echo "📸 截取屏幕并发送到飞书..."
echo "📝 描述: $CAPTION"

# Step 1: 截图
"$SCRIPT_DIR/feishu-capture.sh" "$CAPTURE_PATH"

if [ ! -f "$CAPTURE_PATH" ]; then
    echo "❌ 截图失败"
    exit 1
fi

# Step 2: 发送
"$SCRIPT_DIR/feishu-send.sh" "$CAPTURE_PATH" "$CAPTION"

# 清理
rm -f "$CAPTURE_PATH"
echo "🧹 已清理临时文件"
