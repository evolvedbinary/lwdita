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
import { ReuseNodeAttributes } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "../classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `superscript` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const SuperscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface SuperscriptNodeAttributes defines the attribute types for `superscript`:
 * `CDATA`, `NMTOKEN`
 */
export interface SuperscriptNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `superscript` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSuperscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `superscript` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `superscript` node to test
 * @returns Boolean
 */
export const isSuperscriptNode = (value?: unknown): value is SuperscriptNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SuperscriptFields, value as Record<string, BasicValue>, isValidSuperscriptField);

/**
 * Construct a `superscript` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `superscript` node
 */
export function makeSuperscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `superscript` node and map the `superscript` node with the LwDita tag name `sup`
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/sup "
 *
 * @decorator `@makeComponent`
 * @param makeSuperscript - The `superscript` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSuperscriptField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @see {@link SuperscriptFields}
 * @param childNodes - An Array of allowed child nodes: `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeSuperscript, 'sup', isValidSuperscriptField, SuperscriptFields, ['%all-inline*'])
export class SuperscriptNode extends AbstractBaseNode implements SuperscriptNodeAttributes {
  static domNodeName = 'sup'

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