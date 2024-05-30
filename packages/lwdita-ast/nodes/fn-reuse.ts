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

import { isOrUndefined, areFieldsValid } from "../ast-utils";
import { AbstractBaseNode } from "./base";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * FnReuseFields: `conref`
 */
export const FnReuseFields = ['conref'];

/**
 * FnReuseNode: `conref`
 */
export interface FnReuseNodeAttributes {
  'conref'?: CDATA;
}

/**
 * Check if the given attributes of the `fn-reuse` node are valid and match this list:
 * @See {@link FnReuseFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidFnReuseField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `fn-reuse` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `fn-reuse` node to test
 * @returns Boolean
 */
export const isFnReuseNode = (value?: unknown): value is FnReuseNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(FnReuseFields, value as Record<string, BasicValue>, isValidFnReuseField);

/**
 * Create a `fn-reuse` node with a `conref` attribute
 *
 * @param constructor - The constructor
 * @returns The `fn-reuse` node with a `conref` attribute and its value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFnReuse<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements FnReuseNodeAttributes {
    get 'conref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('conref');
    }
    set 'conref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('conref', value);
    }
  }
}