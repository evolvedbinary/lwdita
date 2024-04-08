/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

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
 * 2 spaces per level according to the element's nesting level.
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
  indent: boolean;
  tabSize?: number;

  constructor(
    tagName: string,
    attributes: Record<string,
    BasicValue>,
    depth: number,
    isSelfClosing: boolean,
    isStartTag: boolean,
    indent: boolean,
    tabSize?: number
  ){
    this.tagName = tagName;
    this.attributes = attributes;
    this.depth = depth;
    this.isSelfClosing = isSelfClosing;
    this.isStartTag = isStartTag;
    this.indent = indent;
    this.tabSize = tabSize;
  }

  toString() {
    // prep the attributes string
    let attrsPrint = "";
    if (this.attributes) {
      const attr = this.attributes as Record<string, string>;
      attrsPrint = Object.keys(this.attributes).filter(key => attr[key]).map(key => `${key}="${attr[key]}"`).join(' ');
    }

    // Indentation: 4 single spaces per level
    const tab = this.tabSize ? ` `.repeat(this.tabSize) : '    ';
    const indentation = this.indent ? tab.repeat(this.depth) : '';
    const lineEnd = this.indent ? '\n' : '';

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
   }
}

/**
 * Visitor class for traversing the AST
 *
 * @privateRemarks
 * TODO change this an array or any kind of method for saving the output
 */
export class Visitor {
  outPutArray: Array<XMLTag>;

  // A tagsStack array for saving the tag names
  tagsStack: Array<string>;

  /**
   * Constructor
   *
   * @param outPutArray - The output array
   */
  constructor(outPutArray: Array<XMLTag>) {
    this.outPutArray = outPutArray;
    this.tagsStack = [];
  }

  /**
   * Visit a node
   *
   * @param text - The XML node
   */
  visit(text: XMLTag) {
    this.outPutArray.push(text);
  }

  /**
   * StartTag Event
   *
   * @param tagName - The tag name of the node
   * @param attrs - The attributes of the node
   * @param depth - The node's level within the document tree, needed for indentation
   * @param isSelfClosing - Boolean, if the element is selfclosing or not
   * @param isStartTag - Boolean, if the tag is a start tag or not
   * @param indent - Boolean, if the indentation of the output is set or not
   */
  startTag(
    tagName: string,
    attrs: Record<string, BasicValue>,
    depth: number,
    isSelfClosing = false,
    isStartTag = true,
    indent: boolean,
    tabSize?: number
  ) {
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, attrs, depth, isSelfClosing , isStartTag, indent, tabSize = 4);
    // push to the output array
    this.outPutArray.push(xmlTag);
    // save the tag in the stack to use it later
    this.tagsStack.push(tagName);
  }

  /**
   * EndTag Event
   *
   * @param depth - The node's level within the document tree, needed for indentation
   * @param isSelfClosing - Boolean, if the element is selfclosing or not, the default is "false"
   * @param isStartTag - Boolean, if the tag is a start tag or not, the default is "false"
   * @param indent - Boolean, if the indentation of the output is set or not
   */
  endTag(
    depth: number,
    isSelfClosing = false,
    isStartTag = false,
    indent: boolean,
    tabSize?: number
  ) {
    // get the tag out of the stack
    const tagName = this.tagsStack.pop() as string;
    // create a new XMLTag object
    const xmlTag = new XMLTag(tagName, {}, depth, isSelfClosing, isStartTag, indent, tabSize = 4);
    // add the closing tag to the output array
    this.outPutArray.push(xmlTag);
  }

  /**
   * selfClosingTag Event
   *
   * @param tagName - The tag name of the node
   * @param attrs - The attributes of the node
   * @param depth - The node's level within the document tree, needed for indentation
   * @param isSelfClosing - Boolean, if the element is selfclosing or not, the default is "true"
   * @param isStartTag - Boolean, if the tag is a start tag or not, the default is "true"
   * @param indent - Boolean, if the indentation of the output is set or not
   */
  selfClosingTag(
    tagName: string,
    attrs: Record<string, BasicValue>,
    depth: number,
    isSelfClosing = true,
    isStartTag = true,
    indent: boolean,
    tabSize?: number
  ) {
    // create new self closing tag
    const xmlTag = new XMLTag(tagName, attrs, depth, isSelfClosing, isStartTag, indent, tabSize = 4);
    // push to the output array
    this.outPutArray.push(xmlTag);
  }
}