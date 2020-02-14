import creatures from './creatures.js';


export default getUnit;
function getUnit(creature, damage, playerColor = '#00ff00') {
    if (creature === 'none' || !creature) return '';

    const unit = creatures(creature);
    const titan =/^titan$/i.test(creature);
    const { svg, power, fly, range, skill } = unit;

    const percent = (100 - (Math.abs(damage) / power) * 100) >> 0;
    let dead = percent < 1 ? 'unit-dead' : '';

    // Creature attributes
    const attr = [power, fly, range, skill].map((att, n) => {
        const name = ['power', 'fly', 'rangestrike', 'skill'][n];
        const value = [att, '★', '🗲', att][n];
        return att
            ? `<span class="unit-attr-cell unit-attr-${name}">${value}</span>`
            : '';
    });

    // Damage value
    const showDamage = damage < 0 && !dead ? "show-damage": "";

    // Treat the TITAN different
    creature = titan ? ' ' : `<div class="unit-name">${creature}</div>`; 
    dead = dead && titan ? "" : dead;

    return `
    <div class="unit-inner player-color-${playerColor}">
        <div class="unit-damage ${showDamage}">${damage}</div>
        ${creature}
        <div class="unit-icon ${dead}">${svg}</div>
        <div class="unit-attr">${attr.join('')}</div>
        <div class="unit-player"></div>
  </div>
  `;
}
