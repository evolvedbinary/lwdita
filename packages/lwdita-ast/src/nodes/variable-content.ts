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

import { areFieldsValid, isOrUndefined } from "../utils";
import { AbstractBaseNode } from "./base";
import { BasicValue } from "../classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `variable-content` attributes:
 * The only allowed field is `keyref`
 */
export const VariableContentFields = ['keyref'];

/**
 * The interface `VariableContentNode` defines the attribute type for `variable-content`: 'CDATA'
 */
export interface VariableContentNodeAttributes {
  'keyref'?: CDATA;
}

/**
 * Check if the attributes `keyref` of the `variable-content` node is valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidVariableContentField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'keyref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `variable-content` node is valid
 *
 * @remarks
 * Assert that the node is an object and has a valid attribute
 *
 * @param value - The `variable-content` node to test
 * @returns Boolean
 */
export const isVariableContentNode = (value?: unknown): value is VariableContentNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(VariableContentFields, value as Record<string, BasicValue>, isValidVariableContentField);

/**
 * Create a `variable-content` node with a `keyref` attribute
 *
 * @param constructor - The constructor
 * @returns The `variable-content` node with a `keyref` attribute and its value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeVariableContent<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements VariableContentNodeAttributes {
    get 'keyref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('keyref');
    }
    set 'keyref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('keyref', value);
    }
  }
}