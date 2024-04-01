const container = document.getElementById("gridContainer");

function handleMouseEnter() {
  this.style.backgroundColor = "#f00";
}

function handleMouseLeave() {
  this.style.backgroundColor = "grey";
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

function updateGridWidth(columns) {
  const columnWidth = 20;
  const newWidth = columnWidth * columns;
  const gridItemOuters = document.querySelectorAll(".gridItemOuter");
  gridItemOuters.forEach(function (item) {
    item.style.width = `${newWidth}px`;
  });
}
document.addEventListener("DOMContentLoaded", createGrid(16));
document.addEventListener("DOMContentLoaded", updateGridWidth(16));

const gridSizeInput = document.getElementById("gridSizeInput");
const applyGridSizeButton = document.getElementById("changeGrid");

applyGridSizeButton.addEventListener("click", () => {
  const gridSize = gridSizeInput.value;
  const gridSizeNumber = parseInt(gridSize);
  if (!isNaN(gridSizeNumber) && gridSizeNumber > 0) {
    createGrid(gridSizeNumber);
    updateGridWidth(gridSizeNumber);
  }
});
