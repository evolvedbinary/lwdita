import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `strow` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const StRowFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StRowNodeAttributes defines the attribute types for `strow`:
 * `CDATA`, `NMTOKEN`
 */
export interface StRowNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `strow` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidStRowField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `strow` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `strow` node to test
 * @returns Boolean
 */
export const isStRowNode = (value?: unknown): value is StRowNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(StRowFields, value as Record<string, BasicValue>, isValidStRowField);

/**
 * Construct a `strow` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `strow` node
 */
export function makeStRow<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `strow` node (simple table row) and map the `strow` node with the LwDita tag name `tr`
 *
 * @decorator `@makeComponent`
 * @param makeStRow - The `strow` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidStRowField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link StRowFields}
 * @param childNodes - An Array of allowed child node `stentry*`
 */
@makeComponent(makeStRow, 'strow', isValidStRowField, StRowFields, ['stentry*'])
export class StRowNode extends AbstractBaseNode implements StRowNodeAttributes {
  static domNodeName = 'tr'

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