import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseFields, ReuseNode, isValidReuseField, makeReuse } from "./reuse";
import { BasicValue } from "../classes";

/**
 * Define all allowed `dd` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class`,
 */
export const DdFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DdNode defines the attribute types for `dd`
 */
export interface DdNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `dd` node are valid and matches this list:
 * See {@link DdFields}
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidDdField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `dd` node is valid
 * @remarks
 * Assert that the node is an object and has valid attributes
 * 
 * @param value - The `dd` node to test
 * @returns Boolean
 */
export const isDdNode = (value?: {}): value is DdNode =>
  typeof value === 'object' && areFieldsValid(DdFields, value, isValidDdField);

/**
 * Construct an `dd` node with all available attributes
 * @param constructor - The constructor
 * @returns An `dd` node
 */
export function makeDd<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an dd node
 * @decorator `@makeComponent`
 * @param makeDd - The `Dd` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDdField - A boolean value, if the field is valid or not
 * @param DdFields - An array containing all valid field names See {@link DdFields}
 * @param childNodes - An array containing all valid child node names: `%list-blocks*`
 * @returns An `dd` node
 */
@makeComponent(makeDd, 'dd', isValidDdField, DdFields, ['%list-blocks*'])
export class DdNode extends BaseNode {
  static domNodeName = 'dd';
}
