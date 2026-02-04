# Feishu Screenshot Skill for OpenClaw

> Custom OpenClaw skill: capture screenshot and send directly to Feishu chat.

## Structure

```
scripts/
├── send_image.cjs       # 底层发送模块
├── feishu-capture.sh    # 一键截图
├── feishu-send.sh       # 发送指定文件到飞书
└── feishu-screenshot.sh # 一键截图+发送（组合脚本）
```

## Quick Start

```bash
cd ~/.openclaw/skills/feishu-screenshot/scripts

# 一键截屏并发送
./feishu-screenshot.sh "截图描述"

# 或分步骤
./feishu-capture.sh           # 截图
./feishu-send.sh /tmp/xxx.png # 发送
```

## Requirements

- macOS
- Node.js + npm install axios form-data
- Feishu App credentials (FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_RECEIVER_ID)

## Install

```bash
cd ~/.openclaw/skills/feishu-screenshot/scripts
npm install
```

## License

MIT

