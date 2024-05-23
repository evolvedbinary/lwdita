/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { SaxesAttributeNS } from "@rubensworks/saxes";

/**
 * JDita is a Object representation of a LwDITA document
 */
export interface JDita {
  nodeName: string;
  attributes?: Record<string, BasicValue>;
  content?: string;
  children?: JDita[];
}

/**
 * TypeDef for attributes Record BasicValue
 */
export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | NonNullable<unknown> | {
  [key: string]: BasicValue;
  [key: number]: BasicValue;
};

/**
 * TypeDef for Attributes Record 
 */
export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;

/**
 * Base type for all XML nodes
 */
export interface XMLNode<T extends string = string> {
    name: T;
    attributes: Attributes;
}

/**
 * @typeParam T - Generic type or Array of generic type
 */
export type OrArray<T> = T | (T | OrArray<T>)[];

/**
 * BasicValue is a value that can be used in XML attributes or content
 */
export type BasicValue = undefined | DefinedBasicValue;

/**
 * ChildType Object
 * 
 * name - Child name
 * 
 * required - Defines if the child is required or not
 * 
 * single - Does not belong to a group like `section`
 * 
 * isGroup - Belong to a group like `all-line`
 */
export interface ChildType {
    name: string;
    required: boolean;
    single: boolean;
    isGroup: boolean;
}

/**
 * Array for @see {@link ChildType}
 */
export type ChildTypes = OrArray<ChildType>;