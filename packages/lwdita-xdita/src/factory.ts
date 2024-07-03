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

import { XMLNode } from "./classes";
import { getNodeClass } from "@evolvedbinary/lwdita-ast"
import { AbstractBaseNode, TextNode, TextNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { AltNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { AudioNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { BodyNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { BoldNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { DescNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { DdNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { DlEntryNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { DlNodeAttributes} from "@evolvedbinary/lwdita-ast";
import { DtNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { FigNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { FnNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { ImageNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { ItalicNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { LiNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { MediaAutoplayNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { MediaControlsNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { MediaLoopNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { MediaMutedNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { MediaSourceNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { MediaTrackNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { NoteNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { OlNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { PhNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { PNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { PreNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { PrologNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { SectionNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { SimpleTableNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { ShortDescNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { StEntryNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { StHeadNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { StRowNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { SubscriptNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { SuperscriptNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { TitleNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { TopicNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { UlNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { UnderlinedNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { VideoNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { VideoPosterNodeAttributes } from "@evolvedbinary/lwdita-ast";
import { XRefNodeAttributes } from "@evolvedbinary/lwdita-ast";

/**
 * createNode - Overloaded function `createNode` that creates different types of nodes based on the input XMLNode type.
 *
 * @remarks
 * The function has multiple signatures for different XMLNode types like `'pre', 'prolog', 'section'`, etc.
 * Each signature returns a different type of node corresponding to the input XMLNode type.
 * The function also has a generic signature that accepts any XMLNode and returns a node of type BaseNode or derived from BaseNode.
 * If the input is a string, the function creates a TextNode.
 * If the input is an XMLNode, the function uses the `getNodeClass` function to create a node of the appropriate type.
 * If the node type is unknown, `getNodeClass` will throw an error.
 *
 * @param node - The XMLNode object or string to be converted into a node.
 *
 * @returns A node of the type corresponding to the input XMLNode type or a TextNode if the input is a string.
 *
 * @throws Will throw an error if the node type is unknown.
 */
export function createNode(node: string): TextNodeAttributes;
export function createNode(node: XMLNode<'audio'>): AudioNodeAttributes;
export function createNode(node: XMLNode<'alt'>): AltNodeAttributes;
export function createNode(node: XMLNode<'b'>): BoldNodeAttributes;
export function createNode(node: XMLNode<'body'>): BodyNodeAttributes;
export function createNode(node: XMLNode<'dd'>): DdNodeAttributes;
export function createNode(node: XMLNode<'desc'>): DescNodeAttributes;
export function createNode(node: XMLNode<'dl'>): DlNodeAttributes;
export function createNode(node: XMLNode<'dlentry'>): DlEntryNodeAttributes;
export function createNode(node: XMLNode<'dt'>): DtNodeAttributes;
export function createNode(node: XMLNode<'fig'>): FigNodeAttributes;
export function createNode(node: XMLNode<'fn'>): FnNodeAttributes;
export function createNode(node: XMLNode<'i'>): ItalicNodeAttributes;
export function createNode(node: XMLNode<'image'>): ImageNodeAttributes;
export function createNode(node: XMLNode<'li'>): LiNodeAttributes;
export function createNode(node: XMLNode<'media-autoplay'>): MediaAutoplayNodeAttributes;
export function createNode(node: XMLNode<'media-controls'>): MediaControlsNodeAttributes;
export function createNode(node: XMLNode<'media-loop'>): MediaLoopNodeAttributes;
export function createNode(node: XMLNode<'media-muted'>): MediaMutedNodeAttributes;
export function createNode(node: XMLNode<'media-source'>): MediaSourceNodeAttributes;
export function createNode(node: XMLNode<'media-track'>): MediaTrackNodeAttributes;
export function createNode(node: XMLNode<'note'>): NoteNodeAttributes;
export function createNode(node: XMLNode<'ol'>): OlNodeAttributes;
export function createNode(node: XMLNode<'p'>): PNodeAttributes;
export function createNode(node: XMLNode<'ph'>): PhNodeAttributes;
export function createNode(node: XMLNode<'pre'>): PreNodeAttributes;
export function createNode(node: XMLNode<'prolog'>): PrologNodeAttributes;
export function createNode(node: XMLNode<'section'>): SectionNodeAttributes;
export function createNode(node: XMLNode<'simpletable'>): SimpleTableNodeAttributes;
export function createNode(node: XMLNode<'shortdesc'>): ShortDescNodeAttributes;
export function createNode(node: XMLNode<'stentry'>): StEntryNodeAttributes;
export function createNode(node: XMLNode<'sthead'>): StHeadNodeAttributes;
export function createNode(node: XMLNode<'strow'>): StRowNodeAttributes;
export function createNode(node: XMLNode<'sub'>): SubscriptNodeAttributes;
export function createNode(node: XMLNode<'sup'>): SuperscriptNodeAttributes;
export function createNode(node: XMLNode<'title'>): TitleNodeAttributes;
export function createNode(node: XMLNode<'topic'>): TopicNodeAttributes;
export function createNode(node: XMLNode<'u'>): UnderlinedNodeAttributes;
export function createNode(node: XMLNode<'ul'>): UlNodeAttributes;
export function createNode(node: XMLNode<'video'>): VideoNodeAttributes;
export function createNode(node: XMLNode<'video-poster'>): VideoPosterNodeAttributes;
export function createNode(node: XMLNode<'xref'>): XRefNodeAttributes;
export function createNode<T extends AbstractBaseNode = AbstractBaseNode>(node: XMLNode): T;
export function createNode<T extends AbstractBaseNode>(node: XMLNode | string): T {

  let nodeObject: AbstractBaseNode;
  /**
   * @example
   * `node`is an object containing the node name, its attributes, and their values.
   * ```json
   * {
   *   name: 'topic',
   *   attributes: [Object: null prototype] {},
   *   ns: [Object: null prototype] {},
   *   prefix: '',
   *   local: 'topic',
   *   uri: '',
   *   isSelfClosing: false
   * }
   * ```
   * If the node is a text node, it will simply contain its string content.
   */
  if (typeof node === 'string') {
    nodeObject = new TextNode(node);
  } else {
    const classType = getNodeClass(node.name);
    return new classType(node.attributes) as T;
  }
  return nodeObject as T;
}