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
 * Define all allowed `sthead` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const StHeadFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StHeadNodeAttributes defines the attribute types for `sthead`:
 * `CDATA`, `NMTOKEN`
 */
export interface StHeadNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `sthead` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidStHeadField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `sthead` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `sthead` node to test
 * @returns Boolean
 */
export const isStHeadNode = (value?: unknown): value is StHeadNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(StHeadFields, value as Record<string, BasicValue>, isValidStHeadField);

/**
 * Construct a `sthead` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `sthead` node
 */
export function makeStHead<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `sthead` node (simple table header) and map the `sthead` node with the LwDita tag name `thead`
 *
 * @decorator `@makeComponent`
 * @param makeStHead - The `sthead` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidStHeadField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes
 * @param childNodes - An Array of allowed child node `stentry+`
 */
@makeComponent(makeStHead, 'sthead', isValidStHeadField, StHeadFields, ['stentry+'])
export class StHeadNode extends AbstractBaseNode implements StHeadNodeAttributes {
  static domNodeName = 'thead'

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