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
import { CDATA, NMTOKEN, isCDATA, isNMTOKEN } from "../ast-classes";


/**
 * Define all allowed `reuse` attributes:
 * `id`, `conref`
 */
export const ReuseFields = ['id', 'conref'];

/**
 * Interface reuseNode defines the attribute types for `reuse`:
 * `CDATA`, `NMTOKEN`
 */
export interface ReuseNodeAttributes {
  'id'?: NMTOKEN;
  'conref'?: CDATA;
}

/**
 * Check if the given attributes of the `reuse` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidReuseField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'id': return isOrUndefined(isNMTOKEN, value);
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `reuse` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `reuse` node to test
 * @returns Boolean
 */
export const isReuseNode = (value?: unknown): value is ReuseNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ReuseFields, value as Record<string, BasicValue>, isValidReuseField);

/**
 * Create a `reuse` node with an `id` and `conref` attribute
 *
 * @param constructor - The constructor
 * @returns The `reuse` node with an `id` and `conref` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeReuse<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements ReuseNodeAttributes {
    get 'id'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('id');
    }
    set 'id'(value: NMTOKEN | undefined) {
      this.writeProp<NMTOKEN | undefined>('id', value);
    }
    get 'conref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('conref');
    }
    set 'conref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('conref', value);
    }
  }
}