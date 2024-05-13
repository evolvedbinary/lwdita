import { doNodeTest } from "../tests";
import { AltNode, isAltNode } from "../nodes/alt";
doNodeTest(AltNode, 'alt', isAltNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate', 'props'],
  ['(text|%ph|%data)*']);

// TODO test the node attributes 
// something like alt.outputclass reading and writing, making sure the attribute exists on the node and can be 
// manipulated


// eg of wrong case
// setting alt.attributes does not throw any error
// if the class does not have the correct attributes it does not throw

describe('AltNode attributes', () => {
  it("can set correct attributes", () => {
    //TODO
  });
  
  it("can not set incorrect attributes",() => {
    //TODO
  });
});