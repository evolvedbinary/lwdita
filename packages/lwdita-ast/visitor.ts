/**
 * Visitor class for traversing the AST
 */
export class Visitor {
  //TODO change this an array or any kind of method for saving the output
  outStream: Console;

  //tageNames array for saving the tag names
  tagNames: Array<string>;

  /**
   * Constructor
   * @param outStream the output stream
   */
  constructor(outStream: Console) {
    this.outStream = outStream;
    this.tagNames = [];
  }

  /**
   * Visit a node
   * @param text 
   */
  visit(text: string) {
    this.outStream.log(text);
  }

  /**
   * StartTag event
   * 
   * @param tagName the tag name
   * @param attrs the attributes 
   */
  startTag(tagName: string, attrs: any) {
    const attrsPrint = Object.keys(attrs).filter(key => attrs[key]).map(key => `${key}="${attrs[key]}"`).join(' ');
    this.outStream.log(attrsPrint ? `<${tagName} ${attrsPrint}>` : `<${tagName}>`);
    this.tagNames.push(tagName);
  }

  /**
   * EndTag event
   */
  endTag() {
    const tagName = this.tagNames.pop();
    this.outStream.log(`</${tagName}>`);
  }

}