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
import { areFieldsValid, isOrUndefined } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNodeAttributes, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";
import { CDATA, isCDATA } from "../ast-classes";

/**
 * Define all allowed `media-track` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`, `type`
 * Custom attributes are `name`, `value`
 */
export const MediaTrackFields = [...LocalizationFields, ...FieldFields, ...ClassFields, 'type'];

/**
 * Interface MediaTrackNodeAttributes defines the attribute types for `media-track`:
 * `CDATA`, `T`
 */
export interface MediaTrackNodeAttributes extends LocalizationNodeAttributes, FieldNodeAttributes<boolean>, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given fields of the `media-track` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaTrackField = (field: string, value: BasicValue): boolean => {
  if (isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'type': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `media-track` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-track` node to test
 * @returns Boolean
 */
export const isMediaTrackNode = (value?: unknown): value is MediaTrackNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MediaTrackFields, value as Record<string, BasicValue>, isValidMediaTrackField);


/**
 * Construct a `media-track` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-track` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeMediaTrack<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'type'(): CDATA {
      return this.readProp<CDATA>('type'); }
    set 'type'(value: CDATA) {
        this.writeProp<CDATA>('type', value); }
  }, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-track` node
 *
 * @remarks
 * Track is a link to time-based text data relevant to audio or video content.
 *
 * @decorator `@makeComponent`
 * @param makeMediaTrack - The `media-track` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaTrackField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaTrackFields}
 */
@makeComponent(makeMediaTrack, 'media-track', isValidMediaTrackField, MediaTrackFields)
export class MediaTrackNode extends AbstractBaseNode implements MediaTrackNodeAttributes {
  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // FieldNodeAttributes
  'name'?: CDATA
  'value'?: boolean

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA
}