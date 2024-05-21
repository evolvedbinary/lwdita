import { TopicNode, TopicNodeAttributes } from "./nodes/topic";
import { TitleNode, TitleNodeAttributes } from "./nodes/title";
import { PhNode, PhNodeAttributes } from "./nodes/ph";
import { ShortDescNode, ShortDescNodeAttributes } from "./nodes/shortdesc";
import { DlNode, DlNodeAttributes} from "./nodes/dl";
import { DlEntryNode, DlEntryNodeAttributes } from "./nodes/dl-entry";
import { DtNode, DtNodeAttributes } from "./nodes/dt";
import { DdNode, DdNodeAttributes } from "./nodes/dd";
import { BodyNode, BodyNodeAttributes } from "./nodes/body";
import { PNode, PNodeAttributes } from "./nodes/p";
import { ImageNode, ImageNodeAttributes } from "./nodes/image";
import { AltNode, AltNodeAttributes } from "./nodes/alt";
import { FigNode, FigNodeAttributes } from "./nodes/fig";
import { AbstractBaseNode, TextNode, TextNodeAttributes, Constructor } from "./nodes";
import { SectionNode, SectionNodeAttributes } from "./nodes/section";
import { LiNode, LiNodeAttributes } from "./nodes/li";
import { UlNode, UlNodeAttributes } from "./nodes/ul";
import { OlNode, OlNodeAttributes } from "./nodes/ol";
import { SimpleTableNode, SimpleTableNodeAttributes } from "./nodes/simple-table";
import { StHeadNode, StHeadNodeAttributes } from "./nodes/sthead";
import { StRowNode, StRowNodeAttributes } from "./nodes/strow";
import { StEntryNode, StEntryNodeAttributes } from "./nodes/stentry";
import { PrologNode, PrologNodeAttributes } from "./nodes/prolog";
import { DataNode, DataNodeAttributes } from "./nodes/data";
import { NoteNode, NoteNodeAttributes } from "./nodes/note";
import { DescNode, DescNodeAttributes } from "./nodes/desc";
import { XRefNode, XRefNodeAttributes } from "./nodes/xref";
import { AudioNode, AudioNodeAttributes } from "./nodes/audio";
import { VideoNode, VideoNodeAttributes } from "./nodes/video";
import { MediaControlsNode, MediaControlsNodeAttributes } from "./nodes/media-controls";
import { VideoPosterNode, VideoPosterNodeAttributes } from "./nodes/video-poster";
import { MediaAutoplayNode, MediaAutoplayNodeAttributes } from "./nodes/media-autoplay";
import { MediaLoopNode, MediaLoopNodeAttributes } from "./nodes/media-loop";
import { MediaMutedNode, MediaMutedNodeAttributes } from "./nodes/media-muted";
import { MediaSourceNode, MediaSourceNodeAttributes } from "./nodes/media-source";
import { MediaTrackNode, MediaTrackNodeAttributes } from "./nodes/media-track";
import { PreNode, PreNodeAttributes } from "./nodes/pre";
import { FnNode, FnNodeAttributes } from "./nodes/fn";
import { BoldNode, BoldNodeAttributes } from "./nodes/bold";
import { ItalicNode, ItalicNodeAttributes } from "./nodes/italic";
import { UnderlinedNode, UnderlinedNodeAttributes } from "./nodes/underlined";
import { SubscriptNode, SubscriptNodeAttributes } from "./nodes/subscript";
import { SuperscriptNode, SuperscriptNodeAttributes } from "./nodes/superscript";
import { XMLNode } from "@evolvedbinary/lwdita-xdita/classes";
import { UnknownNodeError } from "./ast-classes";

/**
 * getNodeClass - Get the Node class constructor based on the node type
 *
 * @param name - A string containing the node name
 * @returns - The node class constructor
 * @throws - UnknownNodeError
 */
export function getNodeClass(name: string): Constructor {
  switch (name) {
    case 'alt': return AltNode;
    case 'audio': return AudioNode;
    case 'b': return BoldNode;
    case 'body': return BodyNode;
    case 'data': return DataNode;
    case 'dd': return DdNode;
    case 'desc': return DescNode;
    case 'dl': return DlNode;
    case 'dlentry': return DlEntryNode;
    case 'dt': return DtNode;
    case 'fig': return FigNode;
    case 'fn': return FnNode;
    case 'i': return ItalicNode;
    case 'image': return ImageNode;
    case 'media-autoplay': return MediaAutoplayNode;
    case 'media-controls': return MediaControlsNode;
    case 'media-loop': return MediaLoopNode;
    case 'media-muted': return MediaMutedNode;
    case 'media-source': return MediaSourceNode;
    case 'media-track': return MediaTrackNode;
    case 'li': return LiNode;
    case 'note': return NoteNode;
    case 'ol': return OlNode;
    case 'p': return PNode;
    case 'ph': return PhNode;
    case 'pre': return PreNode;
    case 'prolog': return PrologNode;
    case 'section': return SectionNode;
    case 'simpletable': return SimpleTableNode;
    case 'shortdesc': return ShortDescNode;
    case 'stentry': return StEntryNode;
    case 'sthead': return StHeadNode;
    case 'strow': return StRowNode;
    case 'sub': return SubscriptNode;
    case 'sup': return SuperscriptNode;
    case 'title': return TitleNode;
    case 'topic': return TopicNode;
    case 'u': return UnderlinedNode;
    case 'ul': return UlNode;
    case 'video': return VideoNode;
    case 'video-poster': return VideoPosterNode;
    case 'xref': return XRefNode;
    default:
      throw new UnknownNodeError('unkonwn node "' + name + '"');
  }
}

/**
 * getNodeClassType
 *
 * @privateRemarks
 * This function is never used, remove this function if not needed
 *
 * @param name - String
 * @returns A node of type BaseNode
 */
export function getNodeClassType(name: string): typeof AbstractBaseNode {
  return getNodeClass(name) as unknown as typeof AbstractBaseNode;
}

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
export function createNode(node: XMLNode<'data'>): DataNodeAttributes;
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