# MCP Time Server

一个基于 FastMCP 框架开发的时间管理服务器，可以与 Cherry Studio、Cursor 等 AI 平台集成使用。

## 功能特性

### 🕐 时间查询
- 获取当前时间（标准格式 + 语义格式）
- 支持多种时间格式输出
- 本地时区自动识别

### ⏰ 提醒管理
- 设置基于时间的提醒
- 支持相对时间（如"10分钟后"）和绝对时间（ISO格式）
- 自动触发和状态管理
- 提醒确认和取消功能

### ⏱️ 倒计时功能
- 创建各种时长的倒计时
- 实时状态监控
- 自动完成通知
- 倒计时管理（取消、查看状态）

### 🔄 后台监控
- 独立后台服务持续监控
- 到点自动控制台输出提醒
- 数据持久化存储

## 安装和运行

### 1. 安装依赖
```bash
# 使用 uv（推荐）
uv sync

# 或使用 pip
pip install fastmcp mcp[cli]
```

### 2. 运行服务器
```bash
python main.py
```

### 3. 集成到 AI 平台

#### Cherry Studio 集成
在 Cherry Studio 中添加 MCP 服务器配置：
```json
{
  "name": "时间管理服务器",
  "command": "python",
  "args": ["path/to/main.py"],
  "env": {}
}
```

#### Cursor 集成
在 Cursor 中配置 MCP 服务器，可以在编码过程中调用时间相关功能。

## 可用工具

### 时间查询工具
- `get_current_time(format_type="both")` - 获取当前时间

### 提醒管理工具
- `set_reminder(time_str, message)` - 设置提醒
- `list_reminders(status="all")` - 查看提醒列表
- `check_triggered_reminders()` - 检查已触发的提醒
- `acknowledge_reminder(reminder_id)` - 确认提醒
- `cancel_reminder(reminder_id)` - 取消提醒

### 倒计时工具
- `start_countdown(duration, message="")` - 开始倒计时
- `list_countdowns(status="running")` - 查看倒计时列表
- `get_countdown_status(countdown_id)` - 获取倒计时状态
- `cancel_countdown(countdown_id)` - 取消倒计时

### 资源接口
- `time://current` - 当前时间资源
- `reminders://active` - 活跃提醒资源
- `countdowns://running` - 运行中的倒计时资源

## 使用示例

### 与 AI 对话示例

**查询时间：**
```
用户：现在几点了？
AI：调用 get_current_time()
响应：现在是今天下午2点30分（2024-01-15T14:30:00）
```

**设置提醒：**
```
用户：10分钟后提醒我开会
AI：调用 set_reminder("10分钟后", "开会")
响应：提醒已设置：开会，将在今天下午2点40分提醒您
```

**创建倒计时：**
```
用户：开始一个25分钟的番茄钟
AI：调用 start_countdown("25分钟", "番茄钟工作时间")
响应：倒计时已开始：番茄钟工作时间，时长 1500 秒
```

**检查状态：**
```
用户：还剩多少时间？
AI：调用 get_countdown_status(countdown_id)
响应：还剩18分钟32秒
```

## 时间格式支持

### 相对时间格式
- "5分钟后" / "5 minutes later"
- "1小时后" / "1 hour later"  
- "30秒后" / "30 seconds later"

### 绝对时间格式
- ISO 8601: "2024-01-15T15:30:00"
- 简化格式: "2024-01-15 15:30:00"

## 数据存储

- 提醒数据: `data/reminders.json`
- 倒计时数据: `data/countdowns.json`
- 自动创建 `data` 目录
- 支持服务器重启后数据恢复

## 项目结构

```
mcp_server_time/
├── main.py           # 主服务器文件
├── pyproject.toml    # 项目配置
├── README.md         # 项目说明
├── uv.lock          # 依赖锁定
└── data/            # 数据存储目录
    ├── reminders.json
    └── countdowns.json
```

## 开发和扩展

### 添加新工具
```python
@mcp.tool()
def your_tool(param: str) -> dict:
    """工具描述"""
    # 实现逻辑
    return {"result": "success"}
```

### 添加新资源
```python
@mcp.resource("your://resource")
def your_resource() -> str:
    """资源描述"""
    return json.dumps(data)
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

