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
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `i` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const ItalicFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface ItalicNodeAttributes defines the attribute types for `i`
 */
export interface ItalicNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `italic` node are valid and match this list:
 * @See {@link ItalicFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidItalicField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `italic` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `italic` node to test
 * @returns Boolean
 */
export const isItalicNode = (value?: unknown): value is ItalicNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ItalicFields, value as Record<string, BasicValue>, isValidItalicField);

/**
 * Construct an `italic` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `italic` node
 */
export function makeItalic<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create an italic node
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/i"
 *
 * @decorator `@makeComponent`
 * @param makeItalic - The `italic` node constructor
 * @param nodeName - A string containing the node name 'i'
 * @param isValidItalicField - A function to check if the field is valid see {@link isValidItalicField}
 * @param ItalicFields - A list of valid fields `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 * @returns A decorator
 */
@makeComponent(makeItalic, 'i', isValidItalicField, ItalicFields, ['%all-inline*'])
export class ItalicNode extends AbstractBaseNode implements ItalicNodeAttributes {
  static domNodeName = 'i';

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