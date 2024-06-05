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

/**
 * TypeDef for Attributes Record.
 */
export type Attributes = Record<string, AttributeNS> | Record<string, string>;

/**
 * Interface for attributes with namespaces.
 *
 * NOTE(AR) At the moment this Strutcural Type has to match SaxesAttributeNS from "\@rubensworks/saxes" so that it can be used in lwdita-xdita
 */
export interface AttributeNS {
  /**
   * The attribute's name. This is the combination of namespace prefix and local name.
   */
  name: string;

  /**
   * The attribute's namespace prefix.
   */
  prefix: string;

  /**
   * The attribute's local name.
   */
  local: string;

  /**
   * The namespace URI of this attribute.
   */
  uri: string;

  /**
   * The attribute's value.
   */
  value: string;
}

/**
  * BasicValue is a value that can be used in XML attributes or content
  */
export type BasicValue = undefined | DefinedBasicValue;

/**
 * TypeDef for attributes Record BasicValue
 */
export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | NonNullable<unknown> | {
    [key: string]: BasicValue;
    [key: number]: BasicValue;
  };

/**
 * @typeParam T - Generic type or Array of generic type
 */
export type OrArray<T> = T | (T | OrArray<T>)[];