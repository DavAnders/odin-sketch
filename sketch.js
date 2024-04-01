const container = document.getElementById("gridContainer");

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 16; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("gridItemOuter");
    for (let j = 0; j < 16; j++) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("gridItemInner");
      div.appendChild(innerDiv);
    }
  }
});
