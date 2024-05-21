import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { VariableContentNodeAttributes, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA } from "../ast-classes";

/**
 * Define all allowed `alt` (cross-reference) fields:
 * `keyref`, `outputclass`, `class`, `dir`, `xml:lang`, `translate`, `props`
 */
export const AltFields = [...LocalizationFields, ...FiltersFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface `AltNodeAttributes` defines the attribute types for `alt`:
 */
export interface AltNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, VariableContentNodeAttributes, ClassNodeAttributes, BaseNode { }

/**
 * Check if the given fields of the `alt` node are valid and matches this list:
 * `keyref`, `outputclass`, `class`, `dir`, `xml:lang`, `translate`, `props`
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidAltField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `alt` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `alt` node to test
 * @returns Boolean
 */
export const isAltNode = (value?: unknown): value is AltNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(AltFields, value as Record<string, BasicValue>, isValidAltField);

/**
 * Construct an `alt` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `alt` node
 */
export function makeAlt<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

/**
 * Create an `alt` node
 *
 * @decorator `@makeComponent`
 * @param makeAlt - The `Alt` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidAltField - A boolean value, if the field is valid or not
 * @param fields - A List of valid fields
 * @param childNodes - An Array of allowed child node `text*`, `%ph*`, `%data*`
 */
@makeComponent(makeAlt, 'alt', isValidAltField, AltFields, [['text*', '%ph*', '%data*']])
export class AltNode extends AbstractBaseNode implements AltNodeAttributes {

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // VariableContentNodeAttributes
  'keyref'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA
}