import { doNodeTest } from "../tests";
import { AltNode, isAltNode } from "../nodes/alt";
import { expect } from "chai";
doNodeTest(AltNode, 'alt', isAltNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate', 'props'],
  ['(text|%ph|%data)*']);



describe('AltNode attributes', () => {
  it("can set correct attributes", () => {
    // create a new node without setting anything. 
    const alt = new AltNode({});
    //go over all the attributes and set them
    // see if we can get all of the attributes back again
    // `keyref`, `outputclass`, `class`, `dir`, `xml:lang`, `translate`, `props`

    alt.keyref = "keyref";
    alt.outputclass = "outputclass";
    alt.class = "class";
    alt.dir = "dir";
    alt["xml:lang"] = "lang";
    alt.translate = "translate";
    alt.props = "props";

    expect(alt.keyref).to.equal("keyref");
    expect(alt.outputclass).to.equal("outputclass");
    expect(alt.class).to.equal("class");
    expect(alt.dir).to.equal("dir");
    expect(alt["xml:lang"]).to.equal("lang");
    expect(alt.translate).to.equal("translate");
    expect(alt.props).to.equal("props");
    
  });
});