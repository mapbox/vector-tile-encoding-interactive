var cellSize = 25;
var tilesize = 10;
var padding = 1;
var buffer = 2;
var buffx = padding + (buffer * cellSize);
var stepCount = 0;
var btn;
var title = document.getElementById('vt-title');
var desc = document.getElementById('vt-description');
var command = document.getElementById('vt-command');
var ctx;
var grid;

window.onload = function() {
  grid = document.getElementById('grid');
  makeGrid(grid, tilesize, buffer);
  btn = document.getElementById('vt-next');
  btn.onclick = function() {
    next(stepCount);
  };
};

// elem is a DOM selected element
// size is number of cells width and height
// buffer in number of cells
function makeGrid(canvas, size, buffer) {
  // each cell is 10x10 pixels
  ctx = canvas.getContext("2d");
  ctx.canvas.width = cellSize * (size + buffer) + padding;
  ctx.canvas.height = cellSize * (size + buffer) + padding;
  drawGrid(ctx, size, buffer);
}

function drawGrid(context, size, buff) {
  for (x = padding; x <= context.canvas.width + padding; x+=cellSize) {
    for (y = padding; y <= context.canvas.height + padding; y+=cellSize) {
      if (x < (padding + buff * cellSize) ||
          y < (padding + buff * cellSize) ||
          x-cellSize > ((cellSize * size + (padding * 2)) - (buff * cellSize)) ||
          y-cellSize > ((cellSize * size + (padding * 2)) - (buff * cellSize))) {
        context.fillStyle='#e5e5e5';
        context.fillRect(x-0.5, y-0.5, cellSize, cellSize);
      }

      context.strokeStyle='#666666';
      context.strokeRect(x-0.5, y-0.5, cellSize, cellSize);
    }
  }
}

function next(index) {
  try {
    title.innerHTML = steps[index].name;
    desc.innerHTML = steps[index].description;
    command.innerHTML = steps[index].commandx;
    btn.innerHTML = 'Next step';
    steps[index].command();
    stepCount++;
  } catch (err) {
    title.innerHTML = 'Back at the beginning';
    desc.innerHTML = 'Woop';
    command.innerHTML = 'A command';
    btn.innerHTML = 'Start over';
    ctx.clearRect(0, 0, grid.width, grid.height);
    makeGrid(grid, tilesize, buffer);
    stepCount=0;
  }
}

var cmd = {
  "mt": function(x, y) {
    ctx.moveTo(buffx + (cellSize*x), buffx + (cellSize*y));
  },
  "lt": function(x, y) {
    ctx.lineTo(buffx + (cellSize*x), buffx + (cellSize*y));
  },
  "arc": function(x, y) {
    ctx.arc(buffx + (cellSize*x), buffx + (cellSize*y), 3, 0, 2*Math.PI);
  }
};

var steps = [
  {
    "name": "Step 1",
    "description": "The first action when encoding a polygon is to point the command to a starting point. This uses the <code>MoveTo(x,y)</code> command. The blue dot is at <code>2, 2</code> starting at the top left of the grid.",
    "commandx": "MoveTo(1,2)",
    "command": function() {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      cmd.arc(1,2);
      ctx.fill();
    }
  },
  {
    "name": "Step 2",
    "description": "In order to move from a starting position, we use a <code>LineTo(x,y)</code> command. The X and Y values are relative to the previous command, rather than the origin of the grid, to keep file size down.",
    "commandx": "LineTo(3,-1)",
    "command": function() {
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      cmd.mt(1,2);
      cmd.lt(4,1);
      ctx.stroke();
    }
  },
  {
    "name": "Step 3",
    "description": "Drawing another path in the triangle polygon.",
    "commandx": "LineTo(3,4)",
    "command": function() {
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      cmd.mt(4,1);
      cmd.lt(7,5);
      ctx.stroke();
    }
  },
  {
    "name": "Step 4",
    "description": "Drawing another path in the blue polygon.",
    "commandx": "LineTo(-4,2)",
    "command": function() {
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      cmd.mt(7,5);
      cmd.lt(3,7);
      ctx.stroke();
    }
  },
  {
    "name": "Step 5",
    "description": "Finally, we close a path. This uses the <code>ClosePath()</code> command that closes the path to most recently used <code>MoveTo(x,y)</code> command, which is our starting point.",
    "commandx": "ClosePath()",
    "command": function() {
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      cmd.mt(3,7);
      cmd.lt(1,2);
      ctx.stroke();
    }
  },
  {
    "name": "Step 6",
    "description": "Now on to the <span style='color: red'>red polygon</span>! This requires another <code>MoveTo</code> command relative to the last <code>LineTo</code> of the previous polygon.",
    "commandx": "MoveTo(1,-5)",
    "command": function() {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      cmd.arc(4,2);
      ctx.fill();
    }
  },
  {
    "name": "Step 7",
    "description": "Since the <span style='color: red'>red polygon</span> is an ",
    "commandx": "LineTo(-1,2)",
    "command": function() {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      cmd.mt(4,2);
      cmd.lt(3,4);
      ctx.stroke();
    }
  },
  {
    "name": "Step 7",
    "description": "Since the <span style='color: red'>red polygon</span> is an ",
    "commandx": "LineTo(2,1)",
    "command": function() {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      cmd.mt(3,4);
      cmd.lt(5,5);
      ctx.stroke();
    }
  },
  {
    "name": "Step 7",
    "description": "Since the <span style='color: red'>red polygon</span> is an ",
    "commandx": "ClosePath()",
    "command": function() {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      cmd.mt(5,5);
      cmd.lt(4,2);
      ctx.stroke();
    }
  }
];