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

import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, isOrUndefined } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll } from "./base";
import { SizeFields, isValidSizeField, makeSize, SizeNodeAttributes } from "./size";
import { BasicValue } from "../classes";
import { BooleanString, CDATA, isBooleanString, isNMTOKEN, NMTOKEN, ReferenceContentScope } from "../ast-classes";
import { isValidReferenceContentField, makeReferenceContent, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";

/**
 * Define all allowed `video` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`,
 * `outputclass`, `class`, `width`, `height`, `href`,
 * `format`, `scope`, `autoplay`, `controls`, `loop`, `muted`, `tabindex`
 */
export const VideoFields = [
  ...FiltersFields,
  ...LocalizationFields,
  ...ReferenceContentFields,
  ...ReuseFields,
  ...ClassFields,
  ...SizeFields,
  'autoplay',
  'controls',
  'loop',
  'muted',
  'tabindex'
];

/**
 * The interface `VideoNodeAttributes` defines all attribute types for `video`:
 * `CDATA`, `NMTOKEN`
 */
export interface VideoNodeAttributes extends
  FiltersNodeAttributes,
  LocalizationNodeAttributes,
  ReferenceContentNodeAttributes,
  ReuseNodeAttributes,
  ClassNodeAttributes,
  SizeNodeAttributes,
  BaseNode {
  'autoplay'?: BooleanString
  'controls'?: BooleanString
  'loop'?: BooleanString
  'muted'?: BooleanString
  'tabindex'?: NMTOKEN
}

/**
 * Check if the given attributes of the `video` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidVideoField(field: string, value: BasicValue): boolean {
  if (isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)
  || isValidSizeField(field, value)
  ) {
    return true;
  }
  switch(field) {
    case 'autoplay': return isOrUndefined(isBooleanString, value);
    case 'controls': return isOrUndefined(isBooleanString, value);
    case 'loop': return isOrUndefined(isBooleanString, value);
    case 'muted': return isOrUndefined(isBooleanString, value);
    case 'tabindex': return isOrUndefined(isNMTOKEN, value);
    default: return false;
  }
}

/**
 * Check if the `video` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `video` node to test
 * @returns Boolean
 */
export const isVideoNode = (value?: unknown): value is VideoNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(VideoFields, value as Record<string, BasicValue>, isValidVideoField);

/**
 * Construct a `video` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `video` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeVideo<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'autoplay'(): BooleanString {
      return this.readProp<BooleanString>('autoplay');
    }
    set 'autoplay'(value: BooleanString) {
      this.writeProp<BooleanString>('autoplay', value);
    }
    get 'controls'(): BooleanString {
      return this.readProp<BooleanString>('controls');
    }
    set 'controls'(value: BooleanString) {
      this.writeProp<BooleanString>('controls', value);
    }
    get 'loop'(): BooleanString {
      return this.readProp<BooleanString>('loop');
    }
    set 'loop'(value: BooleanString) {
      this.writeProp<BooleanString>('loop', value);
    }
    get 'muted'(): BooleanString {
      return this.readProp<BooleanString>('muted');
    }
    set 'muted'(value: BooleanString) {
      this.writeProp<BooleanString>('muted', value);
    }
    get 'tabindex'(): NMTOKEN {
      return this.readProp<NMTOKEN>('tabindex');
    }
    set 'tabindex'(value: NMTOKEN) {
      this.writeProp<NMTOKEN>('tabindex', value);
    }
  },
    makeLocalization,
    makeFilters,
    makeReferenceContent,
    makeReuse,
    makeClass,
    makeSize
  );
}

/**
 * Create a video node
 *
 * @decorator `@makeComponent`
 * @param makeVideo - The `video` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidVideoField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link VideoFields}
 * @param childNodes - An Array of allowed child nodes: `desc?`, `fallback`, `video-poster?`, `media-source*`, `media-track*`
 */
@makeComponent(makeVideo, 'video', isValidVideoField, VideoFields, ['desc?', 'fallback?', 'video-poster?', 'media-source*', 'media-track*'])
export class VideoNode extends AbstractBaseNode implements VideoNodeAttributes {

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA
  'format'?: CDATA
  'scope'?: ReferenceContentScope

  // ReuseNodeAttributes
  'id'?: NMTOKEN
  'conref'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // SizeNodeAttributes
  'width'?: NMTOKEN
  'height'?: NMTOKEN

  // VideoNodeAttributes
  'autoplay'?: BooleanString
  'controls'?: BooleanString
  'loop'?: BooleanString
  'muted'?: BooleanString
  'tabindex'?: NMTOKEN
}