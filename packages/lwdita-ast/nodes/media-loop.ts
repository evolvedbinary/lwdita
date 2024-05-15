import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNodeAttributes, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
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
export interface MediaLoopNodeAttributes extends LocalizationNodeAttributes, FieldNodeAttributes<boolean>, ClassNodeAttributes { }

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
export class MediaLoopNode extends BaseNode implements MediaLoopNodeAttributes {

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