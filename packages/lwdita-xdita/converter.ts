import * as saxes from "saxes";
import { BaseNode, DocumentNode } from "@evolvedbinary/lwdita-ast/nodes";
import { createNode } from "@evolvedbinary/lwdita-ast/factory";
import { InMemorySimpleTextStreamCollector } from "./stream";
import { JDita } from "./classes";
import { XditaSerializer } from "./xdita-serializer";

/** TODO: Add tests for this module */

/**
 * xditaToJdita - Converts XML to a JDita document tree
 *
 * @param xml - XML string
 * @param abortOnError - If true, abort on error
 * @returns - Promise of a DocumentNode
 */
export async function xditaToJdita(xml: string, abortOnError = true): Promise<DocumentNode> {
  return new Promise((resolve, reject) => {
    const errors: Error[] = [];
    // Create a Parser Object
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
    // `text` is the content of any text node in the parsed xml document
    parser.on("text", function (text) {
      stack[stack.length - 1].add(createNode(text), abortOnError);
    });

    // Look for the first open tag `<` and add the node to the array
    /**
     * `node` is the node object
     * @example
     * ```json
     * node {
     *   name: 'topic',
     *   attributes: [Object: null prototype] {
     *     id: {
     *       name: 'id', prefix: '',
     *       local: 'id', value: 'topicID', uri: ''
     *     }
     *   },
     *   ns: [Object: null prototype] {},
     *   prefix: '',
     *   local: 'topic',
     *   uri: '',
     *   isSelfClosing: false
     * }
     * ```
     * @example
     * The `obj` is an object containing all the node's corresponding properties like
     * ```json
     * obj _a: { _props: { id: 'topicID', 'xml:lang': undefined,... }}
     * ```
     */
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

/**
 * xditaToJson - Convert the document tree to json
 *
 * @param xml - The XML input as string
 * @param abortOnError - Boolean, if true, stop execution and report errors
 * @returns The XML document tree object
 */
export async function xditaToJson(xml: string, abortOnError = true): Promise<JDita> {
  return xditaToJdita(xml, abortOnError).then(doc => doc.json);
}

/**
 * `serializeToXML` - Serialize the JDita AST and transform it into XML
 * The serialization is providing three options to output the document:
 * 1. No indentation/formatting - all is output in one line (default)
 * 2. Indentation with tabs
 * 3. Indentation with Spaces - You can modify the desired number of spaces by setting `indentationSize`, per default it's set to 4 spaces.
 *
 * @example
 * ```
 * // 1. No formatting
 *    serializeToXML(result);
 * // 2. Indentation with tabs
 *    serializeToXML(result, '\t');
 * // 3. Indentation with Spaces
 *    serializeToXML(result, ' ', 4);
 * ```
 *
 * @param root - The document root
 * @param indentationChar - The indentation character to be used (tabs or spaces). If none is provided, no indentation is used.
 * @param tabSize - The number of spaces to be used for indentation when an indentation character other than tab is used, the default is 4 spaces
 * @returns The transformed document as an array of XMLTag objects
 */
export function serializeToXML(root: DocumentNode, indentationChar?: string, tabSize?: number): string {
  const outStream = new InMemorySimpleTextStreamCollector();
  let visitor: XditaSerializer;
  if(indentationChar === '\t') {
    visitor = new XditaSerializer(outStream, true, '\t');
  } else if (indentationChar) {
    tabSize = tabSize ? tabSize : 4;
    visitor = new XditaSerializer(outStream, true, indentationChar, tabSize);
  } else {
    visitor = new XditaSerializer(outStream,false);
  }
  visitor.visit(root);

  return outStream.getText();
}
