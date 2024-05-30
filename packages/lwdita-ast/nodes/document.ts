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

import { stringToChildTypes } from "../ast-utils";
import { AbstractBaseNode } from "./base";

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