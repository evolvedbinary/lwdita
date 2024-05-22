import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNodeAttributes, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `video-poster` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const VideoPosterFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * The interface `VideoPosterNodeAttributes` defines all attribute types for `video-poster`:
 * `CDATA`, `T`
 */
export interface VideoPosterNodeAttributes extends LocalizationNodeAttributes, FieldNodeAttributes<boolean>, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `video-poster` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidVideoPosterField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
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
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a video-poster node
 *
 * @decorator `@makeComponent`
 * @param makeVideoPoster - The `video-poster` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidVideoPosterField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link VideoPosterFields}
 */
@makeComponent(makeVideoPoster, 'video-poster', isValidVideoPosterField, VideoPosterFields)
export class VideoPosterNode extends AbstractBaseNode implements VideoPosterNodeAttributes {
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