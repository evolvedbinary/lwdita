import { isOrUndefined, areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { FiltersAddsNodeAttributes, FiltersAddsFields } from "./filters-adds";
import { AbstractBaseNode } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, isCDATA } from "../ast-classes";


/**
 * FiltersFields: `props`
 */
export const FiltersFields = [...FiltersAddsFields, 'props'];

/**
 * FiltersNode: `props`
 */
export interface FiltersNodeAttributes extends FiltersAddsNodeAttributes {
  'props'?: CDATA;
}

/**
 * Check if the given fields of the `filter` node are valid and matches this list:
 * @See {@link FiltersFields}
 *
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidFiltersField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'props': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `filter` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `filter` node to test
 * @returns Boolean
 */
export const isFiltersNode = (value?: unknown): value is FiltersNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(FiltersFields, value as Record<string, BasicValue>, isValidFiltersField);

/**
 * Create a `filter` node with an `props` attribute
 *
 * @param constructor - The constructor
 * @returns The `filter` node with an `props` attribute and their values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFilters<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements FiltersNodeAttributes {
    get 'props'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('props');
    }
    set 'props'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('props', value);
    }
  }
}