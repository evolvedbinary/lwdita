import { BasicValue, JDita } from "@jdita/lwdita-xml/classes";

/**
 *
 */
export class XMLTag {
  tagName: string;
  attributes?: Record<string, BasicValue>;
  children?: JDita[];
  isSelfClosing: boolean;

  toString(): string { return "test" }
}

/**
 * Visitor class for traversing the AST
 */
export class Visitor {
  //TODO change this an array or any kind of method for saving the output
  outStream: Array<XMLTag>;
  // string
  // 2 array of strings
  // 3 array of objects that represent xml tags

  //tageNames array for saving the tag names
  tagNames: Array<string>;

  /**
   * Constructor
   * @param outStream the output stream
   */
  constructor(outStream: Array<XMLTag>) {
    this.outStream = outStream;
    this.tagNames = [];
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
  startTag(tagName: string, attrs: any) {
    const attrsPrint = Object.keys(attrs).filter(key => attrs[key]).map(key => `${key}="${attrs[key]}"`).join(' ');
    this.outStream.push(attrsPrint ? `<${tagName} ${attrsPrint}>` : `<${tagName}>`);
    this.tagNames.push(tagName);
  }

  /**
   * EndTag event
   */
  endTag() {
    const tagName = this.tagNames.pop();
    this.outStream.push(`</${tagName}>`);
  }

  selfClosingTag(tagName: string, attrs: any) {
    const attrsPrint = Object.keys(attrs).filter(key => attrs[key]).map(key => `${key}="${attrs[key]}"`).join(' ');
    this.outStream.push(attrsPrint ? `<${tagName} ${attrsPrint}/>` : `<${tagName}/>`);
  }
}