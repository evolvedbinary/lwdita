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

import { ChildTypes, ChildType} from "./classes";
import fs from 'fs';

/**
 * childTypeToString - Convert a child type to a string
 *
 * @param type - ChildType object
 * @param getNodeName - Get node name function
 * @param nodeGroups - Node groups
 * @returns - string
 */
export function childTypeToString(type: ChildType, nodeGroups: Record<string, string[]>, getNodeName?: (nodeName: string) => string): string {
    return (type.isGroup
        ? nodeGroups[type.name].length === 1
            ? (getNodeName
                ? nodeGroups[type.name].map(getNodeName)
                : nodeGroups[type.name]
            ).join('|')
            : '(' + (getNodeName
                ? nodeGroups[type.name].map(getNodeName)
                : nodeGroups[type.name]
            ).join('|') + ')'
        : getNodeName ? getNodeName(type.name) : type.name
    ) + (type.single
        ? type.required ? '' : '?'
        : type.required ? '+' : '*');
}

/**
 * customChildTypesToString - Serialize a child type object to a string with a custom function to get the node name
 *
 * @param type - ChildType Array
 * @param nodeGroups - Node groups
 * @param getNodeName - function to get the node name
 * @param topLevel - start of the document
 * @returns string - Serialized ChildType Array
 */
export function customChildTypesToString(type: ChildTypes, nodeGroups: Record<string, string[]>, getNodeName?: (nodeName: string) => string, topLevel = true): string {
    if (Array.isArray(type)) {
        const types = type.map(subType => customChildTypesToString(subType, nodeGroups, getNodeName, false)).join('|');
        return topLevel || type.length === 1 ? types : '(' + types + ')';
    } else {
        return childTypeToString(type, nodeGroups, getNodeName)
    }
}

/**
 * childTypesToString - Serialize a child type object to a string
 *
 * @param type - ChildType Array
 * @param nodeGroups - Node groups
 * @param topLevel - start of the document
 * @returns string - Serialized ChildType Array
 */
export function childTypesToString(type: ChildTypes, nodeGroups: Record<string, string[]>, topLevel = true): string {
    return customChildTypesToString(type, nodeGroups, undefined, topLevel);
}

/**
 * childTypesArray - Check whether the child types is an array or not and return an array
 *
 * @param childTypes - ChildType array or ChildType object
 * @returns - ChildType array
 */
export function childTypesArray(childTypes: ChildTypes): ChildTypes[] {
    return Array.isArray(childTypes) ? childTypes : [childTypes];
}

/**
 * Store Xml documents in the file system.
 *
 * @privateRemarks
 * TODO:  Checkout which platform this is running on, We are not sure yet if this would be running in the browser?
 * TODO: Get file name info from input XML
 * TODO: Check if the parser has support for reading the XML & Doctype Declaration,
 * if it can then, set the values from the XML Declaration and the Doctype Declaration
 * as properties on the root node of the AST tree.
 *
 * @param xml - The xml input string to store
 * @param path - The path in the filesystem to store the output array
 */
export function storeOutputXML(xml: string, path: string): void {
    // This is a static & generic XML & DOCTYPE Declaration for the output XML,
    // see above's TODO for a future implementation
    const header = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`
    xml = header + xml;
    fs.writeFileSync(path,xml)
}

