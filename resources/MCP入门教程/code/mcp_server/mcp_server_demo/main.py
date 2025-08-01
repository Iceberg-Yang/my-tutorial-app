# server.py
from fastmcp import FastMCP #将FastMCP导入MCP包，FastMCP：一个简化 MCP 服务器开发的框架

# Create an MCP server
mcp = FastMCP("Demo") #创建一个MCP服务器，并命名为Demo，使用FastMCP框架


# Add an addition tool
#定义了一个简单的加法工具，AI 模型可以通过 MCP 协议调用这个工具来执行数学运算
@mcp.tool() 
def add(a: int, b: int) -> int: #准确的数据类型可以帮助大模型更好的理解工具
    """Add two numbers"""#这个注释是必须写的，运用自然语言告诉大模型这个工具的用途
    return a + b


# Add a dynamic greeting resource
#定义了一个动态的问候资源，AI 模型可以通过 MCP 协议调用这个资源来获取个性化的问候
#resource为大模型提供只读数据，只请求，不产生其他作用
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"

if __name__ == "__main__":
    mcp.run()  # 简化运行方式，默认使用 stdio 传输协议