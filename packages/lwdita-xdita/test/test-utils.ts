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
 * test-utils.ts
 *
 * Provides objects and strings to mock test data
 */

export const XMLNODE_AUDIO = `{"name":"audio","attributes":{},"ns":{},"prefix":"","local":"audio","uri":"","isSelfClosing":true}`;
export const AUDIO_NODE_OBJECT = {
  "_props": {
    "props": undefined,
    "dir": undefined,
    "xml:lang": undefined,
    "translate": undefined,
    "keyref": undefined,
    "id": undefined,
    "conref": undefined,
    "outputclass": undefined,
    "class": undefined,
    "href": undefined,
    "format": undefined,
    "scope": undefined,
    "autoplay": undefined,
    "controls": undefined,
    "loop": undefined,
    "muted": undefined,
    "tabindex": undefined
  }
};
export const XMLNODE_UNKNOWN = `{"name":"unknown","attributes":{},"ns":{},"prefix":"","local":"audio","uri":"","isSelfClosing":true}`;
