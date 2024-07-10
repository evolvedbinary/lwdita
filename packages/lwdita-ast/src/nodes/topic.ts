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

import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, isOrUndefined } from "../utils";
import { AbstractBaseNode, BaseNode, makeComponent, makeAll } from "./base";
import { BasicValue } from "../classes";
import { CDATA, isCDATA, ID, isID } from "../ast-classes";

/**
 * Define all allowed `topic` attributes:
 * `dir`, `xml:lang`, `translate`, `class`, `outputclass`, `id`, `xmlns:ditaarch`, `ditaarch:DITAArchVersion`, `domains`
 */
export const TopicFields = [...LocalizationFields, ...ClassFields, 'id', 'xmlns:ditaarch', 'ditaarch:DITAArchVersion', 'domains'];

/**
 * Interface TopicNode defines the attribute types for `topic`:
 * `CDATA`, `ID`
 *
 * @privateRemarks
 * TODO: Implement type "&xdita-constraint; &included-domains;"
 */
export interface TopicNodeAttributes extends LocalizationNodeAttributes, ClassNodeAttributes, BaseNode {
  'id': ID
  'xmlns:ditaarch': CDATA
  'ditaarch:DITAArchVersion'?: CDATA
  'domains'?: CDATA
}

/**
 * Check if the given attributes of the `topic` node are valid
 *
 * @param field - A string containing the name of the attributes
 * @param value - A BasicValue-typed value containing the attributes value
 * @returns Boolean
 */
export function isValidTopicField(field: string, value: BasicValue): boolean {
  if (isValidLocalizationField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'id': return isOrUndefined(isID, value);
    case 'xmlns:ditaarch': return isOrUndefined(isCDATA, value);
    case 'domains': return isOrUndefined(isCDATA, value);
    case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

/**
 * Check if the `topic` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `topic` node to test
 * @returns Boolean
 */
export const isTopicNode = (value?: unknown): value is TopicNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(TopicFields, value as Record<string, BasicValue>, isValidTopicField);

/**
 * Construct a `topic` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns A `topic` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeTopic<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'id'(): ID {
      return this.readProp<ID>('id'); }
    set 'id'(value: ID) {
        this.writeProp<ID>('id', value); }
    get 'xmlns:ditaarch'(): CDATA {
      return this.readProp<CDATA>('xmlns:ditaarch'); }
    set 'xmlns:ditaarch'(value: CDATA) {
        this.writeProp<CDATA>('xmlns:ditaarch', value); }
    get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('ditaarch:DITAArchVersion'); }
    set 'ditaarch:DITAArchVersion'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('ditaarch:DITAArchVersion', value); }
    get 'domains'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('domains'); }
    set 'domains'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('domains', value); }
  }, makeLocalization, makeClass,);
}

/**
 * Create a `topic` node (article) and map the `topic` node with the LwDita tag name `article`
 *
 * @decorator `@makeComponent`
 * @param makeTopic - The `topic` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidTopicField - A boolean value, if the attribute is valid or not
 * @param fields - A List of valid attributes, @see {@link TopicFields}
 * @param childNodes - An Array of allowed child nodes: `title`, `shortdesc?`, `prolog?`, `body?`
 */
@makeComponent(makeTopic, 'topic', isValidTopicField, TopicFields, ['title', 'shortdesc?', 'prolog?', 'body?'])
export class TopicNode extends AbstractBaseNode implements TopicNodeAttributes {
  static domNodeName = 'article';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // TopicNodeAttributes
  'id': ID
  'xmlns:ditaarch': CDATA
  'ditaarch:DITAArchVersion'?: CDATA
  'domains'?: CDATA
}