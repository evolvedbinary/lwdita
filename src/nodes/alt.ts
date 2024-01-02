import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

// define all of the fields that are valid for the alt node
// There's no custom fields
export const AltFields = [...LocalizationFields, ...FiltersFields, ...VariableContentFields, ...ClassFields];

// define the type of a valid alt node
export interface AltNode extends LocalizationNode, FiltersNode, VariableContentNode, ClassNode { }

// define a function that checks if a field is valid for the alt node
export const isValidAltField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

/**
 * Test if Alt Node is valid
 * @param value - Alt Node to test
 * @returns Boolean
 */
export const isAltNode = (value?: {}): value is AltNode =>
  typeof value === 'object' && areFieldsValid(AltFields, value, isValidAltField);

/**
 * Create an Alt Node 
 * @param constructor 
 * @returns Alt Node
 */
export function makeAlt<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

/**
 * Create an Alt Node
 * @param AltNode - Alt Node Constructor
 * @param name - Node name
 * @param isValidField - Function to test if a field is valid
 * @param fields - List of valid fields
 * @param content - allowed child types
 */
@makeComponent(makeAlt, 'alt', isValidAltField, AltFields, [['text*', '%ph*', '%data*']]) // TODO what is ph and data and does text* mean it can have text?
export class AltNode extends BaseNode { }
