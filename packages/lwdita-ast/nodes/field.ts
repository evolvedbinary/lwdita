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

import { isOrUndefined, areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { AbstractBaseNode, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * `FieldFields`: `name`, `value`
 */
export const FieldFields = ['name', 'value'];

/**
 * Interface `FieldNode` defines the attribute types
 */
export interface FieldNodeAttributes<T = CDATA> {
  'name'?: CDATA;
  'value'?: T;
}

/**
 * `isValidFieldField` - Check if the attributes `name`, `value` are valid.
 *
 * @See {@link FieldFields}
 *
 * @param validator - a function that takes a BasicValue and returns a boolean
 * @returns function - The return function takes two parameters `name`, `value` and returns a boolean
 */
export const isValidFieldField = (validator: (val: BasicValue) => boolean = isCDATA): (field: string, value: BasicValue) => boolean =>
  (field: string, value: BasicValue): boolean => {
    switch (field) {
      case 'name': return isOrUndefined(isCDATA, value);
      case 'value': return isOrUndefined(validator, value);
      default: return false;
    }
  }

/**
 * `isFieldNode` - Check if the `field` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `field` node to test
 * @returns Boolean
 */
export const isFieldNode = (value?: unknown): value is FieldNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(FieldFields, value as Record<string, BasicValue>, isValidFieldField());

/**
 * `makeField` - Create a `field` node
 *
 * @param constructor - The constructor
 * @returns The `field` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeField<ValueType extends BasicValue, T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements FieldNodeAttributes<ValueType> {
    get 'name'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('name');
    }
    set 'name'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('name', value);
    }
    get 'value'(): ValueType {
      return this.readProp<ValueType>('value');
    }
    set 'value'(value: ValueType) {
      this.writeProp<ValueType>('value', value);
    }
  }
}

/**
 * `isValidCDATAFieldField` - Checks if the field is a CDATA type
 *
 * @param field - the field to check
 * @param value - the value to check
 * @returns boolean
 */
export const isValidCDATAFieldField = isValidFieldField();

/**
 * `makeCDATAField` - Make a CDATA field
 *
 * A function that takes a constructor and returns calls makeField with that constructor
 * @param constructor - The contructor
 * @returns a CDATA field
 */
export const makeCDATAField = <T extends Constructor>(constructor: T): T => makeField<CDATA, T>(constructor);

/**
 * BooleanFieldNode
 */
export type BooleanFieldNode = FieldNodeAttributes<boolean>;

/**
 * isValidBooleanFieldField  -  Checks if the boolean field node is valid
 * by calling `isValidFieldField` with a function `typeof` that checks if the value is a boolean
 */
export const isValidBooleanFieldField = isValidFieldField(val => typeof val === 'boolean');

/**
 * `makeBooleanField` - Make a boolean field
 *
 * @remarks
 * A function that takes a constructor and returns calls makeField with that constructor
 *
 * @param constructor - The contructor
 * @returns A boolean field
 */
export const makeBooleanField = <T extends Constructor>(constructor: T): T => makeField<boolean, T>(constructor);