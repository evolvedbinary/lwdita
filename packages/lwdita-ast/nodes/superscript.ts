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
 * Define all allowed `superscript` attributes:
 * `dir`, `xml:lang`, `translate`, `keyref`, `class`, `outputclass`
 */
export const SuperscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

/**
 * Interface SuperscriptNodeAttributes defines the attribute types for `superscript`:
 * `CDATA`, `NMTOKEN`
 */
export interface SuperscriptNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `superscript` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export const isValidSuperscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

/**
 * Check if the `superscript` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `superscript` node to test
 * @returns Boolean
 */
export const isSuperscriptNode = (value?: unknown): value is SuperscriptNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(SuperscriptFields, value as Record<string, BasicValue>, isValidSuperscriptField);

/**
 * Construct a `superscript` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `superscript` node
 */
export function makeSuperscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

/**
 * Create a `superscript` node and map the `superscript` node with the LwDita tag name `sup`
 *
 * @privateRemarks
 * TODO: Implement "+ topic/ph hi-d/sup "
 *
 * @decorator `@makeComponent`
 * @param makeSuperscript - The `superscript` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidSuperscriptField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes @see {@link SuperscriptFields}
 * @param childNodes - An Array of allowed child nodes: `%all-inline*` (`text`, `ph`, `b`, `i`, `u`, `sub`, `sup`, `image`, `xref`, `data`)
 */
@makeComponent(makeSuperscript, 'sup', isValidSuperscriptField, SuperscriptFields, ['%all-inline*'])
export class SuperscriptNode extends BaseNode implements SuperscriptNodeAttributes {
  static domNodeName = 'sup'

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