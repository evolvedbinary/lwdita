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
import { areFieldsValid, isOrUndefined } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll } from "./base";
import { BasicValue } from "../classes";
import { CDATA, isCDATA, NMTOKEN, XmlSpace } from "../ast-classes";

/**
 * Define all allowed `pre` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`, `xml:space`
 */
export const PreFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, 'xml:space'];

/**
 * Interface PreNodeAttributes defines the attribute types for `pre`:
 */
export interface PreNodeAttributes extends
  FiltersNodeAttributes,
  LocalizationNodeAttributes,
  ReuseNodeAttributes,
  ClassNodeAttributes,
  BaseNode {
   'xml:space': XmlSpace
  }

/**
 * Check if the given fields of the `pre` node are valid
 *
 * @privateRemarks
 * TODO: Implement field validation for `xml:space` (preserve)
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidPreField = (field: string, value: BasicValue): boolean => {
  if (isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'xml:space': return isOrUndefined(isCDATA, value);
    default: return false;
  }
};

/**
 * Check if the `pre` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `pre` node to test
 * @returns Boolean
 */
export const isPreNode = (value?: unknown): value is PreNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(PreFields, value as Record<string, BasicValue>, isValidPreField);

/**
 * Construct a `pre` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `pre` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makePre<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'xml:space'(): XmlSpace {
      return this.readProp<XmlSpace>('xml:space'); }
    set 'xml:space'(value: XmlSpace) {
        this.writeProp<XmlSpace>('xml:space', value); }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `pre` node (preformatted text) and map the `pre` node with the LwDita tag name `pre`
 *
 * @decorator `@makeComponent`
 * @param makePre - The `pre` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidPreField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link PreFields}
 * @param childNodes - An Array of allowed child nodes `text*`, `%ph*`, `xref*`, `%data*`
 */
@makeComponent(makePre, 'pre', isValidPreField, PreFields, [['text*', '%ph*', 'xref*', '%cdata*']])
export class PreNode extends AbstractBaseNode implements PreNodeAttributes {
  static domNodeName = 'pre';

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

  // PreNodeAttributes
  'xml:space': XmlSpace
}