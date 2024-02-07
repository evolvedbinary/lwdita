import { expect, assert } from 'chai';
import { BasicValue } from "@evolvedbinary/lwdita-xdita/classes";
import { XMLTag, Visitor } from './visitor.ts';

// Test class XMLTag:
// method toString()
// 1. selfclosing tags
// 2. start tags
// 3. end tags

// Test class Visitor:
// 1. visit()
// 2. startTag()
// 3. endTag()
// 4. selfClosingTag()
