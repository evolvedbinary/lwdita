import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "../classes";

// TODO:  "+ topic/ph hi-d/b "
/**
 * Define all allowed `bold` fields: `dir`, `xml:lang`, `translate`, `keyref`, `outputclass`, `class`
 */
export const BoldFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface BoldNode defines the attribute types for `bold`
 */
export interface BoldNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

/**
 * Check if the given fields of the `bold` node are valid and matches this list:
 * @See {@link BoldFields}
 * 
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidBoldField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `bold` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `bold` node to test
 * @returns Boolean
 */
export const isBoldNode = (value?: {}): value is BoldNode =>
  typeof value === 'object' && areFieldsValid(BoldFields, value, isValidBoldField);

/**
 * Construct an `bold` node with all available attributes
 * 
 * @param constructor - The constructor
 * @returns An `bold` node
 * */
export function makeBold<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create an Bold node (link) and map the `Bold` node with the HTML tag name `b`
 * 
 * @decorator `@makeComponent`
 * @param makeBold - The `Bold` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidBodyField - A boolean value, if the field is valid or not
 * @param BodyFields - An array containing all valid field names
 * @param childNodes - An array containing all valid child node names: `%all-inline*`
 */
@makeComponent(makeBold, 'b', isValidBoldField, BoldFields, ['%all-inline*'])
export class BoldNode extends BaseNode {
  static domNodeName = 'b';
}
