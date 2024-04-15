import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";

/**
 * Create XML tags
 *
 * @remarks
 * Return start tag, the element name
 * available attributes, an end tag.
 * In case of selfclosing elements, return
 * a selfclosing tag.
 * Indent the tags by inserting
 * 4 spaces per level according to the element's nesting level.
 *
 * @example
 * Selfclosing tag: `<ph keyref="product-name"/>`
 *
 * @example
 * Start tag with attribute: `<p id="warning">`
 *
 * @example
 * End tag: `</topic>`
 */
export class XMLTag {
  tagName: string;
  attributes: Record<string, BasicValue>;
  isSelfClosing: boolean;
  isStartTag: boolean;
  depth: number;

  constructor(
    tagName: string,
    attributes: Record<string,
    BasicValue>,
    depth: number,
    isSelfClosing: boolean,
    isStartTag: boolean,
  ){
    this.tagName = tagName;
    this.attributes = attributes;
    this.depth = depth;
    this.isSelfClosing = isSelfClosing;
    this.isStartTag = isStartTag;
  }

  serialize(indent = false, tabSize = 4): string {
    // prep the attributes string
    let attrsPrint = "";
    if (this.attributes) {
      const attr = this.attributes as Record<string, string>;
      attrsPrint = Object.keys(this.attributes).filter(key => attr[key]).map(key => `${key}="${attr[key]}"`).join(' ');
    }

    // Indentation: 4 single spaces per level
    const tab = ` `.repeat(tabSize);
    const indentation = indent ? tab.repeat(this.depth) : '';
    const lineEnd = indent ? '\n' : '';

    // Handle selfclosing elements
    if (this.isSelfClosing) {
      return indentation + (attrsPrint ? `<${this.tagName} ${attrsPrint}/>` : `<${this.tagName}/>`) + lineEnd;
    }

    // Handle start tags
    if (this.isStartTag) {
      return indentation + (attrsPrint ? `<${this.tagName} ${attrsPrint}>` : `<${this.tagName}>`) + lineEnd;
    }

    // Handle end tags
    if(!this.isStartTag) {
      return indentation +  `</${this.tagName}>` + lineEnd;
    }

    throw new Error('Invalid tag type');
   }
}

export class TextContent {
  content: string;

  constructor(content: string, depth: number) {
    this.content = content;
  }

  serialize(indent = false, tabSize = 4): string {
    return this.content;
  }
}

/**
 * Visitor class for traversing the AST
 */
export class Visitor {
  outStream: Array<XMLTag | TextContent>;
  indent: boolean;
  tabSize: number;

  // A tagsStack array for saving the tag names
  tagsStack: Array<string>;

  /**
   * Constructor
   *
   * @param outPutArray - The output array
   */
  constructor(outStream: Array<XMLTag>, indent = false, tabSize = 4) {
    this.outStream = outStream;
    this.tagsStack = [];
    this.indent = indent;
    this.tabSize = tabSize;
  }

  /**
   * Visit a node
   *
   * @param text - The XML node
   */
  visit(text: string, depth: number): void {
    const output = new TextContent(text, depth);
    this.outStream.push(output);
  }

  /**
   * StartTag Event
   *
   * @param tagName - The tag name of the node
   * @param attrs - The attributes of the node
   * @param depth - The node's level within the document tree, needed for indentation
   * @param isSelfClosing - Boolean, if the element is selfclosing or not
   * @param isStartTag - Boolean, if the tag is a start tag or not
   */
  startTag(
    tagName: string,
    attrs: Record<string, BasicValue>,
    depth: number,
    isSelfClosing = false,
    isStartTag = true,
  ) {
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, attrs, depth, isSelfClosing , isStartTag);
    // push to the output stream
    this.outStream.push(xmlTag);
    // save the tag in the stack to use it later
    this.tagsStack.push(tagName);
  }

  /**
   * EndTag Event
   *
   * @param depth - The node's level within the document tree, needed for indentation
   * @param isSelfClosing - Boolean, if the element is selfclosing or not, the default is "false"
   * @param isStartTag - Boolean, if the tag is a start tag or not, the default is "false"
   */
  endTag(
    depth: number,
    isSelfClosing = false,
    isStartTag = false,
  ) {
    // get the tag out of the stack
    const tagName = this.tagsStack.pop() as string;
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, {}, depth, isSelfClosing, isStartTag);
    // add the closing tag to the output stream
    this.outStream.push(xmlTag);
  }

  /**
   * selfClosingTag Event
   *
   * @param tagName - The tag name of the node
   * @param attrs - The attributes of the node
   * @param depth - The node's level within the document tree, needed for indentation
   * @param isSelfClosing - Boolean, if the element is selfclosing or not, the default is "true"
   * @param isStartTag - Boolean, if the tag is a start tag or not, the default is "true"
   */
  selfClosingTag(
    tagName: string,
    attrs: Record<string, BasicValue>,
    depth: number,
    isSelfClosing = true,
    isStartTag = true,
  ) {
    // create new self closing tag
    const xmlTag = new XMLTag(tagName, attrs, depth, isSelfClosing, isStartTag);
    // push to the output stream
    this.outStream.push(xmlTag);
  }

  /**
   * Serialize the output stream
   *
   * @returns The serialized output stream
   */
  serialize() {
    return this.outStream.map(tag => tag.serialize(this.indent, this.tabSize)).join('');
  }
}