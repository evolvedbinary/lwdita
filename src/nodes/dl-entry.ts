import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseNode, isValidReuseField, ReuseFields, makeReuse } from "./reuse";
import { BasicValue } from "../classes";

/**
 * Define all allowed `dlentry` fields: `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `outputclass`, `class` 
 */
export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface DlEntryNode defines the attribute types for `dlentry`
 */
export interface DlEntryNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `dlentry` node are valid and matches this list:
 * @See {@link DlEntryFields}
 * 
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidDlEntryField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `display` node is valid
 * 
 * @remarks
 * Assert that the node is an object and has valid attributes
 * 
 * @param value - The `display` node to test
 * @returns Boolean
 */
export const isDlEntryNode = (value?: {}): value is DlEntryNode =>
  typeof value === 'object' && areFieldsValid(DlEntryFields, value, isValidDlEntryField);

/**
 * Construct an `dlentry` node with all available attributes
 * 
 * @param constructor - The constructor
 * @returns An `dlentry` node
 */
export function makeDlEntry<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create an dlentry node
 * 
 * @decorator `@makeComponent`
 * @param makeDlEntry - The `DlEntry` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidDlEntryField - A boolean value, if the field is valid or not
 * @param DlEntryFields - An array containing all valid field names See {@link DlEntryFields}
 * @param childNodes - An array containing all valid child node names: `%common-inline*`
 * @returns An `dlentry` node
 */
@makeComponent(makeDlEntry, 'dlentry', isValidDlEntryField, DlEntryFields, ['dt', 'dd'])
export class DlEntryNode extends BaseNode {
  // TODO: to be removed, make changes to 'dl'
  static domNodeName = '';
}
