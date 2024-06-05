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
 * ClassFields (universal attributes): `outputclass`, `class`
 */
export const ClassFields = ['outputclass', 'class'];

/**
 * Interface ClassNode defines the attribute types
 */
export interface ClassNodeAttributes {
  'outputclass'?: CDATA;
  'class'?: CDATA;
}

/**
 * Check if the attributes `outputclass`, `class` are valid
 *
 * @See {@link ClassFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidClassField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'outputclass': return isOrUndefined(isCDATA, value);
    case 'class': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `class` attribute is valid
 *
 * @param value - The `class` node to test
 * @returns Boolean
 */
export const isClassNode = (value?: unknown): value is ClassNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ClassFields, value as Record<string, BasicValue>, isValidClassField);


/**
 * Create a `class` node (universal attribute)
 * This will be transformed to an LwDita attribute e.g. `class=""`
 *
 * @see {@link https://dita-lang.org/lwdita/commonspec/specification/langref/attributes/attribute-groups#attribute-groups__universal-attributes}
 *
 * @param constructor - The constructor
 * @returns The `class` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeClass<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements ClassNodeAttributes {
    get 'outputclass'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('outputclass');
    }
    set 'outputclass'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('outputclass', value);
    }
    get 'class'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('class');
    }
    set 'class'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('class', value);
    }
  }
}