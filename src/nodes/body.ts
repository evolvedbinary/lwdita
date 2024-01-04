import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";
/**
 * Define all allowed `body` fields:
 * `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 */
export const BodyFields = [...LocalizationFields, ...ClassFields];

/**
 * Interface BodyNode defines the attribute types for `body`:
 */
export interface BodyNode extends LocalizationNode, ClassNode { }

/**
 * Check if the given fields of the `body` node are valid and matches this list:
 * `dir`, `xml:lang`, `translate`, `outputclass`, `class`
 * 
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export const isValidBodyField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `body` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `body` node to test
 * @returns Boolean
 */
export const isBodyNode = (value?: {}): value is BodyNode =>
  typeof value === 'object' && areFieldsValid(BodyFields, value, isValidBodyField);

/**
 * Construct an `body` node with all available attributes
 * 
 * @param constructor - The constructor
 * @returns An `body` node
 * */
export function makeBody<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeClass);
}

/**
 * Create an body node (link) and map the `body` node with the HTML tag name `div`
 * 
 * @decorator `@makeComponent`
 * @param makeBody - The `Body` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidBodyField - A boolean value, if the field is valid or not
 * @param BodyFields - An array containing all valid field names
 * @param childNodes - An array containing all valid child node names: `%list-blocks*`, `section*`, `fn*`
 */
@makeComponent(makeBody, 'body', isValidBodyField, BodyFields, ['%list-blocks*', 'section*', 'fn*'])
export class BodyNode extends BaseNode {
  /** @override */ //TODO what does this mean
  static domNodeName = 'div';
}
