import { doNodeTest } from "../tests";
import { PNode, isPNode } from "../nodes/p";
import { expect } from "chai";

doNodeTest(PNode, 'p', isPNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%all-inline*']);

describe('Class PNode', () => {
  it("sets correct attributes", () => {
    const p = new PNode({});

    p.dir = "dir";
    p["xml:lang"] = "lang";
    p.translate = "translate";
    p.props = "props";
    p.id = "id";
    p.outputclass = "outputclass";
    p.class = "class";

    expect(p.dir).to.equal("dir");
    expect(p["xml:lang"]).to.equal("lang");
    expect(p.translate).to.equal("translate");
    expect(p.props).to.equal("props");
    expect(p.id).to.equal("id");
    expect(p.outputclass).to.equal("outputclass");
    expect(p.class).to.equal("class");
  });
});