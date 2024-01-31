import { BasicValue } from "@jdita/lwdita-xml/classes";

/**
 * 
 */
export class XMLTag {
  tagName: string;
  attributes?: Record<string, BasicValue>;
  isSelfClosing: boolean;
  isStartTag: boolean;

  constructor(tagName: string,attributes: Record<string, BasicValue>, isSelfClosing: boolean, isStartTag: boolean) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.isSelfClosing = isSelfClosing;
    this.isStartTag = isStartTag;
  }

  toString(): string {
    const attrsPrint = Object.keys(this.attributes).filter(key => this.attributes[key]).map(key => `${key}="${this.attributes[key]}"`).join(' ');
    if (this.isSelfClosing) {
      return attrsPrint ? `<${this.tagName} ${attrsPrint}/>` : `<${this.tagName}/>`;
    }

    if (this.isStartTag) {
      return attrsPrint ? `<${this.tagName} ${attrsPrint}>` : `<${this.tagName}>`;
    }

    if(!this.isStartTag) {
      return `</${this.tagName}>`;
    }
   }
}

/**
 * Visitor class for traversing the AST
 */
export class Visitor {
  //TODO change this an array or any kind of method for saving the output
  outStream: Array<XMLTag>;

  //tageNames array for saving the tag names
  tagsStack: Array<string>;

  /**
   * Constructor
   * @param outStream the output stream
   */
  constructor(outStream: Array<XMLTag>) {
    this.outStream = outStream;
    this.tagsStack = [];
  }

  /**
   * Visit a node
   * @param text
   */
  visit(text: XMLTag) {
    this.outStream.push(text);
  }

  /**
   * StartTag event
   *
   * @param tagName the tag name
   * @param attrs the attributes
   */
  startTag(tagName: string, attrs: any, isSelfClosing = false, isStartTag = true) {
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, attrs, isSelfClosing , isStartTag);
    // push to the output stream
    this.outStream.push(xmlTag);
    // save the tag in the stack to use it later
    this.tagsStack.push(tagName);
  }

  /**
   * EndTag event
   */
  endTag(isSelfClosing = false, isStartTag = false) {
    // get the tag out of the stack
    const tagName = this.tagsStack.pop();
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, {}, isSelfClosing, isStartTag);
    // add the closing tag to the output stream
    this.outStream.push(xmlTag);
  }

  selfClosingTag(tagName: string, attrs: any, isSelfClosing = true, isStartTag = true) {
    // create new self closing tag
    const xmlTag = new XMLTag(tagName, attrs, isSelfClosing, isStartTag);
    // push to the output stream
    this.outStream.push(xmlTag);
  }
}