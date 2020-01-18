import creatures from "./creatures.js";
import hazards from "./hazards/index.js";

export default hexagon;
function hexagon(
  id,
  color = "red",
  terrain = "plains",
  creature = "none",
  damage = 50,
  parent
) {
  const container = document.createElement("div");
  const hex = document.createElement("div");
  const loc = document.createElement("div");
  const unit = document.createElement("div");

  container.classList.add("container", terrain || "none");
  loc.classList.add("location");
  unit.classList.add("unit");
  hex.classList.add("hex", creature, color);

  if(hazards[terrain]) {
    container.innerHTML = hazards[terrain]();
  }

  const { top, left, width, height } = getPositionCoord(id);

  container.id = id.toLowerCase();
  container.style.top = `${top}px`;
  container.style.left = `${left}px`;
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  // container.innerHTML = "&#x2B22;";
  loc.innerHTML = `${id}`;
  unit.innerHTML = getUnit(creature, damage, color);

  // hex.append(loc);
  hex.append(loc);
  hex.append(unit);
  container.append(hex);
  parent.append(container);
}

function getPositionCoord(id, width = 97, height = 90) {
  const coords = {
    // col, top-offset, hex count
    A: [1, 3, 3],
    B: [2, 2, 4],
    C: [3, 1, 5],
    D: [4, 0, 6],
    E: [5, 1, 5],
    F: [6, 2, 4]
  };

  const key = id.replace(/\d+$/i, "");
  const index = Number(id.replace(/^[a-z]+/i, ""));
  const [offsetX, offsetY, count] = coords[key];
  const top = 14 + ((height / 2) >> 0) * offsetY + (count - index) * height;
  const left = 70 + width * 0.81 * (offsetX - 1);

  return { top, left, width, height };
}

function getUnit(creature, health = 50, color = "#00ff00") {
  if (creature === "none" || !creature) return "";
  console.log(222, creature, health)

  const unit = creatures(creature);
  const { svg, power } = unit;
  const percent = (100 - (Math.abs(health) / power) * 100) >> 0;
  const warning = ["black", "#ff0000", "#35afff", "#35afff"][
    (percent / 30) >> 0
  ];
  const dead = percent < 1 ? "opacity:0.2" : "";
  const hex = colorToHex(color);
  // console.log(health, color, power, percent, warning);
  return `
    <div class="unit-inner" style="box-shadow: 0 4px 8px 2px ${hex}59; border-color:${hex};${dead}">
      <div class="unit-name">${creature}</div>
      <div class="unit-icon">${svg}</div>
      <div class="unit-health"><div class="unit-percent" style="width:${percent}%; background: ${warning}"></span></div>
  </div>
  `;
}

function colorToHex(color) {
  if (/^#/.test(color)) return color;
  return {
    red: "#ce0000",
    green: "#08a308",
    blue: "#35afff",
    black: "#111111",
    brown: "#112233"
  }[color];
}
