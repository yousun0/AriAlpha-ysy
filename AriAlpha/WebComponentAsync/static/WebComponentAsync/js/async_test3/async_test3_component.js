export class async_test3 extends HTMLElement {
    constructor() {
        super();
        this.gridData = [];
        this.scrollPositions = [0, 0];
        this.html = "";
        this.attachShadow({mode: 'open'});
        this.status = false;
    }

    setHTML(html) {
        this.html = html;
    }

    setGridData(gridIndex, data, verticalScrollPosition, horizontalScrollPosition) {
        this.gridData[gridIndex] = data;
        this.scrollPositions[gridIndex] = [verticalScrollPosition, horizontalScrollPosition];
        if (data != "") {
            this.status = true;
        }
    }
}