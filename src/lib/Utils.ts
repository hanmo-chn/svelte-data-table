/**
 * 生成一个基于时间的id
 */
export function generateTableId ():string {
    let t:number = (new Date()).getTime();
    return "tab-".concat(t.toString(36));
}

/**
 *
 * @param elementType
 * @param className
 */
export function createElement(elementType: string, className?: string | Array<string> | null): HTMLElement {
    let element:HTMLElement = document.createElement(elementType);
    if (className != null) {
        if (Array.isArray(className)) {
            className.forEach(cn => {
                element.classList.add(cn);
            })
        } else {
            element.classList.add(className);
        }
    }
    return element;
}

/**
 * 创建一个div的html节点
 * @param className
 */
export function createDivElement(className?: string | Array<string>): HTMLElement {
    return createElement('div', className);
}

/**
 * 创建一个input的html节点
 * @param type
 */
export function createInputElement(type: string): HTMLInputElement {
    let element:HTMLInputElement = document.createElement('input');
    element.type = type;
    return element;
}

/**
 * 创建一个span的html的节点
 * @param text
 * @param className
 */
export function createSpanElement(text:string, className?: string | Array<string> ): HTMLElement {
    let element:HTMLElement = document.createElement('span');
    element.innerText = text;
    if (className != null) {
        if (Array.isArray(className)) {
            className.forEach(cn => {
                element.classList.add(cn);
            })
        } else {
            element.classList.add(className);
        }
    }
    return element;
}

export function objectEquals(o1: any, o2: any): boolean {
    return o1 == o2;
}