document.querySelector(".create-button").addEventListener("click", function () {
  const width = document.querySelector("#width").value;
  const height = document.querySelector("#height").value;
  const workspace = document.querySelector(".workspace");
  const newFileWindow = document.querySelector(".new-file-window");
  const areacanvas = document.querySelector(".areacanvas");
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.backgroundColor = "white";
  workspace.style.display = "grid";
  newFileWindow.style.display = "none";
  areacanvas.appendChild(canvas);
});

document.querySelector("#brushButton").addEventListener("click", function () {
  activeTool = "brush";
  activateBrushTool();
});

document.querySelector("#eraserButton").addEventListener("click", function () {
  activeTool = "eraser";
  activateEraserTool();
});

document.querySelector("#moveButton").addEventListener("click", function () {
  activeTool = "move";
  activateMoveTool();
});

document.querySelector("#shapeButton").addEventListener("click", function () {
  activeTool = "shape";
  activateShapeTool();
});

document.querySelector("#circleShapeButton").addEventListener("click", function () {
  currentShape = "circle";
});

document.querySelector("#rectangleShapeButton").addEventListener("click", function () {
  currentShape = "rectangle";
});

document.querySelector("#rotateCWButton").addEventListener("click", function () {
  rotateCanvas(90);
});

document.querySelector("#rotateCCWButton").addEventListener("click", function () {
  rotateCanvas(-90);
});

document.querySelector("#flipHorizontalButton").addEventListener("click", function () {
  flipCanvas("horizontal");
});

document.querySelector("#flipVerticalButton").addEventListener("click", function () {
  flipCanvas("vertical");
});

let activeTool = "none"; // Variabel untuk melacak alat aktif
let currentShape = "rectangle"; // Default shape adalah persegi panjang
let shapes = []; // Array untuk menyimpan bentuk yang digambar

function activateBrushTool() {
  const canvas = document.querySelector(".areacanvas canvas");
  const ctx = canvas.getContext("2d");
  brushSize = document.querySelector("#brushSize").value;
  brushShape = document.querySelector("#brushShape").value;
  brushOpacity = document.querySelector("#brushOpacity").value / 100;

  ctx.lineWidth = brushSize;
  ctx.lineCap = brushShape;
  ctx.globalAlpha = brushOpacity;
  ctx.strokeStyle = "black"; // Warna brush

  // Event listener untuk menggambar
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
}

function activateEraserTool() {
  const canvas = document.querySelector(".areacanvas canvas");
  const ctx = canvas.getContext("2d");
  eraserSize = document.querySelector("#eraserSize").value;
  eraserShape = document.querySelector("#eraserShape").value;
  eraserOpacity = document.querySelector("#eraserOpacity").value / 100;

  ctx.lineWidth = eraserSize;
  ctx.lineCap = eraserShape;
  ctx.globalAlpha = eraserOpacity;
  ctx.strokeStyle = "white"; // Warna eraser sama dengan warna background canvas

  // Event listener untuk menghapus
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
}

function activateMoveTool() {
  const canvas = document.querySelector(".areacanvas canvas");
  let isMoving = false;
  let startX, startY;

  canvas.addEventListener("mousedown", startMove);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", stopMove);
  canvas.addEventListener("mouseout", stopMove);

  function startMove(e) {
      if (activeTool !== "move") return;
      isMoving = true;
      startX = e.offsetX;
      startY = e.offsetY;
  }

  function move(e) {
      if (!isMoving || activeTool !== "move") return;

      const dx = e.offsetX - startX;
      const dy = e.offsetY - startY;

      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, dx, dy);

      startX = e.offsetX;
      startY = e.offsetY;
  }

  function stopMove() {
      isMoving = false;
  }
}

function rotateCanvas(angle) {
  const canvas = document.querySelector(".areacanvas canvas");
  const ctx = canvas.getContext("2d");

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  const radians = (angle * Math.PI) / 180;
  const width = canvas.width;
  const height = canvas.height;

  const newWidth =
      Math.abs(Math.cos(radians) * width) + Math.abs(Math.sin(radians) * height);
  const newHeight =
      Math.abs(Math.sin(radians) * width) + Math.abs(Math.cos(radians) * height);

  tempCanvas.width = newWidth;
  tempCanvas.height = newHeight;

  tempCtx.putImageData(imageData, 0, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(tempCanvas, -width / 2, -height / 2);
  ctx.restore();

  redrawShapes(); // Gambar ulang semua bentuk setelah rotasi
}

function flipCanvas(direction) {
  const canvas = document.querySelector(".areacanvas canvas");
  const ctx = canvas.getContext("2d");

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.putImageData(imageData, 0, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (direction === "horizontal") {
      ctx.scale(-1, 1);
  } else if (direction === "vertical") {
      ctx.scale(1, -1);
  }

  ctx.drawImage(tempCanvas, -canvas.width / 2, -canvas.height / 2);
  ctx.restore();

  redrawShapes(); // Gambar ulang semua bentuk setelah pembalikan
}

function activateShapeTool() {
  const canvas = document.querySelector(".areacanvas canvas");
  const ctx = canvas.getContext("2d");

  let startX, startY;
  let isDrawing = false;

  canvas.addEventListener("mousedown", function (e) {
      if (activeTool !== "shape") return; // Hanya aktif jika alat Shape Tool dipilih
      startX = e.offsetX;
      startY = e.offsetY;
      isDrawing = true;
  });

  canvas.addEventListener("mousemove", function (e) {
      if (!isDrawing || activeTool !== "shape") return;

      const currentX = e.offsetX;
      const currentY = e.offsetY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redrawShapes();
      drawShapePreview(startX, startY, currentX, currentY);
  });

  canvas.addEventListener("mouseup", function (e) {
      if (!isDrawing || activeTool !== "shape") return;
      isDrawing = false;

      const endX = e.offsetX;
      const endY = e.offsetY;

      shapes.push({
          type: currentShape,
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY,
          color: "black", 
          lineWidth: 2, 
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redrawShapes();
  });

  function drawShapePreview(x1, y1, x2, y2) {
      ctx.beginPath();
      if (currentShape === "circle") {
          const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      } else if (currentShape === "rectangle") {
          const width = x2 - x1;
          const height = y2 - y1;
          ctx.rect(x1, y1, width, height);
      }
      ctx.strokeStyle = "black"; // Warna shape
      ctx.lineWidth = 2; // Ketebalan garis shape
      ctx.stroke();
  }
}

function redrawShapes() {
  const canvas = document.querySelector(".areacanvas canvas");
  const ctx = canvas.getContext("2d");

  shapes.forEach((shape) => {
      ctx.beginPath();
      ctx.lineWidth = shape.lineWidth;
      ctx.strokeStyle = shape.color;

      if (shape.type === "circle") {
          const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
          ctx.arc(shape.x1, shape.y1, radius, 0, 2 * Math.PI);
      } else if (shape.type === "rectangle") {
          const width = shape.x2 - shape.x1;
          const height = shape.y2 - shape.y1;
          ctx.rect(shape.x1, shape.y1, width, height);
      }

      ctx.stroke();
  });
}

function startDrawing(e) {
  if (activeTool === "brush" || activeTool === "eraser") {
      const ctx = e.target.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      e.target.addEventListener("mousemove", draw);
  }
}

function draw(e) {
  if (activeTool === "brush" || activeTool === "eraser") {
      const ctx = e.target.getContext("2d");
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
  }
}

function stopDrawing(e) {
  if (activeTool === "brush" || activeTool === "eraser") {
      const ctx = e.target.getContext("2d");
      ctx.closePath();
      e.target.removeEventListener("mousemove", draw);
  }
}
