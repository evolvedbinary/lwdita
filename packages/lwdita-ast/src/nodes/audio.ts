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

import { FiltersNodeAttributes, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNodeAttributes, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNodeAttributes, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNodeAttributes, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, isOrUndefined } from "../utils";
import { makeComponent, AbstractBaseNode, BaseNode, makeAll } from "./base";
import { BasicValue } from "../classes";
import { BooleanString, CDATA, isBooleanString, isNMTOKEN, NMTOKEN, ReferenceContentScope } from "../ast-classes";
import { isValidVariableContentField, VariableContentFields, VariableContentNodeAttributes } from "./variable-content";
import { isValidReferenceContentField, makeReferenceContent, ReferenceContentFields, ReferenceContentNodeAttributes } from "./reference-content";

/**
 * Define all allowed `audio` attributes:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `id`, `conref`, `outputclass`, `class`, `href`,
 * `format`, `scope`, `autoplay`, `controls`, `loop`, `muted`, `tabindex`
 */
export const AudioFields = [
  ...FiltersFields,
  ...LocalizationFields,
  ...ReuseFields,
  ...VariableContentFields,
  ...ReferenceContentFields,
  ...ClassFields,
  'autoplay',
  'controls',
  'loop',
  'muted',
  'tabindex'
];

/**
 * Interface AudioNode defines the attribute types for `audio`:
 */
export interface AudioNodeAttributes extends
  FiltersNodeAttributes,
  LocalizationNodeAttributes,
  ReuseNodeAttributes,
  VariableContentNodeAttributes,
  ReferenceContentNodeAttributes,
  ClassNodeAttributes,
  BaseNode {
  'autoplay'?: BooleanString
  'controls'?: BooleanString
  'loop'?: BooleanString
  'muted'?: BooleanString
  'tabindex'?: NMTOKEN
}

/**
 * Check if the given attributes of the `audio` node are valid and match this list:
 * `props`, `dir`, `xml:lang`, `translate`, `keyref`, `id`, `conref`, `outputclass`,
 * `class`, `href`, `format`, `scope`, `autoplay`, `controls`, `loop`, `muted`, `tabindex`
 *
 * @param field - A string containing the name of the attribute
 * @param value - A BasicValue-typed value containing the attribute value
 * @returns Boolean
 */
export function isValidAudioField(field: string, value: BasicValue): boolean {
  if (isValidFiltersField(field, value)
    || isValidLocalizationField(field, value)
    || isValidReuseField(field, value)
    || isValidVariableContentField(field, value)
    || isValidReferenceContentField(field, value)
    || isValidClassField(field, value)
  ) {
    return true;
  }
  switch(field) {
    case 'autoplay': return isOrUndefined(isBooleanString, value);
    case 'controls': return isOrUndefined(isBooleanString, value);
    case 'loop': return isOrUndefined(isBooleanString, value);
    case 'muted': return isOrUndefined(isBooleanString, value);
    case 'tabindex': return isOrUndefined(isNMTOKEN, value);
    default: return false;
  }
}

/**
 * Check if the `audio` node is valid
 *
 * @remarks
 * Assert that the node is an object and has valid attributes
 *
 * @param value - The `audio` node to test
 * @returns Boolean
 */
export const isAudioNode = (value?: unknown): value is AudioNodeAttributes =>
  typeof value === 'object' && !!value && areFieldsValid(AudioFields, value as Record<string, BasicValue>, isValidAudioField);

/**
 * Construct an `audio` node with all available attributes
 *
 * @param constructor - The constructor
 * @returns An `audio` node
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeAudio<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'autoplay'(): BooleanString {
      return this.readProp<BooleanString>('autoplay');
    }
    set 'autoplay'(value: BooleanString) {
      this.writeProp<BooleanString>('autoplay', value);
    }
    get 'controls'(): BooleanString {
      return this.readProp<BooleanString>('controls');
    }
    set 'controls'(value: BooleanString) {
      this.writeProp<BooleanString>('controls', value);
    }
    get 'loop'(): BooleanString {
      return this.readProp<BooleanString>('loop');
    }
    set 'loop'(value: BooleanString) {
      this.writeProp<BooleanString>('loop', value);
    }
    get 'muted'(): BooleanString {
      return this.readProp<BooleanString>('muted');
    }
    set 'muted'(value: BooleanString) {
      this.writeProp<BooleanString>('muted', value);
    }
    get 'tabindex'(): NMTOKEN {
      return this.readProp<NMTOKEN>('tabindex');
    }
    set 'tabindex'(value: NMTOKEN) {
      this.writeProp<NMTOKEN>('tabindex', value);
    }
  },
    makeLocalization,
    makeFilters,
    makeReuse,
    makeReferenceContent,
    makeClass
  );
}


/**
 * Create an `audio` node
 *
 * @decorator `@makeComponent`
 * @param makeAudio - The `audio` node constructor
 * @param nodeName - A string containing the node name
 * @param isValidAudioField - A boolean value, if the attribute is valid or not
 * @param AudioFields - An array containing all valid attribute names
 * @param childNodes - An array containing all valid child node names: (`desc?`, `fallback?`, `media-source*`, `media-track*`)*
 */
@makeComponent(makeAudio, 'audio', isValidAudioField, AudioFields, ['desc?', 'fallback?', 'media-source*', 'media-track*'])
export class AudioNode extends AbstractBaseNode implements AudioNodeAttributes {
  static label = 'Audio';

  // ClassNodeAttributes
  'outputclass'?: CDATA
  'class'?: CDATA

  // ReuseNodeAttributes
  'id'?: NMTOKEN
  'conref'?: CDATA

  //VariableContentNodeAttributes
 'keyref'?: CDATA

  // ReferenceContentNodeAttributes
  'href'?: CDATA
  'format'?: CDATA
  'scope'?: ReferenceContentScope

  // LocalizationNodeAttributes
  'dir'?: CDATA
  'xml:lang'?: CDATA
  'translate'?: CDATA

  // FiltersNodeAttributes
  'props'?: CDATA

  // AudioNodeAttributes
  'autoplay'?: BooleanString
  'controls'?: BooleanString
  'loop'?: BooleanString
  'muted'?: BooleanString
  'tabindex'?: NMTOKEN
}