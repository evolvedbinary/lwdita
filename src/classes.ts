import { SaxesAttributeNS } from "saxes";

/**
 * TODO
 */
export interface JDita {
  nodeName: string;
  attributes?: Record<string, BasicValue>;
  content?: string;
  children?: JDita[];
}

/**
 * TODO
 */
export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | {} | {
  [key: string]: BasicValue;
  [key: number]: BasicValue;
};

/**
 * TODO
 */
export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;

/**
 * TODO
 */
export interface XMLNode<T extends string = string> {
    name: T;
    attributes: Attributes;
}

/**
 * TODO
 */
export type ReferenceContentScope = 'local' | 'peer' | 'external';

/**
 * TODO
 * @typeParam T - TODO
 */
export type OrArray<T> = T | (T | OrArray<T>)[];

/**
 * TODO
 */
export type BasicValue = undefined | DefinedBasicValue;

/**
 * TODO(AR) can we further refine these types?
 */
export type ID = string;

/**
 * TODO
 */
export const isID = (value?: BasicValue): value is ID => typeof value === 'string';
/**
 * CDATA character data may contains illegal characters that need to be escaped
 */
export type CDATA = string;

/**
 * TODO
 */
export const isCDATA = (value?: BasicValue): value is CDATA => typeof value === 'string';

/**
 * PCDATA parsed character data
 */
export type PCDATA = string;

/**
 * TODO
 */
export const isPCDATA = (value?: BasicValue): value is PCDATA => typeof value === 'string';

/**
 * TODO
 */
export type NMTOKEN = string;

/**
 * NMTOKEN is a string without any spaces
 */
export const isNMTOKEN = (value?: BasicValue): value is NMTOKEN => typeof value === 'string';

/**
 * TODO
 */
export type DisplayScale = 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 140 | 160 | 180 | 200;

/**
 * TODO
 */
export const isDisplayScale = (value?: BasicValue): value is DisplayScale => ([50, 60, 70, 80, 90, 100, 110, 120, 140, 160, 180, 200] as BasicValue[]).indexOf(value) > -1;

/**
 * TODO
 */
export type DisplayFrame = 'all' | 'bottom' | 'none' | 'sides' | 'top' | 'topbot';

/**
 * TODO
 */
export const isDisplayFrame = (value?: BasicValue): value is DisplayFrame => (['all', 'bottom', 'none', 'sides', 'top', 'topbot'] as BasicValue[]).indexOf(value) > -1;

/**
 * TODO
 */
export type DisplayExpanse = 'column' | 'page' | 'spread' | 'textline';

/**
 * TODO
 */
export const isDisplayExpanse = (value?: BasicValue): value is DisplayExpanse => (['column', 'page', 'spread', 'textline'] as BasicValue[]).indexOf(value) > -1;

/**
 * TODO
 */
export type NoteType = 'caution' | 'warning' | 'danger' | 'trouble' | 'notice' | 'note';

/**
 * TODO
 */
export const isNoteType = (value?: BasicValue): value is NoteType => (['caution', 'warning', 'danger', 'trouble', 'notice', 'note'] as BasicValue[]).indexOf(value) > -1;

/**
 * TODO
 */
export interface ChildType {
    name: string;
    required: boolean;
    single: boolean;
    isGroup: boolean;
}
/**
 * TODO
 */
export type ChildTypes = OrArray<ChildType>;

/**
 * TODO
 */
export class UnknownNodeError extends Error {
  name = 'unknown-node';
}

/**
 * TODO
 */
export class UnknownAttributeError extends Error {
  name = 'unknown-attribute';
}

/**
 * TODO
 */
export class WrongAttributeTypeError extends Error {
  name = 'wrong-attribute-type';
}

/**
 * TODO
 */
export class NonAcceptedChildError extends Error {
  name = 'non-accepted-child';
}
