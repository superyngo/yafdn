---
title: 用javascript+css做貪食蛇
description: 從零打造貪食蛇
date: "2023/08/15"
modified:
categories:
  - javcascript
  - 開發筆記
published: true
---

# 先做再說

前端自學了半年，跟著[CodeLove 愛寫扣學院](https://codelove.tw/)從最基礎的 HTML+CSS 開始到 Vue Framework  
但目前仍是待業中...汗  
前陣子想說做看看貪食蛇  
先用純 javascript 硬刻  
花了兩晚 做出一個會動的版本  
![Demo](/workshop/snake-old.png)
Demo：[Demo](https://superyngo.github.io/snake_spaghetti_style_code/)

這版用 row 包 coulmn 做 X Y 定位  
可以設定方塊數和速度  
有基本的 RWD 和觸控支援

# 用 SVELTE 做做看

前陣子開始摸 SVELTE  
就用 svelte 重新開發
這版 XY 改用單 array 定位  
左右移動為+-1  
上下移動為+-width 設定值  
跨邊界的邏輯也重新撰寫  
蛇蛇有身體和臉
![Demo](/workshop/snake.png)
Demo：[Demo](https://superyngo.github.io/snake_svelte3/)

# 仿古 3310

既然基本功能都做好了  
就想說套個 3310 的皮看看  
螢幕的部分用比例去定位
![Demo](/workshop/snake3310.png)
Demo：[Demo](https://yafdn.vercel.app/workshop/Notkia3310)

以上，希望早日找到工作！！
