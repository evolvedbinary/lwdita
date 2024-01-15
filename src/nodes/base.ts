import { acceptsNodeName, isChildTypeRequired, stringToChildTypes, isChildTypeSingle } from "../utils";
import { ChildTypes, ChildType, OrArray, BasicValue, Attributes, NonAcceptedChildError, WrongAttributeTypeError, UnknownAttributeError, JDita } from "../classes";
import { BodyNode } from "./body";

/**
 * BaseNode - Base class for all nodes
 */
export abstract class BaseNode {
    // node name means node type (e.g. "image", "alt", "body", etc.)
    static nodeName = 'node';

    static inline?: boolean;
    // fields are attributes of the node eg <node field="value" />
    static fields: Array<string>;
    // childTypes are allowed child nodes
    static childTypes: ChildTypes[];
    public _children?: BaseNode[];
    protected _props!: Record<string, BasicValue>;

    constructor(attributes?: Attributes) {
        if (attributes) {
            this._props = this.static.attributesToProps(attributes);
        }
    }
    /**
     * attributesToProps - converts attributes to props
     * loops through all of the node fields and gets their values from attributes
     * the validation happens in the constructor
     *
     * @param attributes - Attributes attributes of the node
     * @returns A record of props
     */
    static attributesToProps<T extends Record<string, BasicValue>>(attributes: Attributes = {}): T {
        const result: Record<string, BasicValue> = {};
        // loop through all node fields and get their values from attributes
        this.fields.forEach(field => {
            const attr = attributes[field];
            // att can be a string or an object with value
            result[field] = typeof attr === 'string' ? attr : attr?.value;
        });
        return result as T;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static isValidField(field: string, value: BasicValue): boolean {
        return true;
    }

    public get static(): typeof BaseNode {
        return this.constructor as typeof BaseNode;
    }

    get children(): BaseNode[] {
        return this._children || [];
    }

    // this is not real json it needs to be stringified to be converted to actual json
    get json(): JDita {
        return {
            nodeName: this.static.nodeName,
            attributes: this._props,
            children: this._children?.map(child => child.json),
        };
    }

    /**
     * canAdd - Checks if a node can be added as a child
     * Also ensure it can be added in the right order
     *
     * @remarks
     * This function tells you whether a child node can be added to this node.
     * This is done by checking the child node name against the child types of this node
     *
     * @param child - BaseNode node to be added
     * @returns true if the node can be added as a child
     */

    canAdd(child: BaseNode): boolean {
        // we are e.g. in a `<body>` node and we are trying to add an `<audio`> node
        const childNodeName = child.static.nodeName;
        let childType: ChildType | undefined;
        let iChild = -1;

        // loop through all of the allowed child types and check if the child node name is accepted

        // `this.static.childTypes`, e.g. allowed children: `['%list-blocks*', 'section*', 'fn*']`
        this.static.childTypes.some((type, i) => {
            childType = acceptsNodeName(childNodeName, type);
            if (childType) {

                iChild = i;
                return true;
            }
        });

        // If the child is not contained in the list `childTypes` it will be rejected
        if (!childType) {
            return false;
        }

        // get the last child of the parent nodename,
        const last = this.children?.length ? this.children[this.children.length - 1].static.nodeName : '';
        let iLast = -1;

        // if we do have a last child
        if (last) {
            // get the index of the last child in the list of allowed children
            iLast = this.static.childTypes.findIndex(type => acceptsNodeName(last, type));
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
        // if child index is greater than last index, it can't be added if there are required child types between them
        const typesBetween = this.static.childTypes.slice(iLast + 1, iChild);

        // to check if a child type is required, check the allowed children list `childNodes`
        // and look for a child without `?` symbols at the end
        // e.g. `'title'` in this list: `['title', 'shortdesc?', 'prolog?', 'body?']`
        if (typesBetween.find(isChildTypeRequired)) {
            return false;
        }
        return true;
    }

    add(child: BaseNode, breakOnError = true): void {
        if (!this._children) {
            this._children = [];
        }
        if (!this.canAdd(child)) {
            if (breakOnError) {
                throw new NonAcceptedChildError(`"${child.static.nodeName}" node can't be a child of "${this.static.nodeName}" node`);
            }
            return;
        }
        this._children.push(child)
    }
    /**
     * Get the value of a field, if the field is not defined, throw an error
     *
     * @param field - string name of the field
     * @returns the value of the field
     */
    readProp<T = BasicValue>(field: string): T {
        if (this.static.fields.indexOf(field) < 0) {
            throw new UnknownAttributeError('unknown attribute "' + field + '"');
        }
        return this._props[field] as T;
    }
    /**
     * set the value of a field, if the field is accepted by the element throw an error
     *
     * @param field - string name of the field
     * @param value - value to be set
     */
    writeProp<T extends BasicValue>(field: string, value: T): void {
        if (this.static.fields.indexOf(field) < 0) {
            throw new UnknownAttributeError('unknown attribute "' + field + '"');
        }
        if (!this.static.isValidField(field, value)) {
            throw new WrongAttributeTypeError('wrong attribute type "' + typeof (value) + '" for field"' + field + '"');
        }
        this._props[field] = value;
    }
}

export type Constructor = { new(attributes: Attributes): BaseNode };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeAll<T extends { new(...args: any[]): BaseNode }>(constructor: T, ...decorators: ((constructor: T) => T)[]): T {
    return decorators.reduce((result, decorator) => decorator(result), constructor);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * a functions that results the constructor of a node
 * @param decorator
 * @param nodeName
 * @param fieldValidator
 * @param fields
 * @param childTypes
 * @returns
 */
export function makeComponent<T extends { new(...args: any[]): BaseNode }>(
    decorator: (constructor: T) => T,
    nodeName: string,
    fieldValidator: (field: string, value: BasicValue) => boolean,
    fields: Array<string>,
    childTypes: OrArray<string> = [], // it's being populated during the creation of the node from the decorator call

) {
    return (constructor: T): T => decorator(class extends constructor {
        static nodeName = nodeName;
        static fields = fields;
        static childTypes = stringToChildTypes(childTypes);
        static isValidField = fieldValidator;
    });
}

