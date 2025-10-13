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

import { OrArray } from "../classes";
import { acceptsNodeName, isChildTypeRequired, isChildTypeSingle, stringToChildTypes } from "../utils";
import { Attributes, BasicValue } from "../classes";
import { ChildTypes, ChildType, JDita, NonAcceptedChildError, UnknownAttributeError, WrongAttributeTypeError } from "../ast-classes";
import { nodeGroups } from "../ast-utils";

/**
 * The interface for all nodes.
 */
export interface BaseNode {

  /**
   * Getter for the class instance.
   * 
   * @returns the class instance
   */
  get static(): typeof AbstractBaseNode;

  /**
   * Getter for children.
   * 
   * @returns the children
   */
  get children(): BaseNode[];

  /**
   * Getter for JSON.
   *
   * @privateRemarks
   * this is not real JSON it needs to be serialized (stringified) to be converted to actual JSON
   *
   * @returns the JSON
   */
  get json(): JDita;

  /**
   * Checks if a node can be added as a child.
   * Also ensure it can be added in the correct order.
   *
   * @remarks
   * This function tells you whether a child node can be added to this node.
   * This is done by checking the child node name against the child types of this node
   *
   * @param child - BaseNode node to be added
   * @returns true if the node can be added as a child
   */
  canAddNode(child: BaseNode): boolean;

  /**
   * Add a child node to the document tree.
   *
   * @remarks
   * If there is a child that cannot be added, throw a new error
   *
   * @param child - The child node to be added
   * @param breakOnError - Boolean, if true, exit
   * @throws NonAcceptedChildError
   * @returns void
   */
  add(child: BaseNode, breakOnError: boolean): void;

  /**
   * Get the value of an attribute, if the attribute is not defined, throw an error
   *
   * @privateRemarks
   * This function is never executed in the context of the converter,
   * therefore the attributes are never validated.
   *
   * @param field - String name of the attribute
   * @throws UnknownAttributeError
   * @returns The value of the attribute
   */
  readProp<T = BasicValue>(field: string): T;

  /**
   * Set the value of an attribute,
   * if the attribute is not valid, throw an error
   *
   * @privateRemarks
   * This function is never executed in the context of the converter,
   * therefore the attributes are never validated.
   *
   * @param field - String name of the attribute
   * @param value - Value to be set
   * @throws UnknownAttributeError, WrongAttributeTypeError
   */
  writeProp<T extends BasicValue>(field: string, value: T): void;

  /**
   * Gets all attributes of the node.
   *
   * @returns A record of all attributes
   */
  getProps(): Record<string, BasicValue>;

  /**
   * Checks if the node allows mixed content.
   *
   * @returns true if the node allows mixed content
   */
  allowsMixedContent(): boolean;

  /**
   * Get the following siblings of a child node.
   * 
   * @param child - The child node
   * @returns An array of allowed child nodes
   */
  followingSiblings(child: string): ChildTypes[] | undefined;
}

/**
 * The base class for all nodes.
 */
export abstract class AbstractBaseNode implements BaseNode {
  // `nodeName` means node type (e.g. "image", "alt", "body", etc.)
  static nodeName = 'node';
  
  // human readable label for the node
  static label?: string;

  // `rank` is for display purposes
  static rank = 1; // base rank for all nodes

  static inline?: boolean;
  // `fields` are attributes of the node eg <node field="value" />
  static fields: Array<string>;
  // `childTypes` are allowed child nodes
  static childTypes: ChildTypes[];
  // `_children` are already validated child elements
  public _children?: AbstractBaseNode[];
  protected _props!: Record<string, BasicValue>;

  constructor(attributes?: Attributes) {
    if (attributes) {
      // `_props` - these are the attributes provided by the parser
      this._props = this.static.attributesToProps(attributes);
    }
  }

  /**
   * `attributesToProps` - Converts attributes to properties
   * Loops through all of the node attributes retrieved from the parser,
   * then gets their values from attributes,
   * and returns an object with all attributes an values.
   *
   * @param attributes - Attributes of the node
   * @returns An object with the record of properties
   */
  static attributesToProps<T extends Record<string, BasicValue>>(
    attributes: Attributes = {},
  ): T {
    Object.keys(attributes).forEach((attrName) => {
      if (!this.fields.includes(attrName)) {
        throw new UnknownAttributeError(`Unknown attribute: "${attrName}"`);
      }
    });
    const result: Record<string, BasicValue> = {};
    // loop through all node attributes and get their values
    this.fields.forEach(field => {
      const attr = attributes[field];
      // `attr` can be a string or an object with value
      result[field] = typeof attr === 'string' ? attr : attr?.value;
    });
    return result as T;
  }

  /**
   * `isValidField` - This is a function template for validation of attributes
   *
   * @param field - A string containing the attribute name
   * @param value - A BasicValue-typed value containing the attribute value
   * @returns Boolean
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static isValidField(field: string, value: BasicValue): boolean {
    return true;
  }

  public get static(): typeof AbstractBaseNode {
    return this.constructor as typeof AbstractBaseNode;
  }

  get children(): AbstractBaseNode[] {
    return this._children || [];
  }

  get json(): JDita {
    return {
      nodeName: this.static.nodeName,
      attributes: this._props,
      children: this._children?.map(child => child.json),
    };
  }

  canAddNode(child: AbstractBaseNode): boolean {
      const childNodeName = child.static.nodeName;
      return this.canAdd(childNodeName);
  }

  private canAdd(childNodeName: string): boolean {
    let childType: ChildType | undefined;
    let iChild = -1;

    // loop through all of the allowed child types and check if the child node name is accepted
    // `this.static.childTypes`, e.g. allowed children: `['%list-blocks*', 'section*', 'fn*']`
    this.static.childTypes.some((type, i) => {
      childType = acceptsNodeName(childNodeName, type, nodeGroups);
      if (childType) {

        iChild = i;
        return true;
      }
    });

    // If the child is not contained in the list `childTypes` it will be rejected
    if (!childType) {
      return false;
    }

    // get the last child of the parent nodename
    const last = this.children?.length ? this.children[this.children.length - 1].static.nodeName : '';
    let iLast = -1;

    // if we do have a last child
    if (last) {
      // get the index of the last child in the list of allowed children
      iLast = this.static.childTypes.findIndex(type => acceptsNodeName(last, type, nodeGroups));
      // if the child index is less than the last index, it can't be added
      // this ensures the correct and valid outline
      if (iLast > iChild) {
        return false;
      }

      // if the child index is equal to the last index, it can't be added if the child type is single
      // this ensure that there will be no duplication in an invalid manner
      if (iLast === iChild) {
        // if we have two of the same elements they can't be added
        // e.g. `<body>` and `<body>` within parent `<topic>`
        // you can tell if the element is single by checking the allowed children list `childNodes` and look for ? symbol
        if (isChildTypeSingle(this.static.childTypes[iChild])) {
          return false;
        }
        return true;
      }
    }
    // if the child index is greater than last index,
    // it can't be added if there are required child types between them
    const typesBetween = this.static.childTypes.slice(iLast + 1, iChild);

    // to check if a child type is required, check the allowed children list `childNodes`
    // and look for a child without `?` symbols at the end
    // e.g. `'title'` in this list: `['title', 'shortdesc?', 'prolog?', 'body?']`
    if (typesBetween.find(isChildTypeRequired)) {
      return false;
    }
    return true;
  }

  add(child: AbstractBaseNode, breakOnError = true): void {
    // If there are no children, initialize an empty array
    if (!this._children) {
      this._children = [];
    }

    // If there is a child that cannot be added, throw a new error
    if (!this.canAddNode(child)) {
      if (breakOnError) {
        if(child.static.nodeName === "text") {
          throw new NonAcceptedChildError(`${child.static.nodeName} node can't be a child of "${this.static.nodeName}" node`);
        } else {
          throw new NonAcceptedChildError(`"${child.static.nodeName}" node can't be a child of "${this.static.nodeName}" node`);
        }
      }
      return;
    }
    // Else add the child to the document tree
    this._children.push(child)
  }

  readProp<T = BasicValue>(field: string): T {
    if (this.static.fields.indexOf(field) < 0) {
      throw new UnknownAttributeError('unknown attribute "' + field + '"');
    }
    return this._props[field] as T;
  }

  writeProp<T extends BasicValue>(field: string, value: T): void {
    // If the attribute is identified as false then return error message
    if (this.static.fields.indexOf(field) < 0) {
      throw new UnknownAttributeError('unknown attribute "' + field + '"');
    }
    // If the attribute is known but doesn't match the element, return error message
    if (!this.static.isValidField(field, value)) {
      throw new WrongAttributeTypeError('wrong attribute type "' + typeof (value) + '" for field"' + field + '"');
    }
    // Else add attribute to element and document tree
    this._props[field] = value;
  }

  getProps(): Record<string, BasicValue> {
    return this._props;
  }

  allowsMixedContent(): boolean {
    return this.canAdd("text");
  }

  followingSiblings(child: string): ChildTypes[] | undefined {
    const childTypes  = this.static.childTypes;

    let targetChildType = null;
    // check where the child is in the list of allowed childTypes
    for(const childType of childTypes) {
      if(acceptsNodeName(child, childType, nodeGroups)) {
        targetChildType = childType;
        break;
      }
    }
    // if the child is not in the list of allowed children, return undefined
    if(!targetChildType) {
      return undefined;
    }
    // get the index of the child in the list of allowed children and return the following siblings
    const index = childTypes.indexOf(targetChildType);
    
    // if the child is a group or not single, include it in the list
    if((targetChildType as ChildType).isGroup || !(targetChildType as ChildType).single) {
      return childTypes.slice(index);
    }

    return childTypes.slice(index+1);
  }
}

/**
 * This is a type definition for the constructor
 */
export type Constructor = { new(attributes: Attributes): AbstractBaseNode };

/**
 * `makeAll` - This is a template function for all nodes
 *
 * @param constructor - The constructor
 * @param decorators - The decorator
 * @returns Instance of BaseNode
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeAll<T extends { new(...args: any[]): AbstractBaseNode }>(constructor: T, ...decorators: ((constructor: T) => T)[]): T {
  return decorators.reduce((result, decorator) => decorator(result), constructor);
}

/**
 * `makeComponent` -  A function that returns the constructor of a node
 *
 * @privateRemarks
 * The concept or processing of `decorator` is not yet fully understood
 *
 * @param decorator - The decorator
 * @param nodeName - A string containing the node name
 * @param fieldValidator -
 * @param fields - A List of attributes
 * @param childTypes - An Array of allowed child nodes
 * @returns The constructor function of an instance of BaseNode
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeComponent<T extends { new(...args: any[]): AbstractBaseNode }>(
  decorator: (constructor: T) => T,
  nodeName: string,
  fieldValidator: (field: string, value: BasicValue) => boolean,
  fields: Array<string>,
  childTypes: OrArray<string> = [], // it's being populated during the creation of the node from the decorator call
) {
  return (constructor: T): T => decorator(class extends constructor {
    static nodeName = nodeName;
    static fields = fields;
    // These will get parsed when being set in the constructor
    static childTypes = stringToChildTypes(childTypes);
    static isValidField = fieldValidator;
  });
}
