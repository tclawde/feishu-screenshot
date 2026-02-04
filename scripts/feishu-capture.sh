#!/bin/bash
# Feishu Capture -一键截图脚本
# Usage: ./feishu-capture.sh [output_path]
# 默认保存到 /tmp/feishu_capture.png

OUTPUT_PATH="${1:-/tmp/feishu_capture.png}"

echo "📸 截取屏幕到: $OUTPUT_PATH"

# 交互式选择模式（可取消）
screencapture -t png -i "$OUTPUT_PATH"

if [ -f "$OUTPUT_PATH" ]; then
    echo "✅ 截图完成: $OUTPUT_PATH"
    ls -lh "$OUTPUT_PATH"
else
    echo "❌ 截图已取消"
    exit 1
fi
