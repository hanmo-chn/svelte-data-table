import * as utils from "../lib/Utils";

export default class PopupPanel {

    #panel: HTMLElement;
    #parent: HTMLElement;
    #board: HTMLElement;

    constructor() {
        this.#panel = utils.createDivElement("popup-panel");
        this.#panel.addEventListener("mousedown", e=>{
            e.stopPropagation();
        })
    }

    get element():HTMLElement {
        return this.#panel;
    }

    appendTo(parent: HTMLElement):void {
        if (this.#parent == null) {
            document.addEventListener('click', this.checkForFocusLoss);
        }
        parent.append(this.#panel);
        this.#parent = parent;
    }

    close(): void {
        this.#panel.parentNode.removeChild(this.#panel);
        this.#parent = null;
        document.removeEventListener('click', this.checkForFocusLoss);
    }

    /**
     * 检查当前鼠标单击是否中当前的panel内
     * @param evt
     * @private
     */
    private checkForFocusLoss = (evt: MouseEvent):void => {
        if (!this.#parent) return;
        let el: Node = evt.target as Node;
        do {
            if (el == this.#panel) return;
            el = el.parentNode;
        } while (el != null);
        this.close();
    }

    setBoardPanel(panel: HTMLElement) {
        this.#board = panel;
    }

    adjustLocation(rect: DOMRect) {
        //let popRect = this.#panel.getBoundingClientRect();
        let boardRect = this.#board.getBoundingClientRect();
        console.debug(rect, boardRect);
        if (rect.bottom > boardRect.bottom - 15) {
            this.#panel.style.top = "unset";
            this.#panel.style.bottom = "4px"
        } else {
            this.#panel.style.top = "4px";
            this.#panel.style.bottom = "unset"
        }
    }
}