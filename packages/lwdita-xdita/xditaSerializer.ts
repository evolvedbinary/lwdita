import { BaseNode, DocumentNode, TextNode } from "@evolvedbinary/lwdita-ast";

/**
 * Stream interface
 */
interface SimpleStream<T> {
  emit(event: T): void;
  close(): void;
}

/**
 * Output stream for text
 */
export interface TextOutputStream extends SimpleStream<string> {}

/**
 * In-memory text output stream implementation
 */
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

/**
 * Serializer for XDITA
 * Takes an AST and serializes it to XDITA
 */
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
   * @param indent - enable indentation
   * @param tabSize - size of the tab
   */
  constructor(outStream: TextOutputStream, indent = false, tabSize = 4) {
    this.outStream = outStream;
    this.indent = indent;
    this.tabSize = tabSize;
    this.indentation = " ";
    this.EOL = '\n';
  }

  /**
   * Emit the indentation to the output stream
   */
  printIndentation(): void {
    if (this.indent) {
      this.outStream.emit(this.indentation.repeat(this.depth * this.tabSize));
    }
  }

  /**
   * Emit the End of Line character to the output stream
   */
  printEOL(): void {
    if (this.indent) {
      this.outStream.emit(this.EOL);
    }
  }

  
  /**
   * Emit the attributes to the output stream
   */
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

  
  /**
   * Emit the text content of text nodes to the output stream
   */
  printText(node: TextNode): void {
    const props = node.getProps();
    if (props['content']) {
      this.outStream.emit(String(props['content']));
    }
  }

  /**
   * Visit a node and emit it's printable tab to the output stream
   */
  visit(node: BaseNode): void {
    // do no emit anything if the node is a document node
    if (node instanceof DocumentNode) {
      node.children.forEach(child => this.visit(child));
      // close the output stream after visiting all of the children
      this.outStream.close();
    } else {
      // print the indentation
      this.printIndentation();

      // if the node is a text node, print the text content
      if (node instanceof TextNode) {
        this.printText(node);
      } else {
        // print the node tag
        this.outStream.emit(`<${node.static.nodeName}`);
        // print the attributes
        this.printAttributes(node);
        // increment the depth after printing the tag
        this.depth++;
        if (node.children?.length) {
          // print the closing tag and visit the children
          this.outStream.emit(`>`);
          this.printEOL();
          node.children.forEach(child => this.visit(child));
          this.depth--;
          this.printIndentation();
          this.outStream.emit(`</${node.static.nodeName}>`);
        } else {
          // print the self closing tag
          this.outStream.emit(`/>`);
          this.depth--;
        }
      }
      this.printEOL();
    }
  }
}