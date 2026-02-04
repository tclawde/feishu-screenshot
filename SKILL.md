---
name: feishu-screenshot
description: Capture screenshot and send to Feishu chat via nodes tool + message image parameter.
metadata:
  {
    "openclaw":
      {
        "emoji": "📸",
        "os": ["darwin"],
        "requires": { "config": ["nodes.enabled", "channels.feishu"] },
      },
  }
---

# feishu-screenshot

Capture screen/area and send directly to Feishu chat.

## Usage

### Capture full screen + send

```bash
# Step 1: Capture screenshot
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -x /tmp/desktop.png'

# Step 2: Send to current chat (auto-detected chat)
message action:send channel:feishu image:/tmp/desktop.png
```

### Capture selection + send

```bash
# Interactive selection
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -ix /tmp/selection.png'

# Send with caption
message action:send channel:feishu image:/tmp/selection.png caption:"捕获的截图"
```

### Send to specific chat/user

```bash
# Send image to user
message action:send channel:feishu target:ou_xxx image:/tmp/desktop.png

# Send image to group
message action:send channel:feishu target:chat_xxx image:/tmp/desktop.png
```

### One-liner (full flow)

```bash
# Capture + send to current chat
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -x /tmp/desktop.png' && message action:send channel:feishu image:/tmp/desktop.png
```

## Message Tool Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | send | Send action |
| `channel` | feishu | Feishu channel |
| `image` | path | Image file path |
| `caption` | text | Optional caption |
| `target` | id | Optional target user/chat |

## Examples

```bash
# Full screen to current chat
message action:send channel:feishu image:/tmp/desktop.png

# Selection mode + caption
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -ix /tmp/sel.png'
message action:send channel:feishu image:/tmp/sel.png caption:"📸 捕获"

# To specific user
message action:send channel:feishu target:ou_715534dc247ce18213aee31bc8b224cf image:/tmp/desktop.png

# To group chat
message action:send channel:feishu target:chat_xxx image:/tmp/desktop.png
```

## Notes

- Requires `nodes.enabled` and Feishu channel configured
- Node must be "Apple的Mac mini" (macOS)
- Screenshots saved to `/tmp/*.png`
- Supports `screencapture` flags: `-i` (selection), `-x` (no sound), `-t png` (format)
- Use `caption` for image description

