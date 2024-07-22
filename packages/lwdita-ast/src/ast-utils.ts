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
 * Phrase elements group
 *
 * @see {@link https://github.com/oasis-tcs/dita-lwdita/blob/b2985f254746b2614c1b9d6a5e6043f82335506f/org.oasis.xdita/dtd/lw-topic.dtd#L50}
 */
const phGroup = ['b', 'em', 'i', 'ph', 'strong', 'sub', 'sup', 'tt', 'u'];

/**
 * Content groups
 *
 * @see {@link https://github.com/oasis-tcs/dita-lwdita/blob/f267f1e8eac5d41703eef950770e62a8972b5cd6/org.oasis.xdita/dtd/lw-common.ent#L20-L40}
 */
export const nodeGroups: Record<string, Array<string>> = {
    'ph': phGroup,
    'inline.noimage': ['text', ...phGroup, 'xref'],
    'inline.noxref': ['text', ...phGroup, 'image'],
    'inline': ['text', ...phGroup, 'image', 'xref'],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'example', 'note'],
    'fn-blocks': ['p', 'ul', 'ol', 'dl'],
    'all-blocks': ['p','ul','ol','dl','pre','audio','video','example','simpletable','fig','note'],
    'list-blocks': ['p','ul', 'ol', 'dl', 'pre', 'audio', 'video', 'example', 'simpletable', 'fig', 'note'],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'example', 'simpletable'],
    'example-blocks': ['p','ul','ol','dl','pre','audio','video','simpletable','fig','note'],
    'fallback-blocks': ['image','alt','p','ul','ol','dl','pre','note'],
}