# Feishu Screenshot Skill for OpenClaw

> Capture screenshot and send directly to Feishu chat.

## Usage

### Full Screen

```bash
# Capture
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -x /tmp/desktop.png'

# Send
message action:send channel:feishu image:/tmp/desktop.png
```

### Selection Mode

```bash
# Interactive selection
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -ix /tmp/sel.png'

# Send with caption
message action:send channel:feishu image:/tmp/sel.png caption:"捕获的截图"
```

### One-liner

```bash
nodes action:run node:"Apple的Mac mini" command:'screencapture -t png -x /tmp/desktop.png' && message action:send channel:feishu image:/tmp/desktop.png
```

## Requirements

- macOS (nodes tool)
- Feishu channel configured
- nodes.enabled = true

## License

MIT
