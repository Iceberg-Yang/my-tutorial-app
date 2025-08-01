# 【高级】Project 07：让AIBOOK化身老中医给你看舌苔

## 📌 项目名称：在 AIBOOK 上实训 AI，让 AI 化身老中医帮你看舌苔

---

## 📄 项目介绍

你有没有照过镜子看自己的舌头？中医说，舌头能反映我们身体的状态，比如上火了、虚弱了、太湿了……现在，我们就来做一个有趣的 AI 项目：让电脑学会像老中医一样“看舌苔”！

在 AIBOOK 上，我们将用真实图片训练 AI，通过图像识别技术，帮它分辨不同的舌苔类型，并给出基础的健康建议。这个项目结合了中医知识与人工智能，非常适合学生们边玩边学，体验 AI 的学习与判断过程！

---

## 🧠 项目难度

  高级。本项目推荐有编程经验的用户体验。

---

##  ✨项目亮点

*   **传统中医 + AI 实践，一次融合东西智慧的尝试**
    

用视觉模型模拟“望诊”，让 AI 能看舌像、提建议。

*   **从零构建健康问诊模型，适合学生动手实训**
    

包含数据分析、模型训练、推理调用等完整流程，寓教于用。

*   **轻量化部署，AIBOOK 一台设备即可完成训练与测试**
    

不依赖外网资源，确保数据私密可控，适合校园课堂或个人实验。

*   **AI VS 老中医，对比诊断更有趣**
    

谁更懂舌苔？谁说得更准？和人类中医老师一起来挑战 AI，看看你站哪一边！

---

## 🎓 适用范围

AI 教育项目 / 医疗图像实践课题 / 中医现代化探索 / 职业学校实训 / AI+健康跨学科创新课程

---

## 🛠️ 操作步骤与解释

### 第一步：环境准备

1.1 打开终端（Terminal）

![05573a40713e337969e9f217d28ae4e.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4jKqmoR2avEYlw19/img/4295da04-4bea-4019-a729-98f9b6f4c58b.png)

1.2 输入如下命令行，一键下载代码![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/9143c0c5-82e0-40ee-8e22-5ca3955d6f9e.png)

```bash
wget https://apollo-appstore-pre.tos-cn-beijing.volces.com/appstore/release/ai/TongueDetection_Yolov11.zip
```

1.3 解压代码

```bash
unzip TongueDetection_Yolov11.zip
```

1.4 进入文件夹

```bash
cd TongueDetection_Yolov11/
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/35ca5dee-3310-43d8-b82d-34360d0c42a9.png)

1.5 安装依赖

```bash
pip install -r requirements.txt
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/d859e2f7-21af-4c51-ba36-c1e3f532f79e.png)

1.6 打开 VSCode，选择刚才解压的课程路径：

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/c2f4c330-1005-4b0f-a467-96e6f2d58239.png)

1.7 打开TongueDetection.ipynb

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/f053f34d-d4ea-4ae2-8e34-fa1e86efb11b.png)

1.8 首次打开时，点击界面上方的 **“Select Kernel”**，选择 **“Install/Enable Suggested Extensions”** 以安装必要插件。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/3939ddbd-c515-4eb7-b954-b4180f75f4f6.png)

1.9 插件安装完成后，再次点击 **“Select Kernel”**，选择 **“Python Environments”** 

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/d53e1bda-50b1-4d98-a9dc-393dfe75d8f6.png)

1.10 确认环境为 `Python 3.10.12`

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/172e97b7-cae9-40c6-a596-38b25325df67.png)

---

### 第二步：舌苔大集合-了解你的数据集

2.1 依次通过shift-Enter执行代码，了解AI需要哪些数据才能学习人类的舌苔分类

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/70d49a83-c6a5-4911-a893-25296b43e387.png)

---

### 第三步：训练前-原始模型能看懂舌苔嘛？

3.1 继续运行代码，看看没有训练过的 AI 对图片做出的“盲猜”结果

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/02b0d6fe-409f-44b3-8df8-0c9abea018f7.png)

---

### 第四步：训练模型，教AI学会看舌苔

4.1 往下执行，学习CPU和GPU的差异

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/3a2241c0-6614-4eac-87b2-1e69cf0d9906.png)

4.2 将如下命令复制到Terminal部分执行，尝试用CPU进行训练

```bash
python train_v11_cpu.py
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/1c655892-17d3-4717-9ae9-f98d34fc0133.png)

训练时间较长，可输入`Ctrl + C`停止训练

4.3 将如下命令复制到Terminal部分执行，尝试用GPU进行训练

```bash
python train_v11_gpu.py
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/1c655892-17d3-4717-9ae9-f98d34fc0133.png)

4.4 看到GPU的运行效率后，输入`Ctrl + C`停止训练

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/5c300d1d-268a-4700-9f43-31dddf306a8d.png)

---

### 第五步：模型推理，训练后模型变聪明了吗？

5.1 运行推理代码，看看训练过后的 AI，在相同的图像上是不是准确多了？

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/def88887-2c37-4270-bcdd-867f964c6cb9.png)

### 第六步：AI vs 中医老师，一起看看谁判断的准？

6.1 基于同学们的舌苔照片，让 AI 和真实的中医老师“同台诊断”。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/3291b4e2-c91f-44e7-b7d8-18883aee23c6.png)

6.2 打开结果文件 `舌苔小知识v2_final.xlsx`，对比分析谁的建议更细致、更靠谱！

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/cdf2bdba-ea1b-4109-b2fe-6a140296129f.png)

### 第七步：总结一下你都学到了什么

7.1 总结一下你都学到了什么

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/cb7468d2-5799-45c7-86ed-0272c9755abd.png)

### 第八步：放到一起，跑起来你的舌苔诊所App

8.1 没有装flask与flask-cors的同学需要先用如下代码确保安装

```bash
pip install flask flask-cors
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/8b933bbd-f21a-48ef-af40-b12c37f43638.png)

8.2 terminal执行如下代码，启动后台服务

```bash
python backend.py
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/00617c72-c5ab-422c-a91e-8ee4739870ae.png)

8.3 打开前端界面

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/c922c596-972e-43b8-a9aa-ce0d78acf9c5.png)

8.4 允许摄像头访问

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/d2937303-f86f-4daf-9d52-1dc19d31363d.png)

8.5 开始检测，首次检测速度可能会较慢，请如下图贴近摄像头进行拍照

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/a699a151-1897-4a62-9c92-848d524d1b6b.png)

---

## 🖼️ 最终效果图

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/jP2lRYKN4NENJO8g/img/25f1647c-b2c9-47c4-bc06-e644f71220c2.png)