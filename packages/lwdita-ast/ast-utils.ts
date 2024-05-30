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
 * @remarks
 * When a node is a group we use this list to check if a node name is valid
 */
const phGroup = ['ph', 'b', 'i', 'u', 'sub', 'sup'];
const dataGroup = ['data'];

/**
 * Node groups
 *
 * @remarks
 * Group all similar nodes
 */
export const nodeGroups: Record<string, Array<string>> = {
    'ph': phGroup,
    'data': dataGroup,
    'common-inline': ['text', ...phGroup, 'image', ...dataGroup],
    'all-inline': ['text', ...phGroup, 'image', 'xref', ...dataGroup],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', ...dataGroup],
    'fn-blocks': ['p', 'ul', 'ol', 'dl', ...dataGroup],
    'all-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', ...dataGroup],
    'list-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', ...dataGroup],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', ...dataGroup],
}

/**
 * BasicValue is a value that can be used in XML attributes or content
 */
//Duplicate type definition from lwdita-xdita
export type BasicValue = undefined | DefinedBasicValue;


/**
 * TypeDef for attributes Record BasicValue
 */
//Duplicate type definition from lwdita-xdita
export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | NonNullable<unknown> | {
    [key: string]: BasicValue;
    [key: number]: BasicValue;
};

/**
 * TypeDef for Attributes Record 
 */
//TODO resolve this
export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;


/**
 * Base type for all XML nodes
 */
export interface XMLNode<T extends string = string> {
    name: T;
    attributes: Attributes;
}

/**
 * isOrUndefined - Check if a value is undefined or not
 *
 * @param check - Function to check the value
 * @param value - Value
 * @returns - Boolean
 */
export function isOrUndefined<T extends BasicValue>(check: (value?: BasicValue) => boolean, value?: BasicValue): value is T {
    return typeof value === 'undefined' || check(value);
}

/**
 * areFieldsValid - Attribute validator
 *
 * @param fields - Array of attribute names
 * @param value - Object of attribute values
 * @param validations - Validation functions
 * @returns Boolean - Whether the attributes are valid or not
 */
export function areFieldsValid(fields: string[], value: Record<string, BasicValue>, ...validations: ((field: string, value: BasicValue) => boolean)[]): boolean {
    for (const field of fields) {
        let valid = false;
        for (const validation of validations) {
            if (validation(field, value[field])) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            return false;
        }
    }
    return true;
}

/**
 * @typeParam T - Generic type or Array of generic type
 */
export type OrArray<T> = T | (T | OrArray<T>)[];

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

/**
 * stringToChildTypes - Convert the array list of string to child objects
 *
 * @remarks
 * `?` - optional
 * `+` - required
 * `*` - optional and multiple
 * `%` - group
 *
 * @param value - String or Array of strings
 * @param topLevel - Entry of the document
 * @returns Array of ChildType objects , @see {@link ChildType}
 */
export function stringToChildTypes(value: OrArray<string>, topLevel = true): ChildTypes[] {
    if (typeof value === 'string') {
        if (value === '') {
            return [];
        }
        if (value.indexOf('|') < 0) {
            const last = value.slice(-1);
            const result: ChildType = has(['+', '*', '?'], last)
            ? {
                name: value.slice(0, -1),
                single: last === '?',
                required: last === '+',
                isGroup: false,
            } : {
                name: value,
                single: true,
                required: true,
                isGroup: false,
            };
            if (result.name[0] === '%') {
                result.name = result.name.substr(1);
                result.isGroup = true;
            }
            return topLevel && !Array.isArray(result) ? [ result ] : result as unknown as ChildTypes[];
        } else {
            return stringToChildTypes(splitTypenames(value), false);
        }
    } else {
        return value.map(subType => stringToChildTypes(subType, false)).filter(type => !Array.isArray(type) || type.length > 0);
    }
}