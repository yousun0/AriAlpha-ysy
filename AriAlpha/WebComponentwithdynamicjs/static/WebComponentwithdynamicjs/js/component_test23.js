// component_test1.js
export class test23 extends HTMLElement {
    constructor() {
        super();
        this.gridData = [];
        this.scrollPositions = [0, 0];
        this.html = "";
        this.attachShadow({mode: 'open'});
    }

    setHTML(html) {
        this.html = html;
    }

    setGridData(gridIndex, data, verticalScrollPosition, horizontalScrollPosition) {
        this.gridData[gridIndex] = data;
        this.scrollPositions[gridIndex] = [verticalScrollPosition, horizontalScrollPosition];
    }
}
