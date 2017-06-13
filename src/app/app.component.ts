import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

const CATEGORY = 1;
const GROUP = 2;
const PRODUCT = 3;

interface Node {
  id: string,
  label: string,
  mic: string,
  code: string,
  symbol: string,
  nesting: number,
  expanded: boolean,
  type: number,
  partial: boolean,
  checked: boolean,
  disabled: boolean,
}

const getData = (cursor: string[]): any[] => {
  const retData = [];
  if (cursor.length === 0) {
    for (let i = 0; i < 100; i ++) {
      retData.push({
        id: `${i}`,
        label: `EXCH #${i}`,
        mic: `mic${i}`,
        code: `code${i}`,
        symbol: '\u00A0',
        nesting: 0,
        expanded: false,
        type: CATEGORY,
        partial: false,
        checked: false,
        disabled: false,
      });
    }
  }
  if (cursor.length === 1) {
    retData.push(
      {
        id: 'Strategy',
        label: 'Strategy',
        mic: `\u0A00`,
        code: `\u0A00`,
        symbol: '\u00A0',
        nesting: 1,
        type: CATEGORY,
      },
      {
        id: 'Options',
        label: 'Options',
        mic: `\u0A00`,
        code: `\u0A00`,
        symbol: '\u00A0',
        nesting: 1,
        type: CATEGORY,
      },
      {
        id: 'Outrights',
        label: 'Outrights',
        mic: `\u0A00`,
        code: `\u0A00`,
        symbol: '\u00A0',
        nesting: 1,
        type: CATEGORY,
      },
      );
  }
  if (cursor.length === 2) {
    for (let i = 0; i < 100; i ++) {
      retData.push({
        id: `Group${i}`,
        label: `Group #${i}`,
        mic: `g${i}`,
        code: `gc${i}`,
        symbol: `s${i}`,
        nesting: 2,
        expanded: false,
        type: GROUP,
        partial: false,
        checked: false,
        disabled: false,
      });
    }
  }
  if (cursor.length === 3) {
    for (let i = 0; i < 100; i ++) {
      retData.push({
        id: `Product${i}`,
        label: `Product #${i}`,
        mic: `p${i}`,
        code: `pc${i}`,
        symbol: `ps${i}`,
        nesting: 3,
        expanded: false,
        type: PRODUCT,
        partial: false,
        checked: false,
        disabled: false,
      });
    }
  }
  return retData;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private data: Node[];

  constructor() {
    this.data = getData([]);
  }

  ngAfterViewInit(): void {
  }

  isCategory(node): boolean {
    return node.type === CATEGORY;
  }

  isGroup(node): boolean {
    return node.type === GROUP;
  }

  isProduct(node): boolean {
    return node.type === PRODUCT;
  }

  nodeExpanded(node, index): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      switch (node.nesting) {
        case 0: {
          const insert = getData([node.id]);
          this.data.splice.apply(this.data, [index + 1, 0, ...insert])
          break;
        }
        case 1: {
          const insert = getData(['exch', node.id]);
          this.data.splice.apply(this.data, [index + 1, 0, ...insert])
          break;
        }
        default: {
          const insert = getData(['exch', 'ins', node.id]);
          this.data.splice.apply(this.data, [index + 1, 0, ...insert])
          break;
        }
      }
    }
  }

  groupToggled(state, node): void {
    console.log(state, node);
  }

  productToggled(state, node): void {
    console.log(state, node);
  }

}