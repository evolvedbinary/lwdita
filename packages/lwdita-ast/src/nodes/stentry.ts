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
import { CDATA, isCDATA, isNMTOKENS, isTableScope, NMTOKEN, NMTOKENS, TableScope } from "../ast-classes";

/**
 * Define all allowed `stentry` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`, `colspan`, `rowspan`, `scope`, `headers`
 */
export const StEntryFields = [
  ...FiltersFields,
  ...LocalizationFields,
  ...ReuseFields,
  ...ClassFields,
  'colspan',
  'rowspan',
  'scope',
  'headers'
];

/**
 * Interface StEntryNodeAttributes defines the attribute types for `stentry`
 */
export interface StEntryNodeAttributes extends
  FiltersNodeAttributes,
  LocalizationNodeAttributes,
  ReuseNodeAttributes,
  ClassNodeAttributes,
  BaseNode {
    'colspan'?: NMTOKEN
    'rowspan'?: NMTOKEN
    'scope'?: TableScope
    'headers'?: NMTOKENS
  }

/**
 * Check if the given attributes of the `stentry` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidStEntryField(field: string, value: BasicValue): boolean {
  if (
    isValidFiltersField(field, value)
    || isValidClassField(field, value)
    || isValidLocalizationField(field, value)
    || isValidReuseField(field, value)
    || isValidClassField(field, value)
  ){
    return true;
  }
  switch(field) {
  case 'colspan': return isOrUndefined(isCDATA, value);
  case 'rowspan': return isOrUndefined(isCDATA, value);
  case 'scope': return isOrUndefined(isTableScope, value);
  case 'headers': return isOrUndefined(isNMTOKENS, value);
  default: return false;
  }
}

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeStEntry<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(
    class extends constructor {
      get 'colspan'(): CDATA {
        return this.readProp<CDATA>('colspan');
      }
      set 'colspan'(value: CDATA) {
        this.writeProp<CDATA>('colspan', value);
      }
      get 'rowspan'(): CDATA {
        return this.readProp<CDATA>('rowspan');
      }
      set 'rowspan'(value: CDATA) {
        this.writeProp<CDATA>('rowspan', value);
      }
      get 'scope'(): TableScope {
        return this.readProp<TableScope>('scope');
      }
      set 'scope'(value: TableScope) {
        this.writeProp<TableScope>('scope', value);
      }
      get 'headers'(): NMTOKENS {
        return this.readProp<NMTOKENS>('headers');
      }
      set 'headers'(value: NMTOKENS) {
        this.writeProp<NMTOKENS>('headers', value);
      }
     },
    makeLocalization,
    makeFilters,
    makeReuse,
    makeClass
  );
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
 * @param fields - A List of valid attributes @see {@link StEntryFields}
 * @param childNodes - An Array of allowed child node `%simple-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `example`, `note`)
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

  // StEntryNodeAttributes
  'colspan'?: NMTOKEN
  'rowspan'?: NMTOKEN
  'scope'?: TableScope
  'headers'?: NMTOKENS
}