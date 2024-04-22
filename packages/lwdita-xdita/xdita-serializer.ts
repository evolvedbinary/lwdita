import { BaseNode, DocumentNode, TextNode } from "@evolvedbinary/lwdita-ast";
import { SimpleTextStream } from "./stream";

/**
 * Serializer for XDITA.
 * Takes an AST and serializes it to XDITA.
 */
export class XditaSerializer {
  outputStream: SimpleTextStream;
  indent: boolean;
  tabSize: number;
  indentation: string;
  EOL: string;
  depth = 0;

  /**
   * Constructor
   *
   * @param outputStream - The output stream.
   * @param indent - enable indentation
   * @param indentation - the character (or string) to use as the indent
   * @param tabSize - size of the tab, only used when the `indentation` is not a '\t character.
   */
  constructor(outputStream: SimpleTextStream, indent = false, indentation = " ", tabSize = 4) {
    this.outputStream = outputStream;
    this.indent = indent;
    this.tabSize = tabSize;
    this.indentation = indentation;
    if(indentation === '\t') {
      this.tabSize = 1;
    }
    this.EOL = '\n';
  }

  /**
   * Print the indentation to the output stream
   */
  printIndentation(): void {
    if (this.indent) {
      this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
    }
  }

  /**
   * Print the End of Line character to the output stream
   */
  printEOL(): void {
    if (this.indent) {
      this.outputStream.emit(this.EOL);
    }
  }

  /**
   * Print the attributes to the output stream
   *
   * @param node the node to serialize the attributes of
   */
  printAttributes(node: BaseNode): void {
    let attrsPrint = '';
    const props = node.getProps();
    if (props) {
      const attr = props as Record<string, string>;
      attrsPrint = Object.keys(props).filter(key => attr[key]).map(key => `${key}="${attr[key]}"`).join(' ');
    }
    if (attrsPrint.length) attrsPrint = ` ${attrsPrint}`;
    this.outputStream.emit(attrsPrint);
  }

  /**
   * Print the text content of the text node to the output stream
   *
   * @param node the text node to serialize the content of
   */
  printText(node: TextNode): void {
    const props = node.getProps();
    if (props['content']) {
      this.outputStream.emit(String(props['content']));
    }
  }

  /**
   * Visit a node and emit its printable tab to the output stream
   *
   * @param node the node to serialize
   */
  visit(node: BaseNode): void {
    if (node instanceof DocumentNode) {
      // do not serialize anything if the node is a document node, move on to its children
      node.children.forEach(child => this.visit(child));
      // close the output stream as we have now serialized the document
      this.outputStream.close();
    } else {
      // print the indentation
      this.printIndentation();

      if (node instanceof TextNode) {
        // if the node is a text node, print the text content
        this.printText(node);
      } else {
        // print the start of the element start tag
        this.outputStream.emit(`<${node.static.nodeName}`);
        // print the attributes
        this.printAttributes(node);
        // increment the depth after starting an element
        this.depth++;
        if (node.children?.length) {
          // as the element has children or attributes, print the remainder of the element start tag
          this.outputStream.emit(`>`);
          this.printEOL();
          // visit the element's children
          node.children.forEach(child => this.visit(child));
          // decrement the depth after printing the elements children
          this.depth--;
          this.printIndentation();
          this.outputStream.emit(`</${node.static.nodeName}>`);
        } else {
          // element has no attributes or children, so the remainder of the element start tag as a self-closing element
          this.outputStream.emit(`/>`);
          // decrement the depth after printing the element
          this.depth--;
        }
      }
      this.printEOL();
    }
  }
}