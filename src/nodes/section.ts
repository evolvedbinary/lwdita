import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

/**
 * Define all allowed `section` fields:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const SectionFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface SectionNode defines the attribute types for `section`:
 * `CDATA`, `NMTOKEN`
 */
export interface SectionNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `section` node are valid
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidSectionField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `section` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `section` node to test
 * @returns Boolean
 */
export const isSectionNode = (value?: {}): value is SectionNode =>
  typeof value === 'object' && areFieldsValid(SectionFields, value, isValidSectionField);

/**
 * Construct a `section` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `section` node
 */
export function makeSection<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

/**
 * Create a `section` node and map the `section` node with the HTML tag name `section`
 *
 * @decorator `@makeComponent`
 * @param makeSection - The `section` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSectionField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child nodes: `title?`, `%all-blocks*`
 */
@makeComponent(makeSection, 'section', isValidSectionField, SectionFields, ['title?', '%all-blocks*'])
export class SectionNode extends BaseNode {
  /** @override */
  static domNodeName = 'section';
}
