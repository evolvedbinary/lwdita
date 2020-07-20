import { SaxesAttributeNS } from "saxes";

export function isOrUndefined<T>(check: (value?: any) => boolean, value?: any): value is T | undefined {
    return typeof value ==='undefined' || check(value);
}

// TODO(AR) can we further refine these types?
export type ID = string;
export const isID = (value?: any): value is ID =>  typeof value ==='string';
export type CDATA = string;
export const isCDATA = (value?: any): value is CDATA =>  typeof value ==='string';
export type PCDATA = string;
export const isPCDATA = (value?: any): value is PCDATA =>  typeof value ==='string';
export type NMTOKEN = string;
export const isNMTOKEN = (value?: any): value is NMTOKEN =>  typeof value ==='string';

// TODO(AR) should these be union types, or should they be base interfaces which other interfaces like `ph` inherit from?
export type RefrenceContentScope = 'local' | 'peer' | 'external';
export const isRefrenceContentScope = (value?: any): value is RefrenceContentScope =>
    value in ['local', 'peer', 'external'];
export type CommonInline = PCDATA/* | IntPh | IntXImage | IntData*/;
export const isCommonInline = (value?: any): value is CommonInline => isPCDATA(value);
// export type AllInline = CommonInline | XRef;

type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;
export abstract class BaseElement {
    elementName = '';
    abstract fields: Array<string>;
    props!: Record<string, any>;
    protected attributesToProps<T = Record<string, any>>(attributes: Attributes): T {
        const result: Record<string, any> = { elementName: this.elementName };
        this.fields.forEach(field => {
            const attr = attributes[field];
            result[field] = typeof attr === 'string' ? attr : attr?.value;
        });
        return result as T;
    }
    readProp<T = any>(field: string): T {
        if (this.fields.indexOf(field) < 0) {
            throw new Error('unkown property "' + field + '"');
        }
        return this.props[field];
    }
    writeProp<T = any>(field: string, value: T): void {
        if (this.fields.indexOf(field) < 0) {
            throw new Error('unkown property "' + field + '"');
        }
        if (!this.isValidField(field, value)) {
            throw new Error('wrong property  type "' + typeof(value) + '" for field"' + field + '"');
        }
        this.props[field] = value;
    }
    abstract isValidField(field: string, value: any): boolean;
}

export interface IntNamedElement {
    readonly elementName: string;
}

export type IntFilterAdds = {};

export interface IntFilters extends IntFilterAdds {
    props?: CDATA;
}

export interface IntReuse {
    id?: NMTOKEN;
    conref?: CDATA;
}

export interface IntReferenceContent {
    href?: CDATA;
    format?: CDATA;
    scope?: RefrenceContentScope;
}

export interface IntVariableContent {
    keyref?: CDATA;
}

export interface IntVariableLinks {
    keyref: CDATA;
}

export interface IntLocalization {
    'dir'?: CDATA;
    'xml:lang'?: CDATA;
    'translate'?: CDATA;
}
export const isIntLocalization = (value?: any): value is IntLocalization =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['dir']) &&
    isOrUndefined(isCDATA, value['xml:lang']) &&
    isOrUndefined(isCDATA, value['translate']);

export interface IntTopic extends IntNamedElement, IntLocalization {
    'id': ID;
    'xmlns:ditaarch': CDATA;
    'ditaarch:DITAArchVersion'?: CDATA;
    'domains'?: CDATA;
    'outputClass'?: CDATA;
    'className'?: CDATA;

    //TODO(AR) how to ensure correct ordering of children here? also cannot have a shortdesc without a title! Need somelike like a HList
    // children: {
    //     title?: Title;
    //     shortdesc?: Shortdesc;
    //     prolog?: Prolog;
    //     body?: Body;
    // };
}
export const isIntTopic = (value?: any): value is IntTopic =>
    typeof value === 'object' &&
    isID(value['id']) &&
    isCDATA(value['xmlns:ditaarch']) &&
    isOrUndefined(isCDATA, value['ditaarch:DITAArchVersion']) &&
    isOrUndefined(isCDATA, value['domains']) &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']);

export class Topic extends BaseElement implements IntTopic {
    elementName = 'topic';
    props!: IntTopic;
    fields = [
        'id',
        'xmlns:ditaarch',
        'ditaarch:DITAArchVersion',
        'domains',
        'outputClass',
        'className',
    ];
    isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'id': return isID(value);
            case 'xmlns:ditaarch': return isCDATA(value);
            case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
            case 'domains': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(
        id: ID,
        xmlnsDitaarch: CDATA,
        ditaarchDITAArchVersion?: CDATA,
        domains?: CDATA,
        outputClass?: CDATA,
        className?: CDATA,
    );
    constructor(attributes: Attributes);
    constructor(attributes: Attributes | ID, ...props: CDATA[]) {
        super();
        this.props = this.attributesToProps(isID(attributes) ? {
            'id': attributes,
            'xmlns:ditaarch': props[0],
            'ditaarch:DITAArchVersion': props[1],
            'domains': props[2],
            'outputClass': props[3],
            'className': props[4],
        } : attributes);
    }
    get 'id'(): ID {
        return this.readProp<ID>('id'); }
    get 'xmlns:ditaarch'(): CDATA {
        return this.readProp<CDATA>('xmlns:ditaarch'); }
    get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
        return this.readProp<CDATA>('ditaarch:DITAArchVersion'); }
    get 'domains'(): CDATA | undefined {
        return this.readProp<CDATA>('domains'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }

}

export interface IntTitle extends IntLocalization {
    outputClass?: CDATA;
    className?: CDATA;
}
export const isIntTitle = (value?: any): value is IntTitle =>
    typeof value === 'object' &&
    isID(value['id']) &&
    isCDATA(value['xmlns:ditaarch']) &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntLocalization(value);
export class Title extends BaseElement implements IntTitle {
    elementName = 'title';
    props!: IntTitle;
    fields = [
        'dir',
        'xml:lang',
        'translate',
        'outputClass',
        'className',
    ];
    isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(
        dir?: CDATA,
        xmlLang?: CDATA,
        translate?: CDATA,
        outputClass?: CDATA,
        className?: CDATA,
    );
    constructor(attributes: Attributes);
    constructor(attributes?: Attributes | CDATA, ...props: CDATA[]) {
        super();
        this.props = this.attributesToProps(isCDATA(attributes) ? {
            'dir': attributes,
            'xml:lang': props[0],
            'translate': props[1],
            'outputClass': props[2],
            'className': props[3],
        } : attributes || {});
    }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

// export interface IntShortdesc extends IntFilters, IntLocalization, IntReuse {
//     outputClass?: CDATA;
//     className?: CDATA;
//     children: Array<AllInline>;
// }
// export class Shortdesc extends BaseElement implements IntShortdesc {
//     readonly elementName = 'shortdesc';
//     children = [];
//     constructor(
//         public outputClass?: CDATA,
//         public className?: CDATA,
//     ) {
//         super();
//     }
// }

// export interface IntProlog extends IntFilters, IntLocalization {
//     className?: CDATA;
//     children: Array<Data>;
// }
// export class Prolog extends BaseElement implements IntProlog {
//     readonly elementName = 'prolog'
//     children = [];
//     constructor(
//         public outputClass?: CDATA,
//     ) {
//         super();
//     }
// }

// export interface IntBody extends IntLocalization {
//     outputClass?: CDATA;
//     className?: CDATA;
//     //TODO(AR) implement children
// }
// export class Body extends BaseElement implements IntBody {
//     readonly elementName = 'body';
//     children = [];
//     constructor(
//         public outputClass?: CDATA,
//         public className?: CDATA,
//     ) {
//         super();
//     }
// }

// export interface IntPh extends IntFilters, IntLocalization, IntVariableContent {
//     outputClass?: CDATA;
//     className?: CDATA;
//     children: Array<AllInline>;
// }
// export class Ph extends BaseElement implements IntPh {
//     readonly elementName = 'ph'
//     children = [];
//     constructor(
//         public outputClass?: CDATA,
//         public className?: CDATA,
//     ) {
//         super();
//     }
// }

// export interface IntXImage extends IntFilters, IntLocalization, IntReferenceContent, IntVariableContent {
//     height?: NMTOKEN;
//     width?: NMTOKEN;
//     outputClass?: CDATA;
//     className?: CDATA;
//     alt?: Alt;
// }
// export class XImage extends BaseElement implements IntXImage {
//     readonly elementName = 'Ximage';
//     constructor(
//         public height?: NMTOKEN,
//         public width?: NMTOKEN,
//         public outputClass?: CDATA,
//         public className?: CDATA,
//         public alt?: Alt,
//     ) {
//         super();
//     }
// }

// export interface IntAlt extends IntFilters, IntLocalization, IntVariableContent {
//     outputClass?: CDATA;
//     className?: CDATA;
//     children: Array<PCDATA | Ph | Data>;
// }
// export class Alt extends BaseElement implements IntAlt {
//     readonly elementName = 'alt';
//     children = [];
//     constructor(
//         public outputClass?: CDATA,
//         public className?: CDATA,
//     ) {
//         super();
//     }
// }

// export interface IntData extends IntFilters, IntLocalization, IntReferenceContent, IntVariableContent {
//     name?: CDATA;
//     value?: CDATA;
//     outputClass?: CDATA;
//     className?: CDATA;
//     children: Array<PCDATA | Data>;
// }
// export class Data extends BaseElement implements IntData {
//     readonly elementName = 'data';
//     children = [];
//     constructor(
//         public outputClass?: CDATA,
//         public className?: CDATA,
//     ) {
//         super();
//     }
// }

// export interface IntXRef extends IntFilters, IntLocalization, IntReferenceContent, IntVariableLinks {
//     outputClass?: CDATA;
//     className?: CDATA;
//     children: Array<CommonInline>;
// }
// export class XRef extends BaseElement implements IntXRef {
//     readonly elementName = 'xref';
//     children = [];
//     constructor(
//         public keyref: CDATA,
//         public outputClass?: CDATA,
//         public className?: CDATA,
//         public props?: CDATA,
//         public dir?: CDATA,
//         public xml_lang?: CDATA,
//         public translate?: CDATA,
//         public href?: CDATA,
//         public format?: CDATA,
//         public scope?: RefrenceContentScope,
//     ) {
//         super();
//     }
// }
