# 【中级】Project 09：AI音乐生成器，一键创作情感旋律

# 📢 项目名称：AI音乐生成器，一键创作情感旋律！

---

## 📄 项目介绍

心情低落时想听悲伤的曲调，兴奋时渴望激昂的节奏？现在，只需轻点选择情感，AI 就能为你打造专属音乐！​

项目借助 Python 强大的音乐处理能力，融合数学音频合成技术，开发出 “智能音乐创作助手”。无论你是否具备音乐基础，只要选定 “快乐”“悲伤”“兴奋”“平静” 等情感状态，它就能精准理解你的心境，从音符选择、节奏编排到音调设计，一站式完成音乐创作。

---

## 🧠 项目难度

中级。本项目适合有基础编程经验的用户体验。

---

## ✨ 项目亮点

### AI + 音乐理论：基于音乐理论与情感心理学，为每种情感量身定制专属音阶、节奏和音域，一键生成情感旋律。​

### 纯数学音频合成：采用正弦波合成技术，无需依赖外部音频库或音源文件，直接产出高质量音频。​

### 现代化 Web 交互：界面采用美观的渐变设计，适配所有现代浏览器，点击按钮即可实时生成并播放音乐。​

### 全场景情感覆盖：四大情感模式精准匹配心境：​

○ 快乐：C 大调，奏响明亮欢快的旋律​

○ 悲伤：A 小调，演绎深沉忧郁的音调​

○ 兴奋：G 大调，迸发激昂动感的节拍​

○ 平静：F 大调，流淌舒缓宁静的和声

---

## 🎓 适用范围

音乐爱好者、情感调节需求者、创意工作者、冥想练习者、AI 技术学习者、心理健康关注者​

通过本项目，你将深度体验以下实训内容：​

● Python 音频处理与数学合成技术​

● Flask Web 应用开发实践​

● 前端界面设计与交互优化​

● 音乐理论在编程中的创新应用​

● 情感计算与人工智能的融合实践​

● AI 辅助编程的实用技巧

---

## 📚 小知识：什么是情感音乐？

情感音乐是基于音乐心理学原理，通过特定的音阶、节奏、音域和力度来表达和诱发特定情感的音乐形式。研究表明，大调音阶通常让人感到明亮和快乐，而小调音阶则容易引发忧郁和深沉的情感。节奏的快慢、音域的高低、音符的时值分布都会影响听者的情感体验。

在这个项目中，我们将这些音乐理论转化为算法，让 AI 能够根据指定的情感类型，自动选择合适的音乐参数，生成符合该情感特征的旋律。

---

## 🛠️ 操作步骤与解释

### 第一步：环境准备

1.  打开终端确保 Python 环境符合项目要求
    

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/e5e11f1c-52f2-434d-a8f2-0d5e69f4e3a6.png)

输入以下指令查看当前python版本

```bash
python --version 
```

本项目需要确保 Python版本在3.8+以上

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/17f90129-2b5c-4907-aac5-06a165ddb518.png)

2.  在终端中创建项目目录
    

```bash
mkdir music_agent
cd music_agent
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/6f368d6b-cd26-45b2-b84d-39957ee8a662.png)

3.  前往VScode进行代码的编写
    

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/b585824e-933c-40b5-b9c5-b8c6a9c8f3e4.png)

### 第二步：AI 代码生成（可选）

1.  体验 AI 辅助编程的魅力，可以使用以下提示词让 AI 帮你生成项目代码
    

*   AI 提示词模板-基础版提示词：
    

```plaintext
现在我希望你能在这个文件里面构建一个agent，可以根据我提供的不同情感生成音乐。

要求：
1. 支持四种情感：快乐、悲伤、兴奋、平静
2. 使用Python实现，包含Flask网页界面
3. 生成WAV格式音频文件，可在浏览器中直接播放
4. 使用数学方法合成音频，不依赖外部音源
5. 界面要现代化，用户体验友好

请创建完整的项目结构，包括：
- 音乐生成核心逻辑
- Flask后端服务
- HTML前端界面
- 依赖管理文件

```

*   AI 提示词模板-进阶版提示词：
    

```plaintext
请帮我创建一个基于情感的AI音乐生成器项目，具体要求如下：

技术栈：
- 后端：Python + Flask
- 前端：HTML + CSS + JavaScript
- 音频处理：NumPy + 数学合成

功能需求：
1. 情感音乐生成：
   - 快乐：C大调，120 BPM，明亮音域
   - 悲伤：A小调，75 BPM，低沉音域
   - 兴奋：G大调，140 BPM，高音域快节奏
   - 平静：F大调，85 BPM，舒缓节奏

2. 音频合成技术：
   - 使用正弦波生成音调
   - 音符频率计算：440 * (2^(semitones/12))
   - 添加音频包络避免爆音
   - 输出44.1kHz采样率的WAV文件

3. Web界面设计：
   - 响应式布局，支持移动端
   - 四个情感按钮，渐变色设计
   - 实时加载状态提示
   - 内置音频播放器

4. 项目结构：
   - app.py：Flask主应用
   - music_emotion_agent.py：音乐生成核心
   - templates/index.html：前端页面
   - requirements.txt：依赖管理
   - static/music/：音频文件存储

请提供完整的代码实现和详细注释。

```

#### 💡 使用建议：

*   可以在 ChatGPT、Claude、或其他 AI 编程助手中使用这些提示词
    
*   建议先用基础版提示词，再根据需要使用进阶版
    
*   生成代码后，可以根据实际需求进行调整和优化
    

### 第三步：获取项目代码

*   方式一：直接下载完整项目
    

```bash
# 克隆项目仓库（示例地址，请替换为实际地址）
https://gitee.com/mthreadsacademy/project100.git
```

*   方式二：手动创建文件
    

如果使用 AI 生成代码，请按照以下结构创建文件：

```plaintext
music_agent/
├── app.py                 # Flask 主应用
├── music_emotion_agent.py  # 音乐生成核心逻辑
├── requirements.txt        # 项目依赖
├── templates/
│   └── index.html         # 前端界面
└── static/
    └── music/            # 生成的音乐文件存储目录
```

### 第四步：安装项目依赖

1.  在VScode中打开终端并安装 Python 依赖包
    

首先点击右下角选择base环境

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/4a793c6c-39e8-4299-aab8-2f01ba3ca8df.png)

接着在右上角打开终端

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/55df3522-f39e-4921-b933-cbbcc50bf58c.png)

输入以下指令安装环境

```bash
pip install -r requirements.txt
```

2.  如果遇到安装问题，可使用国内镜像源
    

```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
```

3.  验证安装是否成功
    

```bash
python -c "import flask, numpy; print('依赖安装成功！')"
```

### 第五步：启动音乐生成服务

1.  启动 Flask 应用
    

```bash
python app.py
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/e57d1c34-bebd-46fc-9546-af4e13f7afc4.png)

2.  看到启动成功信息
    

```plaintext
* Running on http://127.0.0.1:5000
* Debug mode: on
```

3.  打开浏览器访问 在浏览器中访问：`http://localhost:5000`
    

或者直接在浏览器访问本机ip地址，例如：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/dd1fd549-a13a-4e29-96c7-e51666443e81.png)

### 第六步：玩起来！一键生成你的情感音乐

面对复杂情绪不知如何选择音乐？现在，只需简单几步：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/1GXn45KGrvDVQqDQ/img/6ae034aa-bffc-46ac-b2c0-b28e29d9b317.png)

现在你只要：

1.  **选择你的当前情感状态**
    
    *   😊 快乐：欢快明亮的旋律
        
    *   😢 悲伤：深沉忧郁的音调
        
    *   🎉 兴奋：激昂动感的节拍
        
    *   😌 平静：舒缓宁静的和声
        
2.  **点击对应按钮** 系统会自动分析情感特征，选择合适的音乐参数
    
3.  **等待AI创作** 看到"正在创作您的专属音乐，请稍候..."
    
4.  **享受你的专属音乐** 生成完成后会自动播放，也可以手动控制播放
    

### 第七步：探索更多可能性

### 1. 技术原理解析

项目的音乐生成部分主要通过以下的原理进行音乐的生成：

#### 🎼 音乐参数设计

*   快乐音乐：C大调音阶，120 BPM，音域 C4-E5
    
*   悲伤音乐：A小调音阶，75 BPM，音域 A3-C5
    
*   兴奋音乐：G大调音阶，140 BPM，音域 G4-B5
    
*   平静音乐：F大调音阶，85 BPM，音域 F4-F5
    

#### 🔊 音频合成技术

```python
# 频率计算公式
frequency = 440.0 * (2 ** (semitones / 12.0))

# 正弦波生成
arr[i] = np.sin(2 * np.pi * frequency * i / sample_rate)

```

#### 🎵 节奏模式设计

*   快乐：\[1.0, 0.5, 0.5, 1.0\] - 轻快跳跃
    
*   悲伤：\[2.0, 1.0, 1.0, 2.0\] - 缓慢深沉
    
*   兴奋：\[0.25, 0.25, 0.5, 0.25, 0.25, 0.5\] - 密集激烈
    
*   平静：\[2.0, 1.0, 1.0, 2.0\] - 舒缓流畅
    

2.  **探索更多玩法**
    

基于以上技术原理，你还可以通过修改代码的参数生成更丰富的音乐。

*   🎚️ 调整音乐长度：修改 `length` 参数生成更长的音乐
    
*   🎹 添加新情感：在 `emotion_params` 中定义新的情感类型
    
*   🎼 和声支持：添加多声部，创造更丰富的音乐层次
    
*   📱 移动端适配：优化界面，支持手机端使用
    
*   🎵 音乐导出：添加 MP3 格式导出功能
    
*   🤖 AI 作词：结合大语言模型，为旋律配上歌词
    

---

## 🖼️ 最终效果展示

[请至钉钉文档查看附件《2025-05-26 17-42-00.mkv》](https://alidocs.dingtalk.com/i/nodes/14dA3GK8gkNYNqvjT51OooA589ekBD76?doc_type=wiki_doc&iframeQuery=anchorId%3DX02mb4woxiff1l2gp4lk9)

### 界面效果

*   现代化渐变背景设计
    
*   四个情感按钮，清晰的视觉区分
    
*   实时加载状态提示
    
*   内置音频播放器，支持播放控制
    

### 音乐效果

*   快乐音乐：明亮的 C 大调，轻快的节奏，让人心情愉悦
    
*   悲伤音乐：深沉的 A 小调，缓慢的节拍，触动内心情感
    
*   兴奋音乐：高亢的 G 大调，密集的节奏，激发活力
    
*   平静音乐：温和的 F 大调，舒缓的旋律，带来宁静
    

立即开启你的 AI 音乐创作之旅，让情感在旋律中自由流淌！🎵