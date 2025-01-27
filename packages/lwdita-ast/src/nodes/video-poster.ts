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
import { CDATA, NMTOKEN, ReferenceContentScope } from "../ast-classes";
import { FiltersFields, FiltersNodeAttributes, isValidFiltersField, makeFilters } from "./filters";
import { isValidReferenceContentField, makeReferenceContent, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";
import { isValidReuseField, makeReuse, ReuseFields, ReuseNodeAttributes } from "./reuse";
import { isValidVariableContentField, makeVariableContent, VariableContentFields, VariableContentNodeAttributes } from "./variable-content";

/**
 * Define all allowed `video-poster` attributes:
 * `dir`, `xml:lang`, `translate`, `props`,  `href`,
 * `format`, `scope`, `id`, `conref`, `keyref`, `outputclass`, `class`
 */
export const VideoPosterFields = [
  ...LocalizationFields,
  ...FiltersFields,
  ...ReferenceContentFields,
  ...ReuseFields,
  ...VariableContentFields,
  ...ClassFields
];

/**
 * The interface `VideoPosterNodeAttributes` defines all attribute types for `video-poster`:
 */
export interface VideoPosterNodeAttributes extends
  LocalizationNodeAttributes,
  FiltersNodeAttributes,
  ReferenceContentNodeAttributes,
  ReuseNodeAttributes,
  VariableContentNodeAttributes,
  ClassNodeAttributes,
  BaseNode { }

/**
 * Check if the given attributes of the `video-poster` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidVideoPosterField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidReuseField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `video-poster` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `video-poster` node to test
 * @returns Boolean
 */
export const isVideoPosterNode = (value?: unknown): value is VideoPosterNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(VideoPosterFields, value as Record<string, BasicValue>, isValidVideoPosterField);

/**
 * Construct a `video-poster` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `video-poster` node
 */
export function makeVideoPoster<T extends Constructor>(constructor: T): T {
  return makeAll(
    constructor,
    makeLocalization,
    makeFilters,
    makeReferenceContent,
    makeReuse,
    makeVariableContent,
    makeClass
  );
}

/**
 * Create a video-poster node
 *
 * @decorator `@makeComponent`
 * @param makeVideoPoster - The `video-poster` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidVideoPosterField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @see {@link VideoPosterFields}
 */
@makeComponent(makeVideoPoster, 'video-poster', isValidVideoPosterField, VideoPosterFields)
export class VideoPosterNode extends AbstractBaseNode implements VideoPosterNodeAttributes {
  static label = "Video poster";

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

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA
}