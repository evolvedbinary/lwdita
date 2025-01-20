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
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `ul` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const UlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface UlNodeAttributes defines the attribute types for `ul`:
 * `CDATA`, `NMTOKEN`
 */
export interface UlNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `ul` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidUlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `ul` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `ul` node to test
 * @returns Boolean
 */
export const isUlNode = (value?: unknown): value is UlNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(UlFields, value as Record<string, BasicValue>, isValidUlField);

/**
 * Construct an `ul` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `ul` node
 */
export function makeUl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an `ul` node (Unordered list) and map the `ul` node with the LwDita tag name `ul`
 *
 * @decorator `@makeComponent`
 * @param makeUl - The `ul` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidUlField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @see {@link UlFields}
 * @param childNodes - An Array of allowed child nodes: `li+`
 */
@makeComponent(makeUl, 'ul', isValidUlField, UlFields, ['li+'])
export class UlNode extends AbstractBaseNode implements UlNodeAttributes {
  static domNodeName = 'ul'
  static label = "Unordered list";
  
  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // ReuseNodeAttributes
  'id'?: NMTOKEN
  'conref'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}