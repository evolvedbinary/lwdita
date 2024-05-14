import { doNodeTest } from "../tests";
import { BodyNode, isBodyNode } from "../nodes/body";
import { expect } from "chai";
doNodeTest(BodyNode, 'body', isBodyNode,
  ['dir', 'xml:lang', 'translate', 'outputclass', 'class'],
  ['%list-blocks*', 'section*', 'fn*']);



describe('Body Node attributes', () => {
  it("can set correct attributes", () => {
    // create a new node without setting anything. 
    const body = new BodyNode({});

    // 'dir', 'xml:lang', 'translate', 'outputclass', 'class'

    body.dir = "dir";
    body["xml:lang"] = "lang";
    body.translate = "translate";
    body.outputclass = "outputclass";
    body.class = "class";

    expect(body.dir).to.equal("dir");
    expect(body["xml:lang"]).to.equal("lang");
    expect(body.translate).to.equal("translate");
    expect(body.outputclass).to.equal("outputclass");
    expect(body.class).to.equal("class");

  });
});