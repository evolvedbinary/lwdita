import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

/**
 * Define all allowed `stentry` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const StEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StEntryNode defines the attribute types for `stentry`:
 * `CDATA`, `NMTOKEN`
 */
export interface StEntryNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `stentry` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidStEntryField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `stentry` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `stentry` node to test
 * @returns Boolean
 */
export const isStEntryNode = (value?: {}): value is StEntryNode =>
  typeof value === 'object' && areFieldsValid(StEntryFields, value, isValidStEntryField);

/**
 * Construct a `stentry` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `stentry` node
 */
export function makeStEntry<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `stentry` node (simple table entry / "table-cell") and map the `stentry` node with the HTML tag name `td`
 *
 * @privateRemarks
 * TODO: Implement td/th
 *
 * @decorator `@makeComponent`
 * @param makeStEntry - The `stentry` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidStEntryField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child node `%simple-blocks*`
 */
@makeComponent(makeStEntry, 'stentry', isValidStEntryField, StEntryFields, ['%simple-blocks*'])
export class StEntryNode extends BaseNode {
  /** @override */
  static domNodeName = 'td';
}
