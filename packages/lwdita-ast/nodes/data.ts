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
import { ReferenceContentNodeAttributes, ReferenceContentFields, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { BasicValue, areFieldsValid } from "../ast-utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, VariableContentNodeAttributes, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { FieldFields, FieldNodeAttributes, isValidCDATAFieldField, makeCDATAField } from "./field";
import { CDATA, ReferenceContentScope } from "../ast-classes";

/**
 * Define all allowed `data` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `href`, `format`, `scope`, `outputclass`, `class`, `keyref`
 */
export const DataFields = [...FiltersFields, ...LocalizationFields, ...ReferenceContentFields, ...ClassFields, ...VariableContentFields, ...FieldFields];

/**
 * Interface DataNodeAttributes defines the attribute types for `data`:
 */
export interface DataNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReferenceContentNodeAttributes, VariableContentNodeAttributes, FieldNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `data` node are valid and match this list:
 * @See {@link DataFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDataField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value)
  || isValidCDATAFieldField(field, value);

/**
 * Check if the `data` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `data` node to test
 * @returns Boolean
 */
export const isDataNode = (value?: unknown): value is DataNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DataFields, value as Record<string, BasicValue>, isValidDataField);

/**
 * Construct a `data` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `data` node
 */
export function makeData<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReferenceContent, makeClass, makeVariableContent, makeCDATAField);
}

/**
 * Create a `data` node
 *
 * @decorator `@makeComponent`
 * @param makeData - The `data` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDataField - A boolean value, if the attribute is valid or not
 * @param DataFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: `text*`, `%data*`
 */
@makeComponent(makeData, 'data', isValidDataField, DataFields, [['text*', '%data*']])
export class DataNode extends AbstractBaseNode implements DataNodeAttributes {
  static domNodeName = 'data';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // FieldNodeAttributes
  'name'?: CDATA
  'value'?: CDATA

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA
  'format'?: CDATA
  'scope'?: ReferenceContentScope

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}