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
   * Emit the indentation to the output stream
   */
  printIndentation(): void {
    if (this.indent) {
      this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
    }
  }

  /**
   * Emit the End of Line character to the output stream
   */
  printEOL(): void {
    if (this.indent) {
      this.outputStream.emit(this.EOL);
    }
  }

  /**
   * Emit the attributes to the output stream
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
   * Emit the text content of the text node to the output stream
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
    // do not emit anything if the node is a document node
    if (node instanceof DocumentNode) {
      node.children.forEach(child => this.visit(child));
      // close the output stream after visiting all of the children
      this.outputStream.close();
    } else {
      // print the indentation
      this.printIndentation();

      // if the node is a text node, print the text content
      if (node instanceof TextNode) {
        this.printText(node);
      } else {
        // print the node tag
        this.outputStream.emit(`<${node.static.nodeName}`);
        // print the attributes
        this.printAttributes(node);
        // increment the depth after printing the tag
        this.depth++;
        if (node.children?.length) {
          // print the closing tag and visit the children
          this.outputStream.emit(`>`);
          this.printEOL();
          node.children.forEach(child => this.visit(child));
          this.depth--;
          this.printIndentation();
          this.outputStream.emit(`</${node.static.nodeName}>`);
        } else {
          // print the self closing tag
          this.outputStream.emit(`/>`);
          this.depth--;
        }
      }
      this.printEOL();
    }
  }
}