/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { AbstractBaseNode, CDataNode, DocumentNode, phGroup, TextNode } from "@evolvedbinary/lwdita-ast";
import { TextSimpleOutputStream } from "./stream";
import { escapeXMLAttributeCharacters, escapeXMLCharacters } from "./utils";

/**
 * Serializer for XDITA.
 * Takes an AST and serializes it to XDITA.
 */
export class XditaSerializer {
  outputStream: TextSimpleOutputStream;
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
   * @param tabSize - size of the tab, only used when the `indentation` is not a `\t` character.
   */
  constructor(outputStream: TextSimpleOutputStream, indent = false, indentation = " ", tabSize = 4) {
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
   * 
   * @param node - the node to check if indentation can be added
   */
  private serializeIndentation(node?: AbstractBaseNode): void {
    if (!this.indent || !node) return;
    if (node.allowsMixedContent()) return;
    this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
  }

  /**
   * Emit the End of Line (EOL) character to the output stream
   * 
   * @param node - the node to check if EOL can be added
   */
  private serializeEOL(node?: AbstractBaseNode): void {
    if (!this.indent || !node) return;
    if (node.allowsMixedContent()) return;
    this.outputStream.emit(this.EOL);
  }

  /**
   * Serialize a document node to the output stream.
   *
   * @param node - the document node to serialize
   */  
  private serializeDocument(node: DocumentNode): void {
    // emit the XML declaration and doctype declaration
    this.outputStream.emit(this.xmlDeclString(node));
    this.outputStream.emit(this.EOL);
    this.outputStream.emit(this.docTypeDeclString(node));
    this.outputStream.emit(this.EOL);
    // a document node has no string representation, so move on to its children
    node.children.forEach(child => this.serialize(child, node));
  }

  /**
   * Construct the doctype declaration string
   * @param node - the document node to serialize
   * @returns doctype declaration string
   */
  private docTypeDeclString(node: DocumentNode): string {
    if (!node.docTypeDecl) {
      return "<!DOCTYPE topic PUBLIC \"-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN\" \"lw-topic.dtd\">";
    }

    let docTypeDeclaration = `<!DOCTYPE ${node.docTypeDecl.name}`;
    if (node.docTypeDecl.publicId) {
      docTypeDeclaration += ` PUBLIC "${node.docTypeDecl.publicId}" "${node.docTypeDecl.systemId}"`;
    } else if (node.docTypeDecl.systemId) {
      docTypeDeclaration += ` SYSTEM "${node.docTypeDecl.systemId}"`;
    }
    docTypeDeclaration += ">";
    return docTypeDeclaration;
  }

  /**
   * Construct the XML declaration string
   * @param node - the document node to serialize
   * @returns XML declaration string
   */
  private xmlDeclString(node: DocumentNode): string {
    let xmlDeclaration = "<?xml ";

    if (node.xmlDecl) {
        xmlDeclaration += `version="${node.xmlDecl.version}"`;
        xmlDeclaration += ` encoding="${node.xmlDecl.encoding || "UTF-8"}"`;
        if (node.xmlDecl.standalone !== undefined) {
            xmlDeclaration += ` standalone="${node.xmlDecl.standalone? "yes" : "no"}"`;
        }
    } else {
        xmlDeclaration += "version=\"1.0\"";
        xmlDeclaration += " encoding=\"UTF-8\"";
    }

    xmlDeclaration += "?>";

    return xmlDeclaration;
  };

  private serializeInlineElement(node: AbstractBaseNode): void {
    // print the start of the tag
    this.outputStream.emit(`<${node.static.nodeName}`);
    // serialize the attributes
    this.serializeAttributes(node);

    if (node.children.length) { 
      this.outputStream.emit(`>`);

      // check if element has any text children or phrasing elements
      const inlineContent = node.children.filter(child => child instanceof TextNode || phGroup.includes(child.static.nodeName) || child instanceof CDataNode);
      
      if(inlineContent.length) {
        // increment the depth after starting an element
        this.depth++;
        // visit the element's children
        node.children.forEach((child) => {
          this.serialize(child, node)
        });
        // decrement the depth after serializing the elements children
        this.depth--;
      } else {
        // if the element has no text children or phrasing elements, indent the children
        if(this.indent) {
          // print a new line
          this.outputStream.emit(this.EOL);
          // indent the children
          this.outputStream.emit(this.indentation.repeat((this.depth + 1) * this.tabSize));
        }
        
        // increment the depth after starting an element
        this.depth++;
        // visit the element's children
        node.children.forEach((child, idx) => {
          this.serialize(child, node)
  
          if(this.indent && idx < node.children.length - 1) {
            this.outputStream.emit(this.EOL);
            this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
          }
        });
        // decrement the depth after serializing the elements children
        this.depth--;
  
        if(this.indent) {  
          this.outputStream.emit(this.EOL);
          this.outputStream.emit(this.indentation.repeat(this.depth * this.tabSize));
        }
      }

      this.outputStream.emit(`</${node.static.nodeName}>`);
    } else {
      // element has no children, so the remainder of the element start tag as a self-closing element
      this.outputStream.emit(`/>`);
    }
  }

  /**
   * Serialize an element node to the output stream.
   *
   * @param node - the element node to serialize
   */
  private serializeElement(node: AbstractBaseNode): void {
    // serialize the start of the element start tag
    this.outputStream.emit(`<${node.static.nodeName}`);
    // serialize the attributes
    this.serializeAttributes(node);
    if (node.children?.length) {
      // as the element has children or attributes, serialize the remainder of the element start tag
      this.outputStream.emit(`>`);
      this.serializeEOL(node);
      // increment the depth after starting an element
      this.depth++;
      // visit the element's children
      node.children.forEach(child => this.serialize(child, node));
      // decrement the depth after serializing the elements children
      this.depth--;
      this.serializeIndentation(node);
      this.outputStream.emit(`</${node.static.nodeName}>`);
    } else {
      // element has no children, so the remainder of the element start tag as a self-closing element
      this.outputStream.emit(`/>`);
    }
  }

  /**
   * Serialize the attributes to the output stream
   *
   * @param node - the node to serialize the attributes of
   */
  private serializeAttributes(node: AbstractBaseNode): void {
    let attrsStr = '';
    const props = node.getProps();
    if (props) {
      const attr = props as Record<string, string>;
      attrsStr = Object.keys(props).filter(key => attr[key]).map(key => `${key}="${escapeXMLAttributeCharacters(attr[key])}"`).join(' ');
    }
    if (attrsStr.length) {
      attrsStr = ` ${attrsStr}`;
    }
    this.outputStream.emit(attrsStr);
  }

  /**
   * Serialize the text content of the text node to the output stream
   *
   * @param node - the text node to serialize the content of
   */
  private serializeText(node: TextNode): void {
    const props = node.getProps();
    if (props['content']) {
      let textContent = String(props['content']);
      textContent = escapeXMLCharacters(textContent);
      this.outputStream.emit(textContent);
    }
  }

  /**
   * Serialize the content of cdata to the output stream
   *
   * @param node - the node to serialize the content of
   */
    private serializeCData(node: TextNode): void {
      const props = node.getProps();
      if (props['content']) {
        const cdataOpen = `<![CDATA[`;
        const cdataClose = `]]>`;
        this.outputStream.emit(cdataOpen + String(props['content']) + cdataClose);
      }
    }

  /**
   * Visit a node and serialize it to the output stream
   * 
   * @param node - the node to serialize
   * @param parent - the parent node of the node being serialized
   */
  serialize(node: AbstractBaseNode, parent?: AbstractBaseNode): void {
    if (node instanceof DocumentNode) {
      this.serializeDocument(node);
      // close the output stream as we have now serialized the document
      this.outputStream.close();

    } else {
      // serialize any indentation
      this.serializeIndentation(parent);

      if (node instanceof TextNode) {
        // if the node is a text node, serialize its text content
        this.serializeText(node);

      } else if (node instanceof CDataNode) {
        // if the node is a text node, serialize its text content
        this.serializeCData(node);

      } else if (node.allowsMixedContent()) {
        // if the node is a inline node
        this.serializeInlineElement(node);
      } else {
        // TODO(AR) ideally we should have `node instanceof ElementNode` type guard here
        this.serializeElement(node);
      }

      // serialize any EOL
      this.serializeEOL(parent);
    }
  }
}
