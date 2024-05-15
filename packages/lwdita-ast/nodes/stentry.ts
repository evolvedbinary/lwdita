import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, NMTOKEN } from "../ast-classes";

/**
 * Define all allowed `stentry` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `id`, `conref`, `class`, `outputclass`
 */
export const StEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

/**
 * Interface StEntryNodeAttributes defines the attribute types for `stentry`:
 * `CDATA`, `NMTOKEN`
 */
export interface StEntryNodeAttributes extends FiltersNodeAttributes, LocalizationNodeAttributes, ReuseNodeAttributes, ClassNodeAttributes { }

/**
 * Check if the given attributes of the `stentry` node are valid
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
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
export const isStEntryNode = (value?: unknown): value is StEntryNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(StEntryFields, value as Record<string, BasicValue>, isValidStEntryField);

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
 * Create a `stentry` node (simple table entry / "table-cell") and map the `stentry` node with the LwDita tag name `td`
 *
 * @privateRemarks
 * TODO: Implement td/th
 *
 * @decorator `@makeComponent`
 * @param makeStEntry - The `stentry` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidStEntryField - A boolean value, if the field is valid or not
 * @param fields - A List of valid attributes @See {@link StEntryFields}
 * @param childNodes - An Array of allowed child node `%simple-blocks*` (`p`, `ul`, `ol`, `dl`, `pre`, `audio`, `video`, `fn`, `note`, `data`)
 */
@makeComponent(makeStEntry, 'stentry', isValidStEntryField, StEntryFields, ['%simple-blocks*'])
export class StEntryNode extends BaseNode implements StEntryNodeAttributes {
  static domNodeName = 'td'

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