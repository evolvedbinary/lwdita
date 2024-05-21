import { isOrUndefined, areFieldsValid } from "@evolvedbinary/lwdita-xdita/utils";
import { AbstractBaseNode } from "./base";
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { CDATA, isReferenceContentScope, ReferenceContentScope, isCDATA } from "../ast-classes";


export const ReferenceContentFields = ['href', 'format', 'scope'];
export interface ReferenceContentNodeAttributes {
  'href'?: CDATA;
  'format'?: CDATA;
  'scope'?: ReferenceContentScope;
}

export function isValidReferenceContentField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'href': return isOrUndefined(isCDATA, value);
    case 'format': return isOrUndefined(isCDATA, value);
    case 'scope': return isOrUndefined(isReferenceContentScope, value);
    default: return false;
  }
}

export const isReferenceContentNode = (value?: unknown): value is ReferenceContentNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(ReferenceContentFields, value as Record<string, BasicValue>, isValidReferenceContentField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeReferenceContent<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T {
  return class extends constructor implements ReferenceContentNodeAttributes {
    get 'href'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('dir');
    }
    set 'href'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('dir', value);
    }
    get 'format'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('xml:lang');
    }
    set 'format'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('xml:lang', value);
    }
    get 'scope'(): ReferenceContentScope | undefined {
      return this.readProp<ReferenceContentScope | undefined>('translate');
    }
    set 'scope'(value: ReferenceContentScope | undefined) {
      this.writeProp<ReferenceContentScope | undefined>('translate', value);
    }
  }
}
