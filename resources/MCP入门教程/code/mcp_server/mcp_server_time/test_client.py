#!/usr/bin/env python3
"""
MCP Time Server 测试客户端
用于测试各种功能的简单脚本
"""

import json
import subprocess
import sys
from datetime import datetime, timedelta

def test_mcp_tool(tool_name, **kwargs):
    """测试MCP工具调用"""
    print(f"\n=== 测试 {tool_name} ===")
    
    # 构建MCP调用命令
    args = []
    for key, value in kwargs.items():
        args.extend(['--arg', f'{key}={value}'])
    
    cmd = ['python', 'main.py', 'call-tool', tool_name] + args
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print(f"✅ 成功: {result.stdout}")
        else:
            print(f"❌ 错误: {result.stderr}")
    except subprocess.TimeoutExpired:
        print("⏱️ 超时")
    except Exception as e:
        print(f"💥 异常: {e}")

def demo_workflow():
    """演示完整的工作流程"""
    print("🚀 开始演示 MCP Time Server 功能")
    
    # 1. 查询当前时间
    print("\n1️⃣ 查询当前时间")
    test_mcp_tool('get_current_time')
    
    # 2. 设置一个短期提醒（30秒后）
    print("\n2️⃣ 设置30秒后的测试提醒")
    test_mcp_tool('set_reminder', time_str='30秒后', message='测试提醒')
    
    # 3. 开始一个短期倒计时（20秒）
    print("\n3️⃣ 开始20秒倒计时")
    test_mcp_tool('start_countdown', duration='20秒', message='测试倒计时')
    
    # 4. 查看提醒列表
    print("\n4️⃣ 查看提醒列表")
    test_mcp_tool('list_reminders')
    
    # 5. 查看倒计时列表
    print("\n5️⃣ 查看倒计时列表")
    test_mcp_tool('list_countdowns')
    
    print("\n🔔 提示：请运行服务器并观察控制台输出，应该会在20秒和30秒后看到通知")
    print("💡 你也可以在另一个终端窗口中运行以下命令来测试实时状态：")
    print("   python test_client.py status")

def check_status():
    """检查当前状态"""
    print("📊 检查当前状态")
    
    # 检查已触发的提醒
    test_mcp_tool('check_triggered_reminders')
    
    # 检查运行中的倒计时
    test_mcp_tool('list_countdowns', status='running')

def interactive_test():
    """交互式测试"""
    print("🎮 进入交互式测试模式")
    print("可用命令：")
    print("  time - 查询当前时间")
    print("  remind <时间> <消息> - 设置提醒")
    print("  countdown <时长> <消息> - 开始倒计时")
    print("  list - 查看所有提醒和倒计时")
    print("  check - 检查触发的提醒")
    print("  quit - 退出")
    
    while True:
        try:
            cmd = input("\n> ").strip().split()
            if not cmd:
                continue
                
            if cmd[0] == 'quit':
                break
            elif cmd[0] == 'time':
                test_mcp_tool('get_current_time')
            elif cmd[0] == 'remind' and len(cmd) >= 3:
                time_str = cmd[1]
                message = ' '.join(cmd[2:])
                test_mcp_tool('set_reminder', time_str=time_str, message=message)
            elif cmd[0] == 'countdown' and len(cmd) >= 2:
                duration = cmd[1]
                message = ' '.join(cmd[2:]) if len(cmd) > 2 else "倒计时"
                test_mcp_tool('start_countdown', duration=duration, message=message)
            elif cmd[0] == 'list':
                test_mcp_tool('list_reminders')
                test_mcp_tool('list_countdowns')
            elif cmd[0] == 'check':
                test_mcp_tool('check_triggered_reminders')
            else:
                print("❓ 未知命令，请查看帮助")
                
        except KeyboardInterrupt:
            print("\n👋 退出交互模式")
            break
        except Exception as e:
            print(f"💥 错误: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == 'demo':
            demo_workflow()
        elif sys.argv[1] == 'status':
            check_status()
        elif sys.argv[1] == 'interactive':
            interactive_test()
        else:
            print("用法: python test_client.py [demo|status|interactive]")
    else:
        print("🧪 MCP Time Server 测试工具")
        print("\n可用模式：")
        print("  python test_client.py demo        - 运行演示流程")
        print("  python test_client.py status      - 检查当前状态")
        print("  python test_client.py interactive - 交互式测试")
        print("\n💡 建议:")
        print("  1. 在一个终端运行: python main.py")
        print("  2. 在另一个终端运行: python test_client.py demo")
        print("  3. 观察第一个终端的输出变化") 