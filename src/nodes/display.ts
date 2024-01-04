import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode } from "./base";
import { DisplayScale, DisplayFrame, DisplayExpanse, BasicValue, isDisplayScale, isDisplayFrame, isDisplayExpanse } from "../classes";

/**
 * Define all allowed `display` fields: `scale`, `frame`, `expanse`
 */
export const DisplayFields = ['scale', 'frame', 'expanse'];
/**
 * Interface DisplayNode defines the attribute types for `display`
 */
export interface DisplayNode {
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;
}

/**
 * Check if the given fields of the `Display` node are valid and matches this list:
 * See {@link DisplayFields}
 * @param field - A string containing the name of the field
 * @param value - A BasicValue-typed value containing the field value
 * @returns Boolean
 */
export function isValidDisplayField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'scale': return isOrUndefined(isDisplayScale, value);
    case 'frame': return isOrUndefined(isDisplayFrame, value);
    case 'expanse': return isOrUndefined(isDisplayExpanse, value);
    default: return false;
  }
}

/**
 * Check if the `Display` node is valid
 * @remarks
 * Assert that the node is an object and has valid attributes
 * 
 * @param value - The `Display` node to test
 * @returns Boolean
 */
export const isDisplayNode = (value?: {}): value is DisplayNode =>
  typeof value === 'object' && areFieldsValid(DisplayFields, value, isValidDisplayField);

//TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeDisplay<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements DisplayNode {
    get 'scale'(): DisplayScale | undefined {
      return this.readProp<DisplayScale | undefined>('scale');
    }
    set 'scale'(value: DisplayScale | undefined) {
      this.writeProp<DisplayScale | undefined>('scale', value);
    }
    get 'frame'(): DisplayFrame | undefined {
      return this.readProp<DisplayFrame | undefined>('frame');
    }
    set 'frame'(value: DisplayFrame | undefined) {
      this.writeProp<DisplayFrame | undefined>('frame', value);
    }
    get 'expanse'(): DisplayExpanse | undefined {
      return this.readProp<DisplayExpanse | undefined>('expanse');
    }
    set 'expanse'(value: DisplayExpanse | undefined) {
      this.writeProp<DisplayExpanse | undefined>('expanse', value);
    }
  }
}
