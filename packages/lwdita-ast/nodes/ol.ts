import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `ol` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const OlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface OlNodeAttributes defines the attribute type for `ol`:
 * `CDATA`, `NMTOKEN`
 */
export interface OlNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `ol` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidOlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `ol` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `ol` node to test
 * @returns Boolean
 */
export const isOlNode = (value?: unknown): value is OlNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(OlFields, value as Record<string, BasicValue>, isValidOlField);

/**
 * Construct an `ol` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `ol` node
 */
export function makeOl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an `ol` (ordered list) node and map the `ol` node with the LwDita tag name `ol`
 *
 * @decorator `@makeComponent`
 * @param makeOl - The `ol` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidOlField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link OlFields}
 * @param childNodes - An Array of allowed child nodes: `li+`
 */
@makeComponent(makeOl, 'ol', isValidOlField, OlFields, ['li+'])
export class OlNode extends BaseNode implements OlNodeAttributes {
  static domNodeName = 'ol';

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