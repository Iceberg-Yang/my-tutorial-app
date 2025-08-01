# ========================
# MCP 时间管理服务器
# 提供时间查询、提醒、倒计时等功能
# 支持AI平台集成，所有输出重定向到stderr避免干扰MCP协议
# ========================

import json
import sys
import threading
import time
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional
from fastmcp import FastMCP

# 创建MCP服务器实例
mcp = FastMCP("TimeServer")

# 全局数据存储（提醒和倒计时）
reminders: Dict[str, dict] = {}
countdowns: Dict[str, dict] = {}

# 数据目录和文件路径
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)
REMINDERS_FILE = data_dir / "reminders.json"
COUNTDOWNS_FILE = data_dir / "countdowns.json"

def load_data():
    """
    加载提醒和倒计时的持久化数据
    启动时自动恢复历史数据
    """
    global reminders, countdowns
    try:
        if REMINDERS_FILE.exists():
            with open(REMINDERS_FILE, 'r', encoding='utf-8') as f:
                reminders = json.load(f)
    except Exception as e:
        log_message(f"Failed to load reminders: {e}")
        reminders = {}
    
    try:
        if COUNTDOWNS_FILE.exists():
            with open(COUNTDOWNS_FILE, 'r', encoding='utf-8') as f:
                countdowns = json.load(f)
    except Exception as e:
        log_message(f"Failed to load countdowns: {e}")
        countdowns = {}

def save_data():
    """
    保存提醒和倒计时数据到文件，实现持久化
    """
    try:
        with open(REMINDERS_FILE, 'w', encoding='utf-8') as f:
            json.dump(reminders, f, ensure_ascii=False, indent=2)
        with open(COUNTDOWNS_FILE, 'w', encoding='utf-8') as f:
            json.dump(countdowns, f, ensure_ascii=False, indent=2)
    except Exception as e:
        log_message(f"Failed to save data: {e}")

def parse_duration(duration_str: str) -> int:
    """
    解析时间字符串为秒数
    支持“5分钟”、“30秒”、“1小时”等格式
    """
    duration_str = duration_str.lower().strip()
    if "分钟" in duration_str or "minute" in duration_str:
        num = int(''.join(filter(str.isdigit, duration_str)))
        return num * 60
    elif "小时" in duration_str or "hour" in duration_str:
        num = int(''.join(filter(str.isdigit, duration_str)))
        return num * 3600
    elif "秒" in duration_str or "second" in duration_str:
        num = int(''.join(filter(str.isdigit, duration_str)))
        return num
    else:
        # 默认假设是分钟
        try:
            return int(duration_str) * 60
        except:
            return 300  # 默认5分钟

def format_time_semantic(dt: datetime) -> str:
    """
    将datetime对象格式化为中文语义描述
    例如“今天下午3点15分”
    """
    now = datetime.now()
    hour = dt.hour
    minute = dt.minute
    # 时间段描述
    if 5 <= hour < 12:
        period = "上午"
    elif 12 <= hour < 18:
        period = "下午"
    elif 18 <= hour < 22:
        period = "晚上"
    else:
        period = "深夜"
    # 12小时制
    display_hour = hour if hour <= 12 else hour - 12
    if display_hour == 0:
        display_hour = 12
    if minute == 0:
        time_desc = f"{period}{display_hour}点整"
    else:
        time_desc = f"{period}{display_hour}点{minute}分"
    date_diff = (dt.date() - now.date()).days
    if date_diff == 0:
        date_desc = "今天"
    elif date_diff == 1:
        date_desc = "明天"
    elif date_diff == -1:
        date_desc = "昨天"
    else:
        date_desc = dt.strftime("%m月%d日")
    return f"{date_desc}{time_desc}"

def log_message(message: str):
    """
    输出日志消息到stderr，避免干扰MCP协议通信
    """
    print(message, file=sys.stderr, flush=True)

def monitor_service():
    """
    后台监控服务线程
    持续检查提醒和倒计时的触发状态，到点时输出到stderr
    """
    while True:
        try:
            current_time = datetime.now()
            # 检查提醒
            for reminder_id, reminder in list(reminders.items()):
                if reminder['status'] == 'pending':
                    trigger_time = datetime.fromisoformat(reminder['trigger_time'])
                    if current_time >= trigger_time:
                        reminder['status'] = 'triggered'
                        log_message(f"\n⏰ 提醒: {reminder['message']}")
                        log_message(f"   时间: {trigger_time.strftime('%Y-%m-%d %H:%M:%S')}")
                        log_message(f"   提醒ID: {reminder_id}")
                        save_data()
            # 检查倒计时
            for countdown_id, countdown in list(countdowns.items()):
                if countdown['status'] == 'running':
                    end_time = datetime.fromisoformat(countdown['end_time'])
                    if current_time >= end_time:
                        countdown['status'] = 'completed'
                        countdown['remaining_seconds'] = 0
                        log_message(f"\n⏰ 倒计时结束: {countdown['message']}")
                        log_message(f"   持续时间: {countdown['duration_seconds']}秒")
                        log_message(f"   倒计时ID: {countdown_id}")
                        save_data()
                    else:
                        # 实时更新剩余时间
                        remaining = (end_time - current_time).total_seconds()
                        countdown['remaining_seconds'] = max(0, int(remaining))
            time.sleep(1)  # 每秒检查一次
        except Exception as e:
            log_message(f"Monitor service error: {e}")
            time.sleep(5)

# ================== 时间查询工具 ==================

@mcp.tool()
def get_current_time(format_type: str = "both") -> dict:
    """
    获取当前时间
    Args:
        format_type: 返回格式类型，可选值：standard/semantic/both
    Returns:
        dict: 包含标准格式和语义格式的当前时间
    """
    now = datetime.now()
    iso_format = now.isoformat()
    semantic_format = format_time_semantic(now)
    result = {
        "timestamp": iso_format,
        "timezone": "本地时间"
    }
    if format_type == "standard":
        result["time"] = iso_format
    elif format_type == "semantic":
        result["time"] = semantic_format
    else:
        result["standard_format"] = iso_format
        result["semantic_format"] = semantic_format
    return result

# ================== 提醒管理工具 ==================

@mcp.tool()
def set_reminder(time_str: str, message: str) -> dict:
    """
    设置一个提醒
    Args:
        time_str: 提醒时间，支持ISO格式或相对时间（如"10分钟后"）
        message: 提醒内容
    Returns:
        dict: 提醒设置结果和信息
    """
    try:
        reminder_id = str(uuid.uuid4())[:8]
        current_time = datetime.now()
        # 解析时间
        if "后" in time_str or "later" in time_str:
            # 相对时间
            duration_seconds = parse_duration(time_str.replace("后", "").replace("later", ""))
            trigger_time = current_time + timedelta(seconds=duration_seconds)
        else:
            # 绝对时间（ISO格式）
            trigger_time = datetime.fromisoformat(time_str)
        reminder = {
            "id": reminder_id,
            "created_at": current_time.isoformat(),
            "trigger_time": trigger_time.isoformat(),
            "message": message,
            "status": "pending"
        }
        reminders[reminder_id] = reminder
        save_data()
        return {
            "success": True,
            "reminder_id": reminder_id,
            "trigger_time": trigger_time.isoformat(),
            "semantic_time": format_time_semantic(trigger_time),
            "message": f"提醒已设置：{message}，将在{format_time_semantic(trigger_time)}提醒您"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@mcp.tool()
def list_reminders(status: str = "all") -> dict:
    """
    查看提醒列表
    Args:
        status: 筛选状态，可选值：all, pending, triggered, acknowledged
    Returns:
        dict: 满足条件的提醒列表
    """
    filtered_reminders = []
    for reminder in reminders.values():
        if status == "all" or reminder["status"] == status:
            filtered_reminders.append(reminder)
    return {
        "total_count": len(filtered_reminders),
        "reminders": filtered_reminders
    }

@mcp.tool()
def check_triggered_reminders() -> dict:
    """
    检查已触发的提醒
    Returns:
        dict: 已触发提醒列表
    """
    triggered = [r for r in reminders.values() if r["status"] == "triggered"]
    return {
        "count": len(triggered),
        "triggered_reminders": triggered,
        "message": f"发现 {len(triggered)} 个已触发的提醒" if triggered else "暂无触发的提醒"
    }

@mcp.tool()
def acknowledge_reminder(reminder_id: str) -> dict:
    """
    确认提醒（标记为已查看）
    Args:
        reminder_id: 提醒ID
    Returns:
        dict: 操作结果
    """
    if reminder_id in reminders:
        reminders[reminder_id]["status"] = "acknowledged"
        save_data()
        return {
            "success": True,
            "message": f"提醒 {reminder_id} 已确认"
        }
    else:
        return {
            "success": False,
            "error": "提醒不存在"
        }

@mcp.tool()
def cancel_reminder(reminder_id: str) -> dict:
    """
    取消提醒
    Args:
        reminder_id: 提醒ID
    Returns:
        dict: 操作结果
    """
    if reminder_id in reminders:
        del reminders[reminder_id]
        save_data()
        return {
            "success": True,
            "message": f"提醒 {reminder_id} 已取消"
        }
    else:
        return {
            "success": False,
            "error": "提醒不存在"
        }

# ================== 倒计时工具 ==================

@mcp.tool()
def start_countdown(duration: str, message: str = "") -> dict:
    """
    开始一个倒计时
    Args:
        duration: 倒计时时长，支持"5分钟"、"30秒"、"1小时"等格式
        message: 倒计时描述（可选）
    Returns:
        dict: 倒计时创建结果
    """
    try:
        countdown_id = str(uuid.uuid4())[:8]
        current_time = datetime.now()
        duration_seconds = parse_duration(duration)
        end_time = current_time + timedelta(seconds=duration_seconds)
        countdown = {
            "id": countdown_id,
            "created_at": current_time.isoformat(),
            "start_time": current_time.isoformat(),
            "end_time": end_time.isoformat(),
            "duration_seconds": duration_seconds,
            "remaining_seconds": duration_seconds,
            "message": message or f"{duration}倒计时",
            "status": "running"
        }
        countdowns[countdown_id] = countdown
        save_data()
        return {
            "success": True,
            "countdown_id": countdown_id,
            "duration_seconds": duration_seconds,
            "end_time": end_time.isoformat(),
            "message": f"倒计时已开始：{countdown['message']}，时长 {duration_seconds} 秒"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@mcp.tool()
def list_countdowns(status: str = "running") -> dict:
    """
    查看倒计时列表
    Args:
        status: 筛选状态，可选值：all, running, paused, completed, cancelled
    Returns:
        dict: 满足条件的倒计时列表
    """
    filtered_countdowns = []
    for countdown in countdowns.values():
        if status == "all" or countdown["status"] == status:
            filtered_countdowns.append(countdown)
    return {
        "total_count": len(filtered_countdowns),
        "countdowns": filtered_countdowns
    }

@mcp.tool()
def get_countdown_status(countdown_id: str) -> dict:
    """
    获取倒计时状态
    Args:
        countdown_id: 倒计时ID
    Returns:
        dict: 当前倒计时状态
    """
    if countdown_id not in countdowns:
        return {
            "success": False,
            "error": "倒计时不存在"
        }
    countdown = countdowns[countdown_id]
    remaining = countdown["remaining_seconds"]
    if remaining > 0:
        minutes, seconds = divmod(remaining, 60)
        hours, minutes = divmod(minutes, 60)
        if hours > 0:
            time_str = f"{hours}小时{minutes}分钟{seconds}秒"
        elif minutes > 0:
            time_str = f"{minutes}分钟{seconds}秒"
        else:
            time_str = f"{seconds}秒"
    else:
        time_str = "已结束"
    return {
        "success": True,
        "countdown_id": countdown_id,
        "status": countdown["status"],
        "remaining_seconds": remaining,
        "remaining_time": time_str,
        "message": countdown["message"]
    }

@mcp.tool()
def cancel_countdown(countdown_id: str) -> dict:
    """
    取消倒计时
    Args:
        countdown_id: 倒计时ID
    Returns:
        dict: 操作结果
    """
    if countdown_id in countdowns:
        countdowns[countdown_id]["status"] = "cancelled"
        save_data()
        return {
            "success": True,
            "message": f"倒计时 {countdown_id} 已取消"
        }
    else:
        return {
            "success": False,
            "error": "倒计时不存在"
        }

# ================== 资源定义 ==================

@mcp.resource("time://current")
def current_time_resource() -> str:
    """
    当前时间资源（只读）
    Returns:
        str: 当前时间的JSON字符串
    """
    now = datetime.now()
    return json.dumps({
        "iso_format": now.isoformat(),
        "semantic_format": format_time_semantic(now)
    }, ensure_ascii=False)

@mcp.resource("reminders://active")
def active_reminders_resource() -> str:
    """
    活跃提醒资源（只读）
    Returns:
        str: 活跃提醒的JSON字符串
    """
    active = [r for r in reminders.values() if r["status"] in ["pending", "triggered"]]
    return json.dumps(active, ensure_ascii=False, indent=2)

@mcp.resource("countdowns://running")
def running_countdowns_resource() -> str:
    """
    运行中的倒计时资源（只读）
    Returns:
        str: 运行中倒计时的JSON字符串
    """
    running = [c for c in countdowns.values() if c["status"] == "running"]
    return json.dumps(running, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # 启动时加载数据
    load_data()
    # 启动后台监控线程
    monitor_thread = threading.Thread(target=monitor_service, daemon=True)
    monitor_thread.start()
    # 启动信息输出到stderr
    log_message("🕐 时间管理服务器已启动")
    log_message("📝 支持功能：")
    log_message("   - 查询当前时间")
    log_message("   - 设置和管理提醒")
    log_message("   - 创建和监控倒计时")
    log_message("🔄 后台监控服务已启动")
    # 运行MCP服务器（与AI平台通信）
    mcp.run()