import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { SizeFields, isValidSizeField, makeSize, SizeNodeAttributes } from "./size";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `video` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`, `width`, `height`
 */
export const VideoFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, ...SizeFields];

/**
 * The interface `VideoNodeAttributes` defines all attribute types for `video`:
 * `CDATA`, `NMTOKEN`
 */
export interface VideoNodeAttributes extends SizeNodeAttributes, FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `video` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidVideoField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)
  || isValidSizeField(field, value);

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
export function makeVideo<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass, makeSize);
}

/**
 * Create a video node
 *
 * @decorator `@makeComponent`
 * @param makeVideo - The `video` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidVideoField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link VideoFields}
 * @param childNodes - An Array of allowed child nodes: desc?', `video-poster?`, `media-controls?`, `media-autoplay?`, `media-loop?`, `media-muted?`, `media-source*`, `media-track*`
 */
@makeComponent(makeVideo, 'video', isValidVideoField, VideoFields, ['desc?', 'video-poster?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*'])
export class VideoNode extends AbstractBaseNode implements VideoNodeAttributes {

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // ReuseNodeAttributes
  'id'?: NMTOKEN
  'conref'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA

  // SizeNodeAttributes
  'width'?: NMTOKEN
  'height'?: NMTOKEN
}