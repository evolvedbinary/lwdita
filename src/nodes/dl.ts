import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

/**
 * Define all allowed `dl` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`
 */
export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DlNode defines the attribute types for `dl`
 */
export interface DlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `dl` node are valid and matches this list:
 * @See {@link DlFields}
 * 
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
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
export const isDlNode = (value?: {}): value is DlNode =>
  typeof value === 'object' && areFieldsValid(DlFields, value, isValidDlField);

/**
 * Construct an `dl` node with all available attributes
 * 
 * @param constructor - The constructor
 * @returns An `dl` node
 */
export function makeDl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an dl node
 * 
 * @decorator `@makeComponent`
 * @param makeDl - The `Dl` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDlField - A boolean value, if the field is valid or not
 * @param DlFields - An array containing all valid field names See {@link DlFields}
 * @param childNodes - An array containing all valid child node names: `%dlentry+`
 * @returns An `dl` node
 */
@makeComponent(makeDl, 'dl', isValidDlField, DlFields, ['dlentry+'])
export class DlNode extends BaseNode {
  static domNodeName = 'dl';
}
