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
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `shortdesc` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const ShortDescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

/**
 * Interface ShortDescNodeAttributes defines the attribute types for `shortdesc`: `CDATA`
 */
export interface ShortDescNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `shortdesc` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidShortDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `shortdesc` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `shortdesc` node to test
 * @returns Boolean
 */
export const isShortDescNode = (value?: unknown): value is ShortDescNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ShortDescFields, value as Record<string, BasicValue>, isValidShortDescField);

/**
 * Construct a `shortdesc` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `shortdesc` node
 */
export function makeShortDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

/**
 * Create a `shortdesc` node (short description) and map the `shortdesc` node with the LwDita tag name `p`
 *
 * @decorator `@makeComponent`
 * @param makeshortdesc - The `shortdesc` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSimpleTableField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes
 * @param childNodes - An Array of allowed child node `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeShortDesc, 'shortdesc', isValidShortDescField, ShortDescFields, ['%all-inline*'])
export class ShortDescNode extends AbstractBaseNode implements ShortDescNodeAttributes {
  static domNodeName = 'p'

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}