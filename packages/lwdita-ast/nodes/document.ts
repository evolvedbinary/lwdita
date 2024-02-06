import { BaseNode } from "./base";
import { stringToChildTypes } from "@evolvedbinary/lwdita-xdita/utils";

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
export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = stringToChildTypes(['topic']);
  static fields = [];
  static isValidField = (): boolean => true;

  /** @override */
  accept(visitor: any, depth, indent): void {
    //don't start the tag for document node
    this._children?.forEach(child => child.accept(visitor, depth, indent));
  }
}