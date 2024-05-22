import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseFields, ReuseNodeAttributes, isValidReuseField, makeReuse } from "./reuse";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `dd` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DdFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DdNodeAttributes defines the attribute types for `dd`
 */
export interface DdNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given attributes of the `dd` node are valid and match this list:
 * @See {@link DdFields}
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidDdField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dd` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `dd` node to test
 * @returns Boolean
 */
export const isDdNode = (value?: unknown): value is DdNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(DdFields, value as Record<string, BasicValue>, isValidDdField);

/**
 * Construct a `dd` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `dd` node
 */
export function makeDd<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `dd` node
 *
 * @decorator `@makeComponent`
 * @param makeDd - The `dd` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDdField - A boolean value, if the attribute is valid or not
 * @param DdFields - An array containing all valid attribute names, @see {@link DdFields}
 * @param childNodes - An array containing all valid child node names: `%list-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `simpletable`, `fig`, `note`, `data`)
 * @returns A `dd` node
 */
@makeComponent(makeDd, 'dd', isValidDdField, DdFields, ['%list-blocks*'])
export class DdNode extends AbstractBaseNode implements DdNodeAttributes {
  static domNodeName = 'dd';

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