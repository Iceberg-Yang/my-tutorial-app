# 【初级】Terminal AI 助手：Gemini CLI 与 Qwen Code 实战体验

# 📢 项目名称：Terminal AI 助手：Gemini CLI 与 Qwen Code 实战体验

---

## 📄 项目介绍

本项目围绕 Google 发布的开源终端 AI 工具 **Gemini CLI** 和 阿里推出的 **Qwen Code** CLI 工具进行体验与实践。通过真实操作，您将了解如何安装、登录、使用自然语言交互创建项目（如 HTML/JS 俄罗斯方块、2048 游戏等），并掌握 CLI 本身的元命令控制与进阶使用技巧，最终体验完整端到端 AI 助手的开发流程。

---

## 🧠 项目难度：

初级，适合对命令行工具有基本了解的使用者

---

## ✨ 项目亮点

*   **一键启动 AI 终端助手**：通过 `npx` 或 `npm` 安装 Gemini CLI 和 Qwen Code，快速体验 AI 驱动的开发流程。
    

*   **零依赖小游戏生成**：使用 AI 协助生成俄罗斯方块、2048 游戏项目，实现全栈开发体验。
    

*   **两大 CLI 工具对比**：Gemini CLI 提供免费额度（如 Gemini 2.5 Pro，1M 上下文窗口，60 请求/分钟，1000 请求/天）[Qwen+2Reddit+2GitHub+2](https://www.reddit.com/r/LocalLLaMA/comments/1m6rsym/qwen_code_a_commandline_ai_workflow_tool_adapted/?utm_source=chatgpt.com)[YouTube+6DataCamp+6Simon Willison’s Weblog+6](https://www.datacamp.com/tutorial/gemini-cli?utm_source=chatgpt.com)；Qwen Code 则是 Alibaba 基于 Gemini CLI 的定制版本，优化 agentic coding 与模型调用[YouTube+13Elets CIO+13Computerworld+13](https://cio.eletsonline.com/news/alibaba-unveils-qwen3-coder-to-advance-open-source-ai-in-software-development/74975/?utm_source=chatgpt.com)。
    

*   **终端原生交互体验**：支持 `/chat`、`/tool`、`/bug`、`@` 文件注入、`!` 执行 Shell 命令等功能，极大提升日常编码效率。
    

*   **可外网访问小游戏部署**：通过 ngrok 实现本地项目临时公网访问，便于演示和分享。
    

---

## 🛠️ 适用范围

*   开发新人：通过 AI 分步引导搭建小游戏项目。
    

*   工具链爱好者：探索如何将终端与 AI 模型无缝结合。
    

*   AI / Agentic 编码研究者：比较 Gemini CLI 与 Qwen Code 的适用场景与性能差异。
    

---

## 📚 小知识：

*   **模型背景**：Qwen3‑Coder‑480B‑A35B‑Instruct 是 Alibaba 最新的 Mixture‑of‑Experts 开源模型，拥有 4800 亿参数，活跃 350 亿参数，可处理高达 256K token，扩展至 1M token，上线即刷新 agentic coding 基准记录，与 Claude Sonnet‑4、GPT‑4 等水平相当。
    

*   **工具渊源**：Qwen Code CLI 是基于 Gemini Code（即 Gemini CLI）fork 的开源工具，新增提示和函数调用协议支持，以充分发挥 Qwen3‑Coder 的自主执行能力。
    

*   **免费使用说明**：Gemini CLI 登录 Google 账户后可免费使用 Code Assist 许可证，享受 60 请求／分钟、每日 1,000 请求的额度。
    

---

## 🚀 操作步骤与解释

### 第一步：确保安装Node.js 20或者更高版本

#### 1.1 安装Node.js

```shell
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.17.1".
nvm current # Should print "v22.17.1".

# Verify npm version:
npm -v # Should print "10.9.2".

```

安装成功后如图所示

![截图 2025-07-21 11-46-10.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/f0cd071b-eb88-4472-8bae-90a9aa7dc8c2.png)

### 第二步：gemini CLI使用初体验

#### 2.1 安装CLI

```shell
npx https://github.com/google-gemini/gemini-cli
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/1ff1a38d-6306-469c-ba68-fcd81dd66ffd.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/b181c6a3-cc15-4bc9-99d4-1e7274dc71a8.png)

建议选择谷歌账号登录，可以获取免费请求次数（需要科学上网）

tips：登录过程若出现如下字样，需要在google cloud配置环境变量

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/aff5257e-1b76-4c4d-86e8-0c993b7bc47c.png)

安装成功后，就可以在任意终端打开gemini cli了

### 第三步：开始对话

现在，你已经可以开始和Gemini对话了

#### 3.1 体验全新的自然语言交互

用自然语言让gemini创建一个全新目录，让他带你从零开始创建一个小游戏

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/fa48e559-558e-4093-8fff-71f34b9cf020.png)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/d7ca931e-0f36-432d-b26a-c1144b79df1d.png)

#### 3.2 体验最新的AI助手的超强能力

输入以下prompt，让gemini帮我们生成一个俄罗斯方块小游戏

```shell
你好。我需要你帮助我从零开始，一步步地创建一个经典的俄罗斯方块游戏。

**核心要求:**
1.  **技术栈:** 仅使用原生的 HTML, CSS, 和JavaScript。不使用任何外部库或框架 (例如 jQuery, React 等)。
2.  **文件结构:** 项目应包含三个核心文件：`index.html`,`style.css`, 和 `script.js`。
3.  **最终目标:**最终完成的游戏，其代码和功能应与我下面提供的最终代码完全一致。

**开发计划:**
我希望你遵循我们之前合作的成功路径，分步进行开发。请在完成每一步后，向我确认，然后我们再进行下一步。
1.  **搭建基本框架:** 创建 `index.html` 和 `style.css`，完成页面的基本布局、标题、游戏画布和信息面板的静态搭建。
2.  **实现游戏循环和绘制:** 在 `script.js` 中设置好游戏循环(`requestAnimationFrame`)，并编写绘制游戏背景网格的函数。
3.  **定义并生成方块:**
*   在 `script.js` 中，使用一个对象来 **预定义(hardcode)** 所有 7种方块的全部旋转形态和颜色。这是为了从根本上避免旋转算法的bug。
*   实现方块的生成逻辑。
4.  **实现玩家操作:**
*   实现方块的自动下落。
*   实现玩家通过键盘 (左、右、下箭头) 控制方块移动。
*   实现玩家通过“上箭头” **切换** 方块的预定义旋转形态。
*   **关键点:** 在键盘事件监听器中，使用`event.preventDefault()` 来阻止方向键滚动页面。
5.  **实现核心游戏机制:**
*   编写精确的碰撞检测函数。
*   实现方块在触底或碰撞后的锁定机制。
*   实现消行和计分逻辑。
6.  **完善功能:**
*   实现“下一个方块”的预览功能。
*   实现难度递增机制：每消除 10行，游戏等级提升，方块下落速度加快。
*   实现游戏结束的判断和提示。

```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/6d5278de-83a6-4d7a-998f-a9ccab040104.png)

也可以通过如下代码体验该俄罗斯方块游戏（AI生成，人工修改版）

```shell
代码地址：


代码结构如下
├── index.html
├── script.js
└── style.css
```

## 第四步：常用的CLI指令与交互

### 4.1 斜杠命令（/）

斜杠命令提供对 CLI 本身的元级控制。

```shell
/bug
描述： 提交有关 Gemini CLI 的问题。默认情况下，问题将被提交至 Gemini CLI 的 GitHub 仓库。你在 /bug 后输入的字符串将作为问题标题。可通过 .gemini/settings.json 文件中的 bugCommand 设置修改默认行为。
/chat
描述： 保存并交互式恢复对话历史，用于对话分支或从后续会话中恢复早期状态。
子命令：
  ● save  
  描述：保存当前对话状态，需提供 <tag> 标签用于标识。  
  用法：/chat save <tag>
  ● resume  
  描述：从指定标签恢复对话。  
  用法：/chat resume <tag>
  ● list  
  描述：列出可用于恢复的标签列表。
/clear
描述： 清除终端屏幕，包括 CLI 中的可见历史记录与滚动内容。底层会话数据可能仍被保留，取决于具体实现。
● 快捷键： 按下 Ctrl+L 可随时执行清除操作。
/compress
描述： 用摘要替换整个聊天上下文，节省未来 token 使用，同时保留关键对话内容。
/copy
描述： 将 Gemini CLI 最后一次输出复制到剪贴板，便于分享或复用。
/editor
描述： 打开选择支持编辑器的对话框。
/extensions
描述： 列出当前会话中所有激活的扩展。详见 Gemini CLI 扩展文档。
/help 或 /?
描述： 显示 Gemini CLI 的帮助信息，包括所有可用命令及用法。
/mcp
描述： 列出已配置的模型上下文协议（MCP）服务器及其连接状态、工具信息等。
  子命令：
  ● desc 或 descriptions  
  描述：显示工具及服务器的详细描述。
  ● nodesc 或 nodescriptions  
  描述：隐藏描述，仅显示工具名称。
  ● schema  
  描述：显示每个工具配置参数的完整 JSON schema。
  ● 快捷键： 按下 Ctrl+T 可在显示/隐藏工具描述之间切换。
/memory
描述： 管理 AI 教学上下文，从 GEMINI.md 文件加载的分层记忆。
子命令：
  ● add  
  描述：添加记忆内容。  
  用法：/memory add <text>
  ● show  
  描述：显示所有已加载的分层记忆内容，用于检查模型上下文。
  ● refresh  
  描述：从全局、祖先、子目录中的 GEMINI.md 文件重新加载内容，刷新模型指令记忆。
  注意： 更多信息请参阅 CLI 配置文档。
/restore
描述： 将项目文件恢复到工具执行之前的状态，常用于撤销工具所做的更改。
● 用法： /restore [tool_call_id]
● 注意： 需通过 --checkpointing 启动 CLI 或在设置中启用该功
/stats
描述：显示当前 Gemini CLI 会话的详细统计信息，包括令牌使用情况、缓存的令牌节省（当可用时）和会话持续时间。
注意： 仅在正在使用缓存的令牌时才显示缓存信息，目前这种情况发生在使用 API 密钥认证时，而不是 OAuth 认证。
/theme
描述：打开一个对话框，允许您更改 Gemini CLI 的视觉主题。
/auth
描述：打开一个对话框，允许您更改认证方法。
/about
描述：显示版本信息。在提交问题时请分享此信息。
/tools
描述：显示 Gemini CLI 中当前可用的工具列表。
子命令：
      ● desc 或 descriptions：显示每个工具的详细描述，包括每个工具的名称及其提供给模型的完整描述
  ● nodesc 或 nodescriptions：隐藏工具描述，仅显示工具名称
/privacy
描述：显示隐私声明，并允许用户选择是否同意为服务改进目的收集其数据。
/quit 或 /exit
描述：退出 Gemini CLI。
```

#### 4.2 At命令（@）

at 命令用于将文件或目录的内容包含到您的提示中，作为给 Gemini 的一部分。这些命令包括 git 感知过滤。

```shell
@<file_path>：将指定文件的内容注入到你的 Prompt 中。例如：What is this file about? @README.md

@<directory_path>：将指定目录及其子目录下所有（未被 gitignore 的）文本文件的内容注入。例如：@src/my_project/ Summarize the code in this directory.
路径中的空格需要用反斜杠 \ 转义。

```

#### 4.3 Shell 模式 & 透传命令 ( `**!**` )

```shell
这让你无需退出 Gemini CLI 就能执行系统命令。

!<shell_command>：执行单条 Shell 命令，并返回到 Gemini CLI。例如：!ls -la 或 !git status。

! (单独输入)：切换到「Shell 模式」。在此模式下，你输入的任何内容都会被直接当作 Shell 命令执行，终端提示符也会变色以作区分。
再次输入 ! 可以退出 Shell 模式，回到与 AI 的对话中。
```

熟悉这些命令，有助于更好地使用gemini cli

### 第五步：Qwen code初体验

2025.7.22 Qwen3-Coder推出了全新的最具自主性的代码模型。Qwen3-Coder-480B-A35B-Instruct 在自主代码、自主浏览器使用和自主工具使用方面取得了开放模型中的新纪录，性能可与 Claude Sonnet 4 相媲美。同时Qwen还开源了一个用于自主代码的命令行工具：Qwen Code。Qwen Code 源自 Gemini Code，经过定制提示和函数调用协议的适配，以充分发挥 Qwen3-Coder 在自主代码任务中的能力。Qwen3-Coder 与社区的最佳开发者工具无缝协作。作为基础模型，我们希望它能在数字世界的任何地方使用——世界中的自主代码！无需科学上网，也能体验最新的Agent。

#### 5.1 安装qwen code

##### 5.1.1 通过npm管理器安装

```shell
curl -qL https://www.npmjs.com/install.sh | sh

#通过npm管理器安装
npm i -g @qwen-code/qwen-code

```

或者使用源代码安装

```shell
git clone https://github.com/QwenLM/qwen-code.git
cd qwen-code && npm install && npm install -g

```

##### 5.1.2 环境配置

可以选择临时配置环境变量，也可以把环境变量写入系统文件中，或者以.env 的形式放入待使用文件夹

```shell
export OPENAI_API_KEY="your_api_key_here"
export OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export OPENAI_MODEL="qwen3-coder-plus
```

##### 5.1.3 API获取

从阿里云百炼获取API

打开阿里云百炼，点开模型，点击API-Key ，选择创建API。（新人赠送百万token，足够体验）

![截图 2025-07-23 17-42-59.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/00e7a758-4922-47db-8478-b1ae7650a8f6.png)

##### 5.1.4 打开qwen code

在终端中输入 qwen 即刻体验

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/bf4c60e4-1817-4008-aea0-1e3747e68af0.png)

#### 5.2 能力体验

给出一段prompt，让qwen code帮我们生成一个项目

```shell
请帮我创建一个类似于以下描述的2048游戏项目：
     
项目结构：
     - `index.html`
      ：游戏主页面，包含游戏标题、分数显示、游戏说明和游戏区域。
     - `style.css`：游戏的样式表，包括响应式设计，适配移动设备。
     - `script.js`：游戏逻辑实现，包括：
1. 使用键盘方向键或触摸滑动控制方块移动。
2. 方块移动和合并逻辑。
3. 随机生成新方块（2或4）。
4. 分数计算和显示。
5. 游戏结束检测（无空位且无法合并时）。
6. 新游戏按钮功能。
    - `.env`
      ：包含环境变量配置（此文件在2048游戏中不直接使用，但项目中存在）。
 
 游戏功能需求：
1. 游戏区域为4x4网格。
2. 初始时随机生成两个方块（值为2或4）。
3. 玩家通过方向键或触摸滑动移动方块：
   - 相同数字的方块在移动过程中会合并成一个方块，数字相加。
   - 每次移动后，在随机空位置生成一个新的方块（值为2或4）。
4. 分数计算：合并方块时，分数增加合并后方块的值。
5. 游戏结束条件：当网格被填满且无法再进行合并时，游戏结束。
6. 包含"新游戏"按钮，点击后重新开始游戏。
7. 页面设计美观，符合2048游戏的经典样式。
8. 支持响应式设计，在移动设备上有良好的显示效果。

 请确保生成的代码结构清晰，注释详细，易于理解和维护。

```

微调后效果如下，生成了一个2048小游戏。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYjGkE9M6O8g/img/92fb62a0-4e87-4428-8add-dc63b6357517.png)

#### 5.3 外界访问

目前我们的小游戏仅可以在本地访问，要想让非开发服务器，我们可以使用一个简单的内网穿透临时暴露给公网。

ngrok 是一个强大的反向代理工具，可以将本地服务器通过安全隧道暴露到公网互联网。它主要用于：

*   **内网穿透**：让公网可以访问本地开发环境
    
*   **临时公网URL**：为本地服务生成临时的公网地址
    
*   **Webhook调试**：接收第三方服务的回调请求
    
*   **演示分享**：快速向他人展示本地项目
    

##### 5.3.1下载与安装

```shell
# 下载并安装
wget https://bin.equinox.io/c/bNyj1m1r5gY/ngrok-v3-stable-linux-amd64.tgz
tar -xvzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin
```

登录ngrok官网获取认证令牌，然后在终端执行：

```shell
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

接下来你就可以使用ngrok启动了。

5.3.2 启动HTTP隧道

假设你的本地服务运行在端口8000：

---

## 🧑‍💻 进阶建议

*   对比 Gemini CLI 与 Qwen Code 在复杂任务中的表现差异，比如处理大型代码库、自动化测试生成、Git 提交协助等。
    

*   尝试结合自定义命令 `~/.gemini/commands/` 扩展 CLI 功能，为自己定制常用 prompt 模板和操作流程。
    

*   使用 MCP（Model Context Protocol）功能，搭配本地工具或远程 MCP 服务增强上下文能力（如 README 解析、架构图生成等）。
    

*   借助 Qwen3‑Coder 的长上下文能力处理大型项目，探索 256K 或更高上下文 token 下的 agentic 编码性能。