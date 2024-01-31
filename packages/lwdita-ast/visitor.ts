import { BasicValue, JDita } from "@evolvedbinary/lwdita-xdita/classes";

/**
 *
 */
export class XMLTag {
  tagName: string;
  attributes?: Record<string, BasicValue>;
  children?: JDita[];
  isSelfClosing: boolean;

  constructor(tagName: string,attributes: Record<string, BasicValue>) {
    this.tagName = tagName;
    this.attributes = attributes;
  }

  toString(): string { return "test" }
}

/**
 * Visitor class for traversing the AST
 */
export class Visitor {
  //TODO change this an array or any kind of method for saving the output
  outStream: Array<XMLTag>;

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
    // <topic> // save the open tag or start to the array
    // <title> // save the open
    //valid title // save the text
    //</title> // save the close tag
    // <body>
    // </body>
    // </topic>


    // you have an issue of how to add closing tags

    //TODO convert this code to a XMLTag object
    const xmlTag = new XMLTag(tagName, attrs);

    // new code
    this.outStream.push(xmlTag);
    this.tagNames.push(tagName);

    // old code
    this.outStream.push(`<${tagName}>`);
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