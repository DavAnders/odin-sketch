const container = document.getElementById("gridContainer");

function handleMouseEnter() {
  this.style.backgroundColor = "#f00";
}

function handleMouseLeave() {
  this.style.backgroundColor = "grey";
}

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 16; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("gridItemOuter");
    for (let j = 0; j < 16; j++) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("gridItemInner");
      div.appendChild(innerDiv);

      innerDiv.addEventListener("mouseenter", handleMouseEnter);
      innerDiv.addEventListener("mouseleave", handleMouseLeave);
    }
  }
});
