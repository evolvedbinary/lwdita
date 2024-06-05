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

import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { FnReuseNodeAttributes, FnReuseFields, isValidFnReuseField, makeFnReuse } from "./fn-reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, isOrUndefined } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll } from "./base";
import { BasicValue } from "../classes";
import { CDATA, isCDATA, ID } from "../ast-classes";

/**
 * Define all allowed `fn` fields:
 * `id`, `callout`, `props`, `dir`, `xml:lang`, `translate`, `conref`, `outputclass`, `class`
 *
 * @privateRemarks
 * TODO: Handle 'xml:space' (preserve)
 */
export const FnFields = [...FiltersFields, ...LocalizationFields, ...FnReuseFields, ...ClassFields, 'id', 'callout'];

/**
 * Interface FnNode defines the attribute types for `fn`
 */
export interface FnNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, FnReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `fn` node are valid and match this list:
 * @See {@link FnFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidFnField = (field: string, value: BasicValue): boolean => {
  if (isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFnReuseField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'id': return isOrUndefined(isCDATA, value);
    case 'callout': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `fn` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `fn` node to test
 * @returns Boolean
 */
export const isFnNode = (value?: unknown): value is FnNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(FnFields, value as Record<string, BasicValue>, isValidFnField);

/**
 * Create a `fn` node with an `id` and `callout` attribute
 *
 * @param constructor - The constructor
 * @returns The `fn` node with an `id` and `callout` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFn<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'id'(): ID {
      return this.readProp<ID>('id'); }
    set 'id'(value: ID) {
        this.writeProp<ID>('id', value); }
    get 'callout'(): CDATA {
      return this.readProp<CDATA>('callout'); }
    set 'callout'(value: CDATA) {
        this.writeProp<CDATA>('callout', value); }
  }, makeLocalization, makeFilters, makeFnReuse, makeClass);
}

/**
 * Create an `fn` node
 *
 * @decorator `@makeComponent`
 * @param makeFn - The `Fn` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidFnField - A boolean value, if the field is valid or not
 * @param FnFields - An array containing all valid attributes @See {@link FnFields}
 * @param FnContent - An array containing all valid child nodes: '%fn-blocks*' (`p`, `ul`, `ol`, `dl`, `data`)
 * @returns A `fn` node
 */
@makeComponent(makeFn, 'fn', isValidFnField, FnFields, ['%fn-blocks*'])
export class FnNode extends AbstractBaseNode implements FnNodeAttributes {
  static domNodeName = 'span';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // FnReuseNodeAttributes
  'conref'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}