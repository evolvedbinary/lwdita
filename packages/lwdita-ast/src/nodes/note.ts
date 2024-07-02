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
import { CDATA, isCDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `note` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`, `type`
 */
export const NoteFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, 'type'];

export enum NoteTypes {
  Caution = "caution",
  Warning = "warning",
  Danger = "danger",
  Trouble = "trouble",
  Notice = "notice",
  Note = "note"
}

/**
 * Interface NoteNode defines the attribute type for `note`: `CDATA`
 */
export interface NoteNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode {
  type: NoteTypes
}

/**
 * Check if the given attributes of the `note` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidNoteField(field: string, value: BasicValue): boolean {
  if (isValidFiltersField(field, value)
    || isValidLocalizationField(field, value)
    || isValidReuseField(field, value)
    || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'type': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `note` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `note` node to test
 * @returns Boolean
 */
export const isNoteNode = (value?: unknown): value is NoteNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(NoteFields, value as Record<string, BasicValue>, isValidNoteField);

/**
 * Construct a `note` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `note` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeNote<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'type'(): CDATA {
      return this.readProp<CDATA>('type');
    }
    set 'type'(value: CDATA) {
      this.writeProp<CDATA>('type', value);
    }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `note` node and map the `note` node with the LwDita tag name `div`
 *
 * @decorator `@makeComponent`
 * @param makeNote - The `note` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidNoteField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link NoteFields}
 * @param childNodes - An Array of allowed child nodes: `%simple-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `example`, `note`)
 */
@makeComponent(makeNote, 'note', isValidNoteField, NoteFields, ['%simple-blocks*'])
export class NoteNode extends AbstractBaseNode implements NoteNodeAttributes {
  static domNodeName = 'div'

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

  // NoteNodeAttributes
  type: NoteTypes = NoteTypes.Note
}