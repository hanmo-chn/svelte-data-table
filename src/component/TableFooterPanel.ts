
import TableOptions from "../lib/TableOptions";
import TableColumns from "./TableColumns";
import * as utils from "../lib/Utils";
import {ScrollHandler} from "../lib/EventHandler";

export default class TableFooterPanel {

    /**
     * 定义的列
     */
    #tabCols: TableColumns;
    #options: TableOptions;
    #footerElement: HTMLElement;
    #scrollHandler: ScrollHandler;


    constructor(columns: TableColumns, options: TableOptions) {
        this.#tabCols = columns;
        this.#options = options;
    }

    /**
     *
     * @param scrollHandler
     */
    setScrollHandler(scrollHandler: ScrollHandler): void {
        this.#scrollHandler = scrollHandler;
    }


    /**
     *
     */
    buildFooterPanel(): HTMLElement {
        let footerBarPanel : HTMLElement = utils.createDivElement("tsui-adv-table-footer-bar");
        let panel: HTMLElement = utils.createDivElement("tsui-adv-table-footer-panel");
        footerBarPanel.append(panel);
        this.#footerElement = utils.createDivElement("tsui-adv-table-footer-row");
        panel.append(this.#footerElement);
        this.#footerElement.style.width = `${this.#tabCols.width}px`;
        if (this.#options.footerColumns) {

        } else {
            this.#footerElement.style.height = '1px';
        }
        panel.addEventListener("scroll", e=>{
            if (this.#scrollHandler) {
                this.#scrollHandler(panel.scrollLeft);
            }
        });
        return footerBarPanel;
    }

    /**
     *
     * @param width
     */
    setWidth(width: number) {
        this.#footerElement.style.width = `${width}px`;
    }
}