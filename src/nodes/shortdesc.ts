import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

/**
 * Define all allowed `shortdesc` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `class`, `outputclass`
 */
export const ShortDescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

/**
 * Interface ShortDescNode defines the attribute types for `shortdesc`: `CDATA`
 */
export interface ShortDescNode extends FiltersNode, LocalizationNode, ClassNode { }

/**
 * Check if the given fields of the `shortdesc` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidShortDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `shortdesc` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `shortdesc` node to test
 * @returns Boolean
 */
export const isShortDescNode = (value?: {}): value is ShortDescNode =>
  typeof value === 'object' && areFieldsValid(ShortDescFields, value, isValidShortDescField);

/**
 * Construct a `shortdesc` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `shortdesc` node
 */
export function makeShortDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

/**
 * Create a `shortdesc` node (paragraph) and map the `shortdesc` node with the HTML tag name `p`
 *
 * @decorator `@makeComponent`
 * @param makeshortdesc - The `shortdesc` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSimpleTableField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child node `%all-inline*`
 */
@makeComponent(makeShortDesc, 'shortdesc', isValidShortDescField, ShortDescFields, ['%all-inline*'])
export class ShortDescNode extends BaseNode {
  /** @override */
  static domNodeName = 'p';
}
