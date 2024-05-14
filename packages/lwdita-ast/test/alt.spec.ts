import { doNodeTest } from "../tests";
import { AltNode, isAltNode } from "../nodes/alt";
import { expect } from "chai";

doNodeTest(AltNode, 'alt', isAltNode,
  ['outputclass', 'class', 'keyref', 'dir', 'xml:lang', 'translate', 'props'],
  ['(text|%ph|%data)*']);

describe('Class AltNode', () => {
  it("sets correct attributes", () => {
    const alt = new AltNode({});

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