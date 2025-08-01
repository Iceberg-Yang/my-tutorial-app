document.addEventListener("DOMContentLoaded", function () {
  // 游戏状态
  let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  let score = 0;
  let gameOver = false;

  // DOM元素
  const gridContainer = document.querySelector(".grid-container");
  const tileContainer = document.querySelector(".tile-container");
  const scoreDisplay = document.querySelector(".score");
  const retryButton = document.querySelector(".retry-button");

  // 存储方块元素的数组
  let tiles = [];

  // 初始化游戏
  function initGame() {
    // 重置游戏状态
    grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    score = 0;
    gameOver = false;
    updateScore();

    // 清空界面上的方块
    tileContainer.innerHTML = "";
    tiles = [];

    // 添加两个初始方块
    addRandomTile();
    addRandomTile();
  }

  // 更新分数显示
  function updateScore() {
    scoreDisplay.textContent = score;
  }

  // 在随机空位置添加一个新方块(2或4)
  function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      grid[randomCell.row][randomCell.col] = value;
      addTile(randomCell.row, randomCell.col, value);
    }
  }

  // 在指定位置添加一个方块到界面上
  function addTile(row, col, value) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.classList.add(`tile-${value}`);
    // 对于大于2048的数字，使用统一的super类
    if (value > 2048) {
      tile.classList.add("tile-super");
    }
    tile.textContent = value;
    
    // 计算位置（考虑响应式设计）
    const isMobile = window.innerWidth <= 600;
    const isSmallMobile = window.innerWidth <= 450;
    
    let tileSize = 106.25;
    let tileMargin = 15;
    
    if (isSmallMobile) {
      tileSize = 68.75;
      tileMargin = 8;
    } else if (isMobile) {
      tileSize = 87.5;
      tileMargin = 10;
    }
    
    tile.style.top = `${row * (tileSize + tileMargin)}px`;
    tile.style.left = `${col * (tileSize + tileMargin)}px`;
    
    tileContainer.appendChild(tile);
    
    // 添加到tiles数组
    tiles.push({
      element: tile,
      row: row,
      col: col,
      value: value,
      merged: false
    });
    
    // 添加出现动画
    setTimeout(() => {
      tile.classList.add("merged");
    }, 10);
  }

  // 移动方块
  function move(direction) {
    if (gameOver) return;

    let moved = false;
    const originalGrid = JSON.parse(JSON.stringify(grid));
    
    // 重置所有方块的merged状态
    tiles.forEach(tile => {
      tile.merged = false;
    });

    // 根据方向处理移动
    switch (direction) {
      case "up":
        for (let col = 0; col < 4; col++) {
          moveColumnUp(col);
        }
        break;
      case "down":
        for (let col = 0; col < 4; col++) {
          moveColumnDown(col);
        }
        break;
      case "left":
        for (let row = 0; row < 4; row++) {
          moveRowLeft(row);
        }
        break;
      case "right":
        for (let row = 0; row < 4; row++) {
          moveRowRight(row);
        }
        break;
    }

    // 检查是否有移动
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (originalGrid[row][col] !== grid[row][col]) {
          moved = true;
          break;
        }
      }
      if (moved) break;
    }

    // 如果有移动，添加新方块并更新界面
    if (moved) {
      // 等待动画完成后添加新方块
      setTimeout(() => {
        addRandomTile();
        checkGameOver();
      }, 150);
    }
  }

  // 向上移动一列
  function moveColumnUp(col) {
    let tilesInColumn = tiles.filter(tile => tile.col === col).sort((a, b) => a.row - b.row);
    let newRow = 0;
    
    // 计算位置（考虑响应式设计）
    const isMobile = window.innerWidth <= 600;
    const isSmallMobile = window.innerWidth <= 450;
    
    let tileSize = 106.25;
    let tileMargin = 15;
    
    if (isSmallMobile) {
      tileSize = 68.75;
      tileMargin = 8;
    } else if (isMobile) {
      tileSize = 87.5;
      tileMargin = 10;
    }
    
    for (let i = 0; i < tilesInColumn.length; i++) {
      let tile = tilesInColumn[i];
      let nextTile = tilesInColumn[i + 1];
      
      // 更新网格数据
      grid[tile.row][col] = 0;
      
      if (nextTile && tile.value === nextTile.value && !tile.merged && !nextTile.merged) {
        // 合并方块
        tile.value *= 2;
        tile.merged = true;
        score += tile.value;
        tile.element.textContent = tile.value;
        tile.element.className = "tile"; // 重置类名
        tile.element.classList.add(`tile-${tile.value}`);
        if (tile.value > 2048) {
          tile.element.classList.add("tile-super");
        }
        
        // 移动当前方块到新位置
        tile.row = newRow;
        grid[newRow][col] = tile.value;
        tile.element.style.top = `${newRow * (tileSize + tileMargin)}px`;
        
        // 删除下一个方块
        nextTile.element.remove();
        tiles.splice(tiles.indexOf(nextTile), 1);
        
        newRow++;
        i++; // 跳过下一个方块
      } else {
        // 移动方块到新位置
        tile.row = newRow;
        grid[newRow][col] = tile.value;
        tile.element.style.top = `${newRow * (tileSize + tileMargin)}px`;
        newRow++;
      }
    }
  }

  // 向下移动一列
  function moveColumnDown(col) {
    let tilesInColumn = tiles.filter(tile => tile.col === col).sort((a, b) => b.row - a.row);
    let newRow = 3;
    
    // 计算位置（考虑响应式设计）
    const isMobile = window.innerWidth <= 600;
    const isSmallMobile = window.innerWidth <= 450;
    
    let tileSize = 106.25;
    let tileMargin = 15;
    
    if (isSmallMobile) {
      tileSize = 68.75;
      tileMargin = 8;
    } else if (isMobile) {
      tileSize = 87.5;
      tileMargin = 10;
    }
    
    for (let i = 0; i < tilesInColumn.length; i++) {
      let tile = tilesInColumn[i];
      let nextTile = tilesInColumn[i + 1];
      
      // 更新网格数据
      grid[tile.row][col] = 0;
      
      if (nextTile && tile.value === nextTile.value && !tile.merged && !nextTile.merged) {
        // 合并方块
        tile.value *= 2;
        tile.merged = true;
        score += tile.value;
        tile.element.textContent = tile.value;
        tile.element.className = "tile"; // 重置类名
        tile.element.classList.add(`tile-${tile.value}`);
        if (tile.value > 2048) {
          tile.element.classList.add("tile-super");
        }
        
        // 移动当前方块到新位置
        tile.row = newRow;
        grid[newRow][col] = tile.value;
        tile.element.style.top = `${newRow * (tileSize + tileMargin)}px`;
        
        // 删除下一个方块
        nextTile.element.remove();
        tiles.splice(tiles.indexOf(nextTile), 1);
        
        newRow--;
        i++; // 跳过下一个方块
      } else {
        // 移动方块到新位置
        tile.row = newRow;
        grid[newRow][col] = tile.value;
        tile.element.style.top = `${newRow * (tileSize + tileMargin)}px`;
        newRow--;
      }
    }
  }

  // 向左移动一行
  function moveRowLeft(row) {
    let tilesInRow = tiles.filter(tile => tile.row === row).sort((a, b) => a.col - b.col);
    let newCol = 0;
    
    // 计算位置（考虑响应式设计）
    const isMobile = window.innerWidth <= 600;
    const isSmallMobile = window.innerWidth <= 450;
    
    let tileSize = 106.25;
    let tileMargin = 15;
    
    if (isSmallMobile) {
      tileSize = 68.75;
      tileMargin = 8;
    } else if (isMobile) {
      tileSize = 87.5;
      tileMargin = 10;
    }
    
    for (let i = 0; i < tilesInRow.length; i++) {
      let tile = tilesInRow[i];
      let nextTile = tilesInRow[i + 1];
      
      // 更新网格数据
      grid[row][tile.col] = 0;
      
      if (nextTile && tile.value === nextTile.value && !tile.merged && !nextTile.merged) {
        // 合并方块
        tile.value *= 2;
        tile.merged = true;
        score += tile.value;
        tile.element.textContent = tile.value;
        tile.element.className = "tile"; // 重置类名
        tile.element.classList.add(`tile-${tile.value}`);
        if (tile.value > 2048) {
          tile.element.classList.add("tile-super");
        }
        
        // 移动当前方块到新位置
        tile.col = newCol;
        grid[row][newCol] = tile.value;
        tile.element.style.left = `${newCol * (tileSize + tileMargin)}px`;
        
        // 删除下一个方块
        nextTile.element.remove();
        tiles.splice(tiles.indexOf(nextTile), 1);
        
        newCol++;
        i++; // 跳过下一个方块
      } else {
        // 移动方块到新位置
        tile.col = newCol;
        grid[row][newCol] = tile.value;
        tile.element.style.left = `${newCol * (tileSize + tileMargin)}px`;
        newCol++;
      }
    }
  }

  // 向右移动一行
  function moveRowRight(row) {
    let tilesInRow = tiles.filter(tile => tile.row === row).sort((a, b) => b.col - a.col);
    let newCol = 3;
    
    // 计算位置（考虑响应式设计）
    const isMobile = window.innerWidth <= 600;
    const isSmallMobile = window.innerWidth <= 450;
    
    let tileSize = 106.25;
    let tileMargin = 15;
    
    if (isSmallMobile) {
      tileSize = 68.75;
      tileMargin = 8;
    } else if (isMobile) {
      tileSize = 87.5;
      tileMargin = 10;
    }
    
    for (let i = 0; i < tilesInRow.length; i++) {
      let tile = tilesInRow[i];
      let nextTile = tilesInRow[i + 1];
      
      // 更新网格数据
      grid[row][tile.col] = 0;
      
      if (nextTile && tile.value === nextTile.value && !tile.merged && !nextTile.merged) {
        // 合并方块
        tile.value *= 2;
        tile.merged = true;
        score += tile.value;
        tile.element.textContent = tile.value;
        tile.element.className = "tile"; // 重置类名
        tile.element.classList.add(`tile-${tile.value}`);
        if (tile.value > 2048) {
          tile.element.classList.add("tile-super");
        }
        
        // 移动当前方块到新位置
        tile.col = newCol;
        grid[row][newCol] = tile.value;
        tile.element.style.left = `${newCol * (tileSize + tileMargin)}px`;
        
        // 删除下一个方块
        nextTile.element.remove();
        tiles.splice(tiles.indexOf(nextTile), 1);
        
        newCol--;
        i++; // 跳过下一个方块
      } else {
        // 移动方块到新位置
        tile.col = newCol;
        grid[row][newCol] = tile.value;
        tile.element.style.left = `${newCol * (tileSize + tileMargin)}px`;
        newCol--;
      }
    }
  }

  // 检查游戏是否结束
  function checkGameOver() {
    // 检查是否还有空位
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          return;
        }
      }
    }

    // 检查是否还能合并
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] === grid[row][col + 1]) {
          return;
        }
      }
    }

    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (grid[row][col] === grid[row + 1][col]) {
          return;
        }
      }
    }

    // 游戏结束
    gameOver = true;
    alert("游戏结束！你的分数是：" + score);
  }

  // 触摸滑动支持的变量
  let touchStartX = 0;
  let touchStartY = 0;

  // 键盘事件监听
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        move("up");
        event.preventDefault();
        break;
      case "ArrowDown":
        move("down");
        event.preventDefault();
        break;
      case "ArrowLeft":
        move("left");
        event.preventDefault();
        break;
      case "ArrowRight":
        move("right");
        event.preventDefault();
        break;
    }
  });

  // 触摸事件监听
  document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener("touchmove", function (event) {
    event.preventDefault(); // 防止页面滚动
  });

  document.addEventListener("touchend", function (event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    // 确定滑动方向
    if (Math.abs(dx) > Math.abs(dy)) {
      // 水平滑动
      if (dx > 50) {
        move("right"); // 向右滑动
      } else if (dx < -50) {
        move("left"); // 向左滑动
      }
    } else {
      // 垂直滑动
      if (dy > 50) {
        move("down"); // 向下滑动
      } else if (dy < -50) {
        move("up"); // 向上滑动
      }
    }
  });

  // 新游戏按钮事件
  retryButton.addEventListener("click", initGame);

  // 初始化游戏
  initGame();
});