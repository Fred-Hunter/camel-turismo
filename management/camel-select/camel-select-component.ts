class CamelSelectComponent {
    constructor(private readonly _selectFunc: (camel: Camel) => void) {
    }

    public load(): void {
        const camelSelectSection = document.getElementById('camel-select');

        if (!camelSelectSection) {
            throw new Error('No camel select element');
        }

        camelSelectSection.style.display = 'flex';

        this.createSelectList(camelSelectSection);
    }

    private createSelectList(camelSelectSection: HTMLElement): void {
        const heading = document.createElement('h1');
        heading.appendChild(document.createTextNode('Choose camel'));
        camelSelectSection.appendChild(heading);

        const list = document.createElement('ul');
        camelSelectSection.appendChild(list);

        const camelForList = camel;

        this.addCamelToList(list, camelForList);
    }

    private addCamelToList(list: HTMLElement, camel: Camel): void {
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