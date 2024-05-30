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

import { AbstractBaseNode, BaseNode, makeComponent } from "./base";
import { BasicValue, isOrUndefined } from "../ast-utils";
import { JDita } from "@evolvedbinary/lwdita-xdita/classes";

/**
 * Define the allowed `text` attribute:
 * The only allowed field is `content`
 */
export const TextFields = ['content'];

/**
 * Interface TextNodeAttributes defines the `content` field type for node `text`: `string`
 */
export interface TextNodeAttributes extends BaseNode {
  'content'?: string
}

/**
 * Check if the attribute `content` of the `text` node is valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidTextField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'content': return isOrUndefined(content => typeof content === 'string', value);
    default: return false;
  }
}

/**
 * Check if the `text` node is valid
 *
 * @remarks
 * Assert that the text node is an object, has content,
 * and that the content meets the required type `string`.
 *
 * @param value - The `text` node to test
 * @returns
 */
export const isTextNode = (value?: unknown): value is TextNodeAttributes =>
  typeof value === 'object' && !!value && 'content' in value && typeof value.content === 'string';


/**
 * Construct a `text` node containing a `content` property
 *
 * @param constructor - The constructor
 * @returns The `text` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeText<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements TextNode {
    get 'content'(): string {
      return this.readProp('content');
    }
    set 'content'(value: string) {
      this.writeProp('content', value);
    }
  }
}

/**
 * Create a `text` node containing a text content
 *
 * @decorator `@makeComponent`
 * @param makeText - The `text` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTextField - A boolean value, if the attribute is valid or not
 * @param fields - The valid attribute `content` of type string See {@link TextFields}
 */
@makeComponent(makeText, 'text', isValidTextField, TextFields)
export class TextNode extends AbstractBaseNode implements TextNodeAttributes {

  // TextNodeAttributes {
  'content'?: string

  constructor(content: string) {
    super({ content });
  }
  get json(): JDita {
    return {
      nodeName: this.static.nodeName,
      content: this._props['content'] as string,
    };
  }
}