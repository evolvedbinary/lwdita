import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode, Constructor } from "./base";
import { CDATA, BasicValue, isCDATA } from "../classes";

/**
 * FieldFields: `name`, `value`
 */
export const FieldFields = ['name', 'value'];
export interface FieldNode<T = CDATA> {
  'name'?: CDATA;
  'value'?: T;
}

/**
 * Check if the given fields of the `field` node are valid and matches this list:
 * @See {@link FieldFields}
 * 
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
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

export const isValidCDATAFieldField = isValidFieldField();
export const makeCDATAField = <T extends Constructor>(constructor: T): T => makeField<CDATA, T>(constructor);

export type BooleanFieldNode = FieldNode<boolean>;
export const isValidBooleanFieldField = isValidFieldField(val => typeof val === 'boolean');
export const makeBooleanField = <T extends Constructor>(constructor: T): T => makeField<boolean, T>(constructor);
