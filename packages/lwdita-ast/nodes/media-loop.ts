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
import { BasicValue, areFieldsValid } from "../ast-utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNodeAttributes, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `media-loop` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const MediaLoopFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaLoopNode defines the attribute types for `media-loop`:
 * `CDATA`, `T`
 */
export interface MediaLoopNodeAttributes extends LocalizationNodeAttributes, FieldNodeAttributes<boolean>, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `media-loop` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaLoopField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-loop` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-loop` node to test
 * @returns Boolean
 */
export const isMediaLoopNode = (value?: unknown): value is MediaLoopNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MediaLoopFields, value as Record<string, BasicValue>, isValidMediaLoopField);

/**
 * Construct a `media-loop` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-loop` node
 */
export function makeMediaLoop<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-loop` node
 *
 * @remarks
 * Loop automatically returns to the start of audio or video content upon reaching its end.
 *
 * @decorator `@makeComponent`
 * @param makeMediaLoop - The `media-loop` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaLoopField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link MediaLoopFields}
 */
@makeComponent(makeMediaLoop, 'media-loop', isValidMediaLoopField, MediaLoopFields)
export class MediaLoopNode extends AbstractBaseNode implements MediaLoopNodeAttributes {

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