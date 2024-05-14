import { doNodeTest } from "../tests";
import { SectionNode, isSectionNode } from "../nodes/section";
import { expect } from "chai";
doNodeTest(SectionNode, 'section', isSectionNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['title?', '%all-blocks*']);


describe('Body Node attributes', () => {
  it("can set correct attributes", () => {
    // create a new node without setting anything. 
    const section = new SectionNode({});

    // 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'

    section.dir = "dir";
    section["xml:lang"] = "lang";
    section.translate = "translate";
    section.props = "props";
    section.id = "id";
    section.conref = "conref";
    section.outputclass = "outputclass";
    section.class = "class";

    expect(section.dir).to.equal("dir");
    expect(section["xml:lang"]).to.equal("lang");
    expect(section.translate).to.equal("translate");
    expect(section.props).to.equal("props");
    expect(section.id).to.equal("id");
    expect(section.conref).to.equal("conref");
    expect(section.outputclass).to.equal("outputclass");
    expect(section.class).to.equal("class");

  });
});