import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, AbstractBaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNodeAttributes, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNodeAttributes, isValidClassField, makeClass } from "./class";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `media-controls` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 * Custom attributes are `name`, `value`
 */
export const MediaControlsFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

/**
 * Interface MediaControlsNodeAttributes defines the attribute types for `media-controls`:
 * `CDATA`, `T`
 */
export interface MediaControlsNodeAttributes extends LocalizationNodeAttributes, FieldNodeAttributes<boolean>, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `media-controls` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidMediaControlsField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `media-controls` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `media-controls` node to test
 * @returns Boolean
 */
export const isMediaControlsNode = (value?: unknown): value is MediaControlsNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(MediaControlsFields, value as Record<string, BasicValue>, isValidMediaControlsField);

/**
 * Construct a `media-controls` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `media-controls` node
 */
export function makeMediaControls<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

/**
 * Create a `media-controls` node
 *
 * @remarks
 * Controls enable user interfaces for video playback and volume in Web-aimed transformations.
 *
 * @decorator `@makeComponent`
 * @param makeMediaControls - The `media-controls` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidMediaControlsField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link MediaControlsFields}
 */
@makeComponent(makeMediaControls, 'media-controls', isValidMediaControlsField, MediaControlsFields)
export class MediaControlsNode extends AbstractBaseNode implements MediaControlsNodeAttributes {

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