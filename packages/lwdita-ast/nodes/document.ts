import { AbstractBaseNode } from "./base";
import { stringToChildTypes } from "@evolvedbinary/lwdita-xdita/utils";

/**
 * Interface DocumentNode defines the attribute types for a document node.
 */
export interface DocumentNodeAttributes {}

/**
 * The `document` node is the root node of the document tree and the entry point for the parser
 *
 * @example
 * ```xml
 * <document>
 *   <topic/>
 * </document>
 * ```
 */
export class DocumentNode extends AbstractBaseNode implements DocumentNodeAttributes {
  // TODO rename this to undefined
  static nodeName = 'document';
  static childTypes = stringToChildTypes(['topic']);
  static fields = [];
  static isValidField = (): boolean => true;

}