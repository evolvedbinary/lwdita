import { BaseNode } from "./base";
import { stringToChildTypes } from "../utils";

/**
 * Document node is the root node of the document tree and the entry point for the parser
 * @category Nodes
 * @example
 * ```xml
 * <document>  // first thing that the parser gave us
 *  <topic/> // i think we can have one topics
 * <topic/>
 * </document>
 * ```
 * my theory is that every time we parse we will start with a document Node
 */
export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = stringToChildTypes(['topic']);
  static fields = [];
  static isValidField = (): boolean => true;
}
