// Parse the static HTML and extract
// Attacker and Defender data

// the first row is the table header
// second the players Color and Legion icon
// third row nests the unit data
// Return a Object literal with the battle state

export default parseTableData;
function parseTableData(table) {
  const [header, player] = table.children;

  const parts = player.innerText
    .split("-")
    .map(string => string.trim().toLowerCase());
  const [color, icon] = parts;

  let data = {
    header: header.innerText,
    color,
    icon,
    pointValue: 0,
    creatures: []
  };
  let rows = table.children[2].getElementsByTagName("tbody")[0].rows;

  for (var i = 0; i < rows.length; i++) {
    const [creature, latlong, damage = null] = rows[i].cells;

    // last row only has 2 cells, and it's the point value
    if (/point/i.test(creature.innerText)) {
      data.pointValue = Number(latlong.innerText);
      continue;
    }

    // first row is the header, ignore it.
    if (/(creature|loc|dam)/i.test(creature.innerText)) {
      continue;
    }

    data.creatures.push({
      creature: creature.innerText,
      latlong: latlong.innerText,
      color,
      damage: Number(damage.innerText) + 0
    });
  }

  return data;
}
