import { GameState } from "../../global/game-state.js";
export class CamelSelectComponent {
    _selectFunc;
    constructor(_selectFunc) {
        this._selectFunc = _selectFunc;
    }
    load() {
        const camelSelectSection = document.getElementById('camel-select');
        if (!camelSelectSection) {
            throw new Error('No camel select element');
        }
        camelSelectSection.style.display = 'flex';
        this.createSelectList(camelSelectSection);
    }
    createSelectList(camelSelectSection) {
        const heading = document.createElement('h1');
        heading.appendChild(document.createTextNode('Choose camel'));
        camelSelectSection.appendChild(heading);
        const list = document.createElement('ul');
        camelSelectSection.appendChild(list);
        GameState.camels.forEach(camel => this.addCamelToList(list, camel));
    }
    addCamelToList(list, camel) {
        const listItem = document.createElement('li');
        listItem.onclick = () => this._selectFunc(camel);
        const camelPictureContainer = document.createElement('div');
        camelPictureContainer.classList.add('camel__picture-container');
        const camelPicture = document.createElement('div');
        camelPicture.classList.add('camel__picture');
        camelPicture.style.color = camel.colour;
        camelPicture.style.backgroundColor = camel.colour;
        camelPictureContainer.appendChild(camelPicture);
        const camelName = document.createElement('div');
        camelName.classList.add('camel__name');
        camelName.appendChild(document.createTextNode(camel.name));
        const camelStats = document.createElement('div');
        camelStats.classList.add('camel__stats');
        camelStats.appendChild(document.createTextNode(`Spd: ${camel.sprintSpeed.level} Sta: ${camel.stamina.level} Agl: ${camel.agility.level}`));
        const camelSelect = document.createElement('button');
        camelSelect.classList.add('camel__select');
        camelSelect.classList.add('chevron');
        listItem.appendChild(camelPictureContainer);
        listItem.appendChild(camelName);
        listItem.appendChild(camelStats);
        listItem.appendChild(camelSelect);
        list.appendChild(listItem);
    }
}
