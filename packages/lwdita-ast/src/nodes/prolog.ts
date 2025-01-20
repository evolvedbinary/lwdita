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
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";

/**
 * Define all allowed `prolog` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 */
export const PrologFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

/**
 * Interface PrologNode defines the attribute type for `prolog`
 */
export interface PrologNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `prolog` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export const isValidPrologField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `prolog` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `prolog` node to test
 * @returns Boolean
 */
export const isPrologNode = (value?: unknown): value is PrologNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(PrologFields, value as Record<string, BasicValue>, isValidPrologField);

/**
 * Construct a `prolog` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `prolog` node
 */
export function makeProlog<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

/**
 * Create a `prolog` node
 *
 * @privateRemarks
 * Delete the default tag name from the BaseNode
 * Is overriding the domNodeName with an empty string intended??
 * TODO: Implement `head > meta`
 * TODO (Y.): Why is `domNodeName` set to an empty string?
 *
 * @decorator `@makeComponent`
 * @param makeProlog - The `prolog` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPrologField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @see {@link PrologFields}
 * @param childNodes - An Array of allowed child node `metadata*`
 */
@makeComponent(makeProlog, 'prolog', isValidPrologField, PrologFields, ['metadata*'])
export class PrologNode extends AbstractBaseNode implements PrologNodeAttributes {
  static domNodeName = '';
  static label = "Prolog";
  
  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}