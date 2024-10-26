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
 * `LocalizationFields`: `dir`, `xml:lang`, `translate`
 */
export const LocalizationFields = ['dir', 'xml:lang', 'translate'];

/**
 * Interface LocalizationNode defines the attribute types for localization attributes: `CDATA`
 */
export interface LocalizationNodeAttributes {
  'dir'?: CDATA;
  'xml:lang'?: CDATA;
  'translate'?: CDATA;
}

/**
 * Check if the given attributes of the `localization` node are valid and match this list:
 * @see {@link LocalizationFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidLocalizationField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'dir': return isOrUndefined(isCDATA, value);
    case 'xml:lang': return isOrUndefined(isCDATA, value);
    case 'translate': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `localization` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `localization` node to test
 * @returns Boolean
 */
export const isLocalizationNode = (value?: unknown): value is LocalizationNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(LocalizationFields, value as Record<string, BasicValue>, isValidLocalizationField);

/**
 * Create a `localization` node with an `dir`, `xml:lang`, `translate` attribute
 *
 * @param constructor - The constructor
 * @returns The `localization` node with an `dir`, `xml:lang`, `translate` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function  makeLocalization<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements LocalizationNodeAttributes {
    get 'dir'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('dir');
    }
    set 'dir'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('dir', value);
    }
    get 'xml:lang'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('xml:lang');
    }
    set 'xml:lang'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('xml:lang', value);
    }
    get 'translate'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('translate');
    }
    set 'translate'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('translate', value);
    }
  }
}