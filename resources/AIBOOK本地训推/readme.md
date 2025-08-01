# 【高级】Project 04：自己搭建AI模型！AIBOOK本地化训推

## 📌 项目名称：自己搭建AI模型！AIBOOK本地化训推

📢  想亲手搭建属于自己的AI模型吗？想完整体验模型搭建→训练→推理全流程吗？现在无需云端依赖，用AIBOOK算力本就能立刻开启你的AI探索之旅！本项目无需复杂配置，“开箱即用”的AI学习方案让深度学习触手可及，特别适合学生和AI爱好者入门实践。

---

### 📄 项目介绍

本项目展示如何借助 AIBOOK算力本，在本地一步步完成一个完整的 AI 模型实训流程。从模型训练到推理部署，学生或初学者都能独立操作、快速上手，真正实现“边学边练”，无需依赖昂贵服务器或复杂环境配置。

整个实训以经典的 **Fashion-MNIST** 数据集为基础，任务目标是图像分类：让模型识别图像中是“鞋子”、“T恤”还是“外套”。学生将掌握从数据加载、模型构建、训练调试到模型推理的完整流程，全面提升对 AI 实践的理解与掌控能力。

---

### 🧠项目难度：

高级。本项目推荐有编程经验的用户体验。

---

### ✨ 项目亮点

*   **零基础构建GoogleNet经典模型****：**从底层架构开始搭建AI模型，在实践中理解和掌握深度学习的核心原理。
    
*   **专为教学设计的AI实训：**详细代码注释+实时训练反馈+可视化结果输出，自学教学两相宜。
    
*   **真正的离线AI实验室：**突破网络限制，在校园/家庭/无网环境都能完整进行模型训练和测试。
    
*   **看得见的AI学习过程：**动态损失曲线+分类效果可视化，直观展示模型"思考"过程。
    

---

### 🛠️ 适用范围

*   职业学校 / 高职高专 / 本科高校的 AI 教学课程
    
*   AI兴趣社团、编程训练营、K12人工智能启蒙
    
*   有志学习深度学习的初学者或非科班学生
    
*   资源有限但想上手 AI 实战的个人开发者
    

---

### 🎓 前置能力要求

*   **具备基础 Python 编程能力**  
    熟悉变量、函数、流程控制（如 if/for）、模块导入等基本语法。
    
*   **了解文件操作与命令行使用**  
    会打开终端，能运行 `.py` 脚本，理解路径、环境等基本操作。
    
*   **具备初步的 AI 概念理解**  
    了解“训练-验证-推理”的基本流程，对数据集、损失函数、模型结构有初步概念更佳。
    

---

##  🛠️ 操作步骤与解释

### 第一步：环境准备

点击 AIBOOK 桌面上的「终端」图标，进入命令行界面。

![05573a40713e337969e9f217d28ae4e.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/4jKqmoR2avEYlw19/img/4295da04-4bea-4019-a729-98f9b6f4c58b.png)

执行以下命令安装 Musa 运行环境（初次安装可能需要较长时间，请耐心等待）：

```bash
curl -fsSL https://apollo-appstore-pre.tos-cn-beijing.volces.com/appstore/release/install.sh | bash
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/8d61d90e-526e-4e13-9fc0-3508cabb3d81.png)

安装完成后terminal执行命令，启动环境，左下角括号内为musa则启动成功

```bash
source ~/.bashrc
conda activate musa
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/f633fd16-51e0-4a32-9d4c-17e1d284da0e.png)

### 第二步：安装课件

1.继续在终端中执行以下命令，安装课件依赖包（首次运行时间较长）：

```bash
conda run -n musa bash -c 'pip install https://apollo-appstore-pre.tos-cn-beijing.volces.com/appstore/release/courses/d2l-2.0.0-py3-none-any.whl'
```

2.下载教学课程源码：

```bash
wget https://apollo-appstore-pre.tos-cn-beijing.volces.com/appstore/release/ai/d2l-zh-2.0.0.zip
```

3.解压课程文件：

```bash
unzip -d d2l-zh-2.0.0 d2l-zh-2.0.0.zip
```

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/7cbd8884-bffb-4562-bc76-7e25440cf45f.png)

### 第三步：打开 VS Code 查看实训教程

1.  打开 VSCode，选择刚才解压的课程路径：
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/f8ee4507-de69-4d87-9f93-a6607f48bd0a.png)

2.  打开文件夹/d2l-zh-2.0.0/pytorch/chapter\_convolutional-modern下googlenet.ipynb
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/1b2fd4a4-abc7-4c43-9e09-467dcf7bf3a9.png)

3.  首次打开时，点击界面上方的 **“Select Kernel”**，选择 **“Install/Enable Suggested Extensions”** 以安装必要插件。
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/3939ddbd-c515-4eb7-b954-b4180f75f4f6.png)

4.  插件安装完成后，再次点击 **“Select Kernel”**，选择 **“Python Environments”** 
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/d53e1bda-50b1-4d98-a9dc-393dfe75d8f6.png)

5.  确认环境为 `musa`
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/03a6fef1-9b3d-4639-9def-d42cf30f767e.png)

### 第四步：进行本地训练

1.  点击RunAll按顺序执行代码即可
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/8942098c-8309-489d-9887-6ad097ab353a.png)

2.  这里我们首先自己搭建了Googlenet模型
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/6757f4a5-61cf-4d49-a6e5-c438da160a41.png)

3.  基于**Fashion-MNIST数据集**进行训练
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/d27e81bb-398b-4090-a330-dfc7981ea3a8.png)

📌 注意事项：

*   完成 5 轮训练约需 20 分钟。
    
*   训练期间将占用较多显存与算力，建议暂停其他大型程序运行，避免系统卡顿或中断。
    
*   可在终端或输出区域实时观察训练指标：准确率稳步提升、损失函数逐步下降，模型逐渐学会如何更好地识别图像。
    

4.  将训练权重存储到本地
    

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/6845e920-2afa-4d55-a219-f17b0fc3acc7.png)

### 第五步：加载模型进行本地推理

训练完成后，执行接下来的代码块，将模型重新加载并对测试图片进行预测。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/e78acd68-4fe2-4816-abbb-0e367ff4ded4.png)

🎉 看! 我们训练好的 AI成功识别了各种潮流单品 

---

## 🖼️ 最终效果图

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/Mp7ld84LXyvWlBQN/img/e78acd68-4fe2-4816-abbb-0e367ff4ded4.png)