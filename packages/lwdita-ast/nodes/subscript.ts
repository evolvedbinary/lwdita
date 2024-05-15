import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes } from "./filters";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `subscript` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const SubscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface SubscriptNodeAttributes defines the attribute types for `subscript`:
 * `CDATA`, `NMTOKEN`
 */
export interface SubscriptNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `subscript` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSubscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `subscript` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `subscript` node to test
 * @returns Boolean
 */
export const isSubscriptNode = (value?: unknown): value is SubscriptNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SubscriptFields, value as Record<string, BasicValue>, isValidSubscriptField);

/**
 * Construct a `subscript` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `subscript` node
 */
export function makeSubscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `subscript` node and map the `subscript` node with the LwDita tag name `sb`
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/sub "
 *
 * @decorator `@makeComponent`
 * @param makeSubscript - The `subscript` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSubscriptField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @See {@link SubscriptFields}
 * @param childNodes - An Array of allowed child nodes: `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeSubscript, 'sub', isValidSubscriptField, SubscriptFields, ['%all-inline*'])
export class SubscriptNode extends BaseNode implements SubscriptNodeAttributes {
  static domNodeName = 'sub'

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