import * as saxes from "saxes";
import { BaseNode, DocumentNode } from "./nodes";
import { createNode } from "./factory";
import { JDita } from "./classes";

// TODO: add tests

/**
 * Converts XML to a JDita document tree
 * 
 * @param xml - XML string
 * @param abortOnError - If true, abort on error
 * @returns - Promise of a DocumentNode
 */
export async function xditaToJdita(xml: string, abortOnError = true): Promise<DocumentNode> {
  return new Promise((resolve, reject) => {
    const errors: Error[] = [];
    // Create Parser Object
    const parser = new saxes.SaxesParser({
      xmlns: true,
      fragment: false,
      position: true
    });

    // Create a new document node
    const doc = new DocumentNode();

    // Create an array of Document nodes (type BaseNode)
    const stack: BaseNode[] = [doc];

    // Parse the text and add a new node item to the node-array
    parser.on("text", function (text) {
      stack[stack.length - 1].add(createNode(text), abortOnError);
    });

    // Look for the first open tag `<` and add the node to the array
    parser.on("opentag", function (node: saxes.SaxesTagNS) {
      try {
        const obj = createNode(node);
        stack[stack.length - 1].add(obj, abortOnError);
        stack.push(obj);
      } catch (e) {
        console.log('invalid:', e);
      }
    });

    // Look for the close tag `>` and delete the node from the array
    parser.on("closetag", function () {
      stack.pop();
    });

    // return the document tree if run without errors
    parser.on("end", function () {
      if (errors.length && abortOnError) {
        reject(errors);
      } else {
        resolve(doc);
      }
    });

    parser.on("error", function (e) {
      errors.push(e);
    });

    // process the xml using the parser
    parser.write(xml).close();
  });
}

// Convert document tree to json
export async function xditaToJson(xml: string, abortOnError = true): Promise<JDita> {
  return xditaToJdita(xml, abortOnError).then(doc => doc.json);
}