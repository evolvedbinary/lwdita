import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `dl` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DlNodeAttributes defines the attribute types for `dl`
 */
export interface DlNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `dl` node are valid and match this list:
 * @See {@link DlFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dl` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `dl` node to test
 * @returns Boolean
 */
export const isDlNode = (value?: unknown): value is DlNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DlFields, value as Record<string, BasicValue>, isValidDlField);

/**
 * Construct a `dl` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dl` node
 */
export function makeDl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dl` node
 *
 * @decorator `@makeComponent`
 * @param makeDl - The `dl` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDlField - A boolean value, if the attribute is valid or not
 * @param DlFields - An array containing all valid attribute names @See {@link DlFields}
 * @param childNodes - An array containing all valid child node names: `dlentry+`
 * @returns A `dl` node
 */
@makeComponent(makeDl, 'dl', isValidDlField, DlFields, ['dlentry+'])
export class DlNode extends BaseNode implements DlNodeAttributes {
  static domNodeName = 'dl';

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