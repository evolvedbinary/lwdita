import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, AbstractBaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `audio` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `id`, `conref`, `outputclass`, `class`
 */
export const AudioFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface AudioNode defines the attribute types for `audio`:
 */
export interface AudioNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `audio` node are valid and match this list:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `id`, `conref`, `outputclass`, `class`
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidAudioField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `audio` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `audio` node to test
 * @returns Boolean
 */
export const isAudioNode = (value?: unknown): value is AudioNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(AudioFields, value as Record<string, BasicValue>, isValidAudioField);

/**
 * Construct an `audio` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `audio` node
 * */
export function makeAudio<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an `audio` node
 *
 * @decorator `@makeComponent`
 * @param makeAudio - The `audio` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidAudioField - A boolean value, if the attribute is valid or not
 * @param AudioFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: `desc?`, `media-controls?`, `media-autoplay?`, `media-loop?`, `media-muted?`, `media-source*`, `media-track*`
 */
@makeComponent(makeAudio, 'audio', isValidAudioField, AudioFields, ['desc?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*'])
export class AudioNode extends AbstractBaseNode implements AudioNodeAttributes {

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
}