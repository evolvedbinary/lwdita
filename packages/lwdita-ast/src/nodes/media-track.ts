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
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";
import { CDATA, isCDATA, isKindType, KindType, ReferenceContentScope } from "../ast-classes";
import { isValidReferenceContentField, makeReferenceContent, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";
import { isValidVariableContentField, makeVariableContent, VariableContentFields, VariableContentNodeAttributes } from "./variable-content";

/**
 * Define all allowed `media-track` attributes:
 * `dir`, `xml:lang`, `translate`, `href`, `format`, `scope`,
 * `keyref`, `kind`, `srclang`, `class`, `outputclass`
 */
export const MediaTrackFields = [
  ...LocalizationFields,
  ...ReferenceContentFields,
  ...VariableContentFields,
  ...ClassFields,
  'kind',
  'srclang'
];

/**
 * Interface MediaTrackNodeAttributes defines the attribute types for `media-track`
 */
export interface MediaTrackNodeAttributes extends
  LocalizationNodeAttributes,
  ReferenceContentNodeAttributes,
  VariableContentNodeAttributes,
  ClassNodeAttributes,
  BaseNode {
  'kind'?: KindType
  'srclang'?: CDATA
}

/**
 * Check if the given fields of the `media-track` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaTrackField = (field: string, value: BasicValue): boolean => {
  if (isValidLocalizationField(field, value)
    || isValidReferenceContentField(field, value)
    || isValidVariableContentField(field,value)
    || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'kind': return isOrUndefined(isKindType, value);
    case 'srclang': return isOrUndefined(isCDATA, value);
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
    get 'kind'(): KindType {
      return this.readProp<KindType>('kind');
    }
    set 'kind'(value: KindType) {
      this.writeProp<KindType>('kind', value);
    }
    get 'srclang'(): CDATA {
      return this.readProp<CDATA>('srclang');
    }
    set 'srclang'(value: CDATA) {
      this.writeProp<CDATA>('srclang', value);
    }
  },
    makeLocalization,
    makeReferenceContent,
    makeVariableContent,
    makeClass
  );
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
 * @param fields - A List of valid attributes @see {@link MediaTrackFields}
 * @param childNodes - An array containing all valid child node names: `text`
 */
@makeComponent(makeMediaTrack, 'media-track', isValidMediaTrackField, MediaTrackFields, ['text'])
export class MediaTrackNode extends AbstractBaseNode implements MediaTrackNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA
  'format'?: CDATA
  'scope'?: ReferenceContentScope

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // MediaTrackNodeAttributes
  'kind'?: KindType
  'srclang'?: CDATA
}