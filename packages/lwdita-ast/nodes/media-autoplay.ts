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
import { FieldFields, FieldNodeAttributes, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `media-autoplay` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const MediaAutoplayFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaAutoplayNodeAttributes defines the attribute types for `media-autoplay`:
 * `CDATA`, `T`
 */
export interface MediaAutoplayNodeAttributes extends LocalizationNodeAttributes, FieldNodeAttributes<boolean>, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `media-autoplay` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaAutoplayField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-autoplay` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-autoplay` node to test
 * @returns Boolean
 */
export const isMediaAutoplayNode = (value?: unknown): value is MediaAutoplayNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MediaAutoplayFields, value as Record<string, BasicValue>, isValidMediaAutoplayField);

/**
 * Construct a `media-autoplay` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-autoplay` node
 */
export function makeMediaAutoplay<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-autoplay` node
 *
 * @remarks
 * Autoplay determines if audio or video content should automatically begin to play.
 *
 * @decorator `@makeComponent`
 * @param makeMediaAutoplay - The `media-autoplay` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaAutoplayField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaAutoplayFields}
 */
@makeComponent(makeMediaAutoplay, 'media-autoplay', isValidMediaAutoplayField, MediaAutoplayFields)
export class MediaAutoplayNode extends AbstractBaseNode implements MediaAutoplayNodeAttributes {

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