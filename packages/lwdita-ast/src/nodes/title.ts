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

import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `title` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const TitleFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface TitleNodeAttributes defines the attribute types for `title`:
 * `CDATA`
 */
export interface TitleNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode {}

/**
 * Check if the given attributes of the `title` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidTitleField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `title` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `title` node to test
 * @returns Boolean
 */
export const isTitleNode = (value?: unknown): value is TitleNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(TitleFields, value as Record<string, BasicValue>, isValidTitleField);

/**
 * Construct a `title` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `title` node
 */
export function makeTitle<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create a `title` node and map the `title` node with the LwDita tag name `h1`
 *
 * @decorator `@makeComponent`
 * @param makeTitle - The `title` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTitleField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @see {@link TitleFields}
 * @param childNodes - An Array of allowed child nodes: `%inline.noxref*` (`text`, `b`, `em`,  `i`, `ph`, `strong`, `sub`, `sup`, `tt`, `u`, `image`)
 */
@makeComponent(makeTitle, 'title', isValidTitleField, TitleFields, ['%inline.noxref*'])
export class TitleNode extends AbstractBaseNode implements TitleNodeAttributes {
  static domNodeName = 'h1';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA
}