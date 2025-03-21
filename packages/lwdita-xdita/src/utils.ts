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

import fs from 'fs';

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
    fs.writeFileSync(path,xml)
}

/**
 * Escape XML characters in a string
 * 
 * @param text - The text to escape
 * @returns - The escaped text
 */
export function escapeXMLCharacters(text: string): string {
    return text.replace(/[&<>]/g, (match) => {
        switch (match) {
            case "&": return "&amp;";
            case "<": return "&lt;";
            case ">": return "&gt;";
            default: return match;
        }
    })
}

/**
 * Escape characters for attribute values
*/
export function escapeXMLAttributeCharacters(text: string): string {
    return text.replace(/[&"]/g, (match) => {
        switch (match) {
            case '"': return "&quot;";
            case "&": return "&amp;";
            default: return match;
        }
    })
}