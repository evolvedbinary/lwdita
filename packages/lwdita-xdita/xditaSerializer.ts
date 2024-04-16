import { BaseNode, DocumentNode, TextNode } from "@evolvedbinary/lwdita-ast";

interface SimpleStream<T> {
  emit(event: T): void;
  close(): void;
}


export interface TextOutputStream extends SimpleStream<string> {}

export class InMemoryTextOutputStream implements TextOutputStream {
  private text = '';

  emit(event: string): void {
    this.text += event;
  }

  close(): void {
    // Do nothing
  }

  getText(): string {
    return this.text;
  }
}

export class XditaSerializer {
  outStream: TextOutputStream;
  indent: boolean;
  tabSize: number;
  indentation: string;
  EOL: string;
  depth = 0;

  /**
   * Constructor
   *
   * @param outPutArray - The output array
   */
  constructor(outStream: TextOutputStream, indent = false, tabSize = 4) {
    this.outStream = outStream;
    this.indent = indent;
    this.tabSize = tabSize;
    this.indentation = " ";
    this.EOL = '\n';
  }

  printIndentation(): void {
    if (this.indent) {
      this.outStream.emit(this.indentation.repeat(this.depth * this.tabSize));
    }
  }

  printEOL(): void {
    if (this.indent) {
      this.outStream.emit(this.EOL);
    }
  }

  printAttributes(node: BaseNode): void {
    let attrsPrint = '';
    const props = node.getProps();
    if (props) {
      const attr = props as Record<string, string>;
      attrsPrint = Object.keys(props).filter(key => attr[key]).map(key => `${key}="${attr[key]}"`).join(' ');
    }
    if (attrsPrint.length) attrsPrint = ` ${attrsPrint}`;
    this.outStream.emit(attrsPrint);
  }

  printText(node: TextNode): void {
    const props = node.getProps();
    if (props['content']) {
      this.outStream.emit(String(props['content']));
    }
  }

  /**
   * Visit a node
   */
  visit(node: BaseNode): void {
    if (node instanceof DocumentNode) {
      node.children.forEach(child => this.visit(child));
      this.outStream.close();
    } else {
      this.printIndentation();

      if (node instanceof TextNode) {
        this.printText(node);
      } else {
        this.outStream.emit(`<${node.static.nodeName}`);
        this.printAttributes(node);

        this.depth++;
        if (node.children?.length) {
          this.outStream.emit(`>`);
          this.printEOL();
          node.children.forEach(child => this.visit(child));
          this.depth--;
          this.printIndentation();
          this.outStream.emit(`</${node.static.nodeName}>`);
        } else {
          this.outStream.emit(`/>`);
          this.depth--;
        }
      }
      this.printEOL();
    }
  }
}