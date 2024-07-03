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
const phGroup = ['b', 'em', 'i', 'ph', 'strong', 'sub', 'sup', 'tt', 'u'];
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
    'inline.noimage': ['text', 'ph', 'xref'],
    'inline.noxref': ['text', 'ph', 'image'],
    'inline': ['text', ...phGroup, 'image', 'xref'],
    'common-inline': ['text', ...phGroup, 'image', ...dataGroup],
    'all-inline': ['text', ...phGroup, 'image', 'xref', ...dataGroup],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'example', 'note'],
    'fn-blocks': ['p', 'ul', 'ol', 'dl'],
    'all-blocks': ['p','ul','ol','dl','pre','audio','video','example','simpletable','fig','note'],
    'list-blocks': ['p','ul', 'ol', 'dl', 'pre', 'audio', 'video', 'example', 'simpletable', 'fig', 'note'],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'example', 'simpletable'],
    'example-blocks': ['p','ul','ol','dl','pre','audio','video','simpletable','fig','note'],
    'fallback-blocks': ['image','alt','p','ul','ol','dl','pre','note'],
}