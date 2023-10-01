class ScrollsComponent {
    constructor(private readonly _navigator: NavigatorService) { }

    public load(): void {
        const scrollsSection = document.getElementById('scrolls');

        if (!scrollsSection) {
            throw new Error('No scrolls element');
        }

        scrollsSection.style.display = 'flex';

        this.createScrollsList(scrollsSection);
        this.createBackButton(scrollsSection);
    }

    private createBackButton(scrollsSection: HTMLElement): void {
        const button = document.createElement('button');
        button.classList.add('scrolls__back');
        button.innerText = 'Back';
        button.onclick = () => this._navigator.requestPageNavigation(Page.mapOverview);

        scrollsSection.appendChild(button);
    }

    private createScrollsList(scrollsSection: HTMLElement): void {
        const heading = document.createElement('h1');
        heading.appendChild(document.createTextNode('Scrolls'));
        scrollsSection.appendChild(heading);

        const list = document.createElement('ul');
        scrollsSection.appendChild(list);

        const sortedScrolls = GameState.scrolls.sort((a, b) => Number(a.read) - Number(b.read));
        sortedScrolls.forEach(scroll => this.addScrollToList(list, scroll));
    }

    private addScrollToList(list: HTMLElement, scroll: Scroll): void {
        const listItem = document.createElement('li');
        listItem.classList.add('scroll');

        if(scroll.read) {
            listItem.classList.add('scroll--read');
        }

        const scrollOverview = document.createElement('div');
        scrollOverview.classList.add('scroll__overview');

        const scrollPictureContainer = document.createElement('div');
        scrollPictureContainer.classList.add('scroll__picture-container');

        const scrollPicture = document.createElement('div');
        scrollPicture.classList.add('scroll__picture');
        scrollPictureContainer.appendChild(scrollPicture);

        const scrollSubject = document.createElement('div');
        scrollSubject.classList.add('scroll__subject');
        scrollSubject.appendChild(document.createTextNode(scroll.subject));

        const scrollSender = document.createElement('div');
        scrollSender.classList.add('scroll__sender');
        scrollSender.appendChild(document.createTextNode(scroll.sender));

        const scrollBody = document.createElement('div');
        scrollBody.classList.add('scroll__body');
        scrollBody.appendChild(document.createTextNode(scroll.body));

        scrollOverview.onclick = () => {
            listItem.classList.toggle('scroll__expanded');

            if(!scroll.read) {
                scroll.read = true;
                listItem.classList.add('scroll--read');
            }
        };

        listItem.appendChild(scrollOverview);
        scrollOverview.appendChild(scrollPictureContainer);
        scrollOverview.appendChild(scrollSubject);
        scrollOverview.appendChild(scrollSender);
        listItem.appendChild(scrollBody);

        list.appendChild(listItem);
    }
}