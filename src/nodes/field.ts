import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode, Constructor } from "./base";
import { CDATA, BasicValue, isCDATA } from "../classes";

/**
 * FieldFields: `name`, `value`
 */
export const FieldFields = ['name', 'value'];

/**
 * Interface FieldNode defines the attribute types
 */
export interface FieldNode<T = CDATA> {
  'name'?: CDATA;
  'value'?: T;
}

/**
 * Check if the attributes `name`, `value` are valid.
 *
 * @See {@link FieldFields}
 *
 * @param validator - a function that takes a BasicValue and returns a boolean
 * @returns function - The return function takes two parameters `name`, `value` and returns a boolean
 */
export const isValidFieldField = (validator: (val: BasicValue) => boolean = isCDATA): (field: string, value: BasicValue) => boolean =>
  (field: string, value: BasicValue): boolean => {
    switch (field) {
      case 'name': return isOrUndefined(isCDATA, value);
      case 'value': return isOrUndefined(validator, value);
      default: return false;
    }
  }

/**
 * Check if the `field` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `field` node to test
 * @returns Boolean
 */
export const isFieldNode = (value?: {}): value is FieldNode =>
  typeof value === 'object' && areFieldsValid(FieldFields, value, isValidFieldField());

/**
 * Create a `field` node
 *
 * @remarks
 * eslint-disable-next-line `@typescript-eslint/no-explicit-any`
 *
 * @param constructor - The constructor
 * @returns The `field` node
 */
export function makeField<ValueType, T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements FieldNode<ValueType> {
    get 'name'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('name');
    }
    set 'name'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('name', value);
    }
    get 'value'(): ValueType | undefined {
      return this.readProp<ValueType | undefined>('value');
    }
    set 'value'(value: ValueType | undefined) {
      this.writeProp<ValueType | undefined>('value', value);
    }
  }
}

/**
 * isValidCDATAFieldField
 *
 * Checks if the field is a CDATA
 *
 * @param field - the field to check
 * @param value - the value to check
 * @returns boolean
 */
export const isValidCDATAFieldField = isValidFieldField();

/**
 * Make a CDATA field
 *
 * a function that takes a constructor and returns calls makeField with that constructor
 * @param constructor - The contructor
 * @returns a CDATA field
 */
export const makeCDATAField = <T extends Constructor>(constructor: T): T => makeField<CDATA, T>(constructor);

/**
 * BooleanFieldNode
 */
export type BooleanFieldNode = FieldNode<boolean>;

/**
 * isValidBooleanFieldField checks if the boolean field node is valid
 * by calling isValidFieldField with a function that checks if the value is a boolean
 */
export const isValidBooleanFieldField = isValidFieldField(val => typeof val === 'boolean');

/**
 * Make a boolean field
 *
 * a function that takes a constructor and returns calls makeField with that constructor
 * @param constructor - The contructor
 * @returns A boolean field
 */
export const makeBooleanField = <T extends Constructor>(constructor: T): T => makeField<boolean, T>(constructor);
