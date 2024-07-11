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
import { areFieldsValid } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";
import { CDATA, ReferenceContentScope } from "../ast-classes";
import { isValidVariableContentField, makeVariableContent, VariableContentFields, VariableContentNodeAttributes } from "./variable-content";
import { isValidReferenceContentField, makeReferenceContent, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";

/**
 * Define all allowed `media-source` attributes:
 * `dir`, `xml:lang`, `translate`, `href`, `format`, `scope`, `keyref`, `class`, `outputclass`
 */
export const MediaSourceFields = [
  ...LocalizationFields,
  ...ReferenceContentFields,
  ...VariableContentFields,
  ...ClassFields
];

/**
 * Interface MediaSourceNodeAttributes defines the attribute types for `media-source`
 */
export interface MediaSourceNodeAttributes extends
  LocalizationNodeAttributes,
  ReferenceContentNodeAttributes,
  VariableContentNodeAttributes,
  ClassNodeAttributes,
  BaseNode { }

/**
 * Check if the given attributes of the `media-source` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaSourceField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-source` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-source` node to test
 * @returns Boolean
 */
export const isMediaSourceNode = (value?: unknown): value is MediaSourceNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MediaSourceFields, value as Record<string, BasicValue>, isValidMediaSourceField);

/**
 * Construct a `media-source` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-source` node
 */
export function makeMediaSource<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeReferenceContent, makeVariableContent, makeClass);
}

/**
 * Create a `media-source` node and map the `media-source` node with the LwDita tag name `source`
 *
 * @decorator `@makeComponent`
 * @param makeMediaSource - The `media-source` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaSourceField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaSourceFields}
 */
@makeComponent(makeMediaSource, 'media-source', isValidMediaSourceField, MediaSourceFields)
export class MediaSourceNode extends AbstractBaseNode implements MediaSourceNodeAttributes {
  static domNodeName = 'source';

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA
  'format'?: CDATA
  'scope'?: ReferenceContentScope

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}