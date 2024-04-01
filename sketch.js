const container = document.getElementById("gridContainer");

function handleMouseEnter() {
  this.style.backgroundColor = "#f00";
}

function handleMouseLeave() {
  this.style.backgroundColor = "#ff6b6b";
}

function createGrid(size) {
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("gridItemOuter");
    for (let j = 0; j < size; j++) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("gridItemInner");
      div.appendChild(innerDiv);

      innerDiv.addEventListener("mouseenter", handleMouseEnter);
      innerDiv.addEventListener("mouseleave", handleMouseLeave);
    }
  }
}

const gridSizeInput = document.getElementById("gridSizeInput");
const gridWidthInput = document.getElementById("gridWidthInput");
const applyGridSizeButton = document.getElementById("changeGrid");

function updateGridWidth(columns, px = 20) {
  const columnWidth = px;
  const newWidth = columnWidth * columns;
  const gridItemOuters = document.querySelectorAll(".gridItemOuter");
  const gridItemInners = document.querySelectorAll(".gridItemInner");
  gridItemOuters.forEach(function (item) {
    item.style.width = `${newWidth}px`;
  });
  gridItemInners.forEach(function (item) {
    item.style.width = `${px}px`;
    item.style.height = `${px}px`;
  });
}
document.addEventListener("DOMContentLoaded", createGrid(16));
document.addEventListener("DOMContentLoaded", updateGridWidth(16));

applyGridSizeButton.addEventListener("click", () => {
  const gridSize = parseInt(gridSizeInput.value);
  let gridWidth = parseInt(gridWidthInput.value);
  if (isNaN(gridWidth)) {
    gridWidth = 20;
  }

  if (!isNaN(gridSize) && gridSize > 0) {
    createGrid(gridSize);
    updateGridWidth(gridSize, gridWidth);
  }
});
