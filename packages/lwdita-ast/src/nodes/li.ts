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
 * Define all allowed `li` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const LiFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface LiNode defines the attribute types for `li`
 */
export interface LiNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `li` node are valid and match this list:
 * @see {@link LiFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidLiField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `li` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `li` node to test
 * @returns Boolean
 */
export const isLiNode = (value?: unknown): value is LiNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(LiFields, value as Record<string, BasicValue>, isValidLiField);

/**
 * Construct a `li` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `li` node
 */
export function makeLi<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `li` (List item) node
 *
 * @decorator `@makeComponent`
 * @param makeLi - The `li` node constructor
 * @param nodeName - A string containing the node name 'li'
 * @param isValidLiField - A function to check if the attribute is valid see {@link isValidLiField}
 * @param LiFields - A list of valid attributes `%list-blocks*` (`p`,`ul`, `ol`, `dl`, `pre`, `audio`, `video`, `example`, `simpletable`, `fig`, `note`)
 * @returns A `li` node
 */
@makeComponent(makeLi, 'li', isValidLiField, LiFields, ['%list-blocks*'])
export class LiNode extends AbstractBaseNode implements LiNodeAttributes {
  static domNodeName = 'li';
  static label = "List item";

  static rank = 100; // highest rank
  
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