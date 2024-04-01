const container = document.getElementById("gridContainer");

const colorPicker = document.getElementById("colorPicker");
const applyColorButton = document.getElementById("applyColorButton");

function hexToHSL(H) {
  // Had to figure out how to convert color picker values to HSL to keep the
  //functionality of decreasing the lightness of the color on mouse leave.
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = parseInt(H[1] + H[1], 16);
    g = parseInt(H[2] + H[2], 16);
    b = parseInt(H[3] + H[3], 16);
  } else if (H.length === 7) {
    r = parseInt(H[1] + H[2], 16);
    g = parseInt(H[3] + H[4], 16);
    b = parseInt(H[5] + H[6], 16);
  }
  // Then convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);
  return { h, s, l };
}

let initialHSL = { h: 179, s: 88, l: 49 };

applyColorButton.addEventListener("click", () => {
  const hexColor = colorPicker.value;
  initialHSL = hexToHSL(hexColor);
});

function handleMouseEnter() {
  this.style.backgroundColor = "#f00";
}

function darkenColor(rgb) {
  return rgb.map((component) => Math.max(component - component * 0.1, 0));
}

function handleMouseLeave() {
  // Initialize or increment the visit count
  let visits = parseInt(this.getAttribute("data-visits") || "0") + 1;
  this.setAttribute("data-visits", visits.toString());

  // Each visit reduces the lightness by 10%
  let newLightness = Math.max(initialHSL.l - 5 * visits, 0);
  this.style.backgroundColor = `hsl(${initialHSL.h}, ${initialHSL.s}%, ${newLightness}%)`;
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
