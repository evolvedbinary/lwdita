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
import { BasicValue, areFieldsValid } from "../ast-utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `stentry` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const StEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StEntryNodeAttributes defines the attribute types for `stentry`:
 * `CDATA`, `NMTOKEN`
 */
export interface StEntryNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `stentry` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidStEntryField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `stentry` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `stentry` node to test
 * @returns Boolean
 */
export const isStEntryNode = (value?: unknown): value is StEntryNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(StEntryFields, value as Record<string, BasicValue>, isValidStEntryField);

/**
 * Construct a `stentry` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `stentry` node
 */
export function makeStEntry<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `stentry` node (simple table entry / "table-cell") and map the `stentry` node with the LwDita tag name `td`
 *
 * @privateRemarks
 * TODO: Implement td/th
 *
 * @decorator `@makeComponent`
 * @param makeStEntry - The `stentry` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidStEntryField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link StEntryFields}
 * @param childNodes - An Array of allowed child node `%simple-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `fn`, `note`, `data`)
 */
@makeComponent(makeStEntry, 'stentry', isValidStEntryField, StEntryFields, ['%simple-blocks*'])
export class StEntryNode extends AbstractBaseNode implements StEntryNodeAttributes {
  static domNodeName = 'td'

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