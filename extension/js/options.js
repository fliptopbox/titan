import creature, { collection } from './creatures.js';
import getUnit from './getUnit.js';

const list = document.getElementById('list');
collection.sort().forEach(print);

function print(row) {
    const el = document.createElement('div');
    const item = creature(row.id);
    const unit = getUnit(item.id, 0, '#ff0000');
    const info = `
        <div class="options-info-row">
            ${item.requires
                .map(obj => {
                    if (!obj) return '';
                    console.log(Object.entries(obj));
                    const [name, count] = Object.entries(obj)[0];
                    return `${count} x ${name}`;
                })
                .join(' <br/>')}
        </div>
    `;
    const native = !item.native.length
        ? ''
        : `
        <div class="options-info-row">
        <strong>Native:</strong><br/>
        ${item.native
            .map(array => {
                if (!array.length) return '';
                return `${array}`;
            })
            .join(', ')}
        </div>
    `;

    el.innerHTML = `${unit}<div class="options-info">${info}${native}</div>`;
    el.classList.add('options-unit');

    list.append(el);
}
