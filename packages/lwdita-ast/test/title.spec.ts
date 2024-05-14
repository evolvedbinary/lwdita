import { doNodeTest } from "../tests";
import { TitleNode, isTitleNode } from "../nodes/title";
import { expect } from "chai";
doNodeTest(TitleNode, 'title', isTitleNode,
  ['dir', 'xml:lang', 'translate', 'outputclass', 'class'],
  ['%common-inline*']);


  describe('Body Node attributes', () => {
    it("can set correct attributes", () => {
      // create a new node without setting anything. 
      const title = new TitleNode({});
  
      // 'dir', 'xml:lang', 'translate', 'outputclass', 'class'
  
      title.dir = "dir";
      title["xml:lang"] = "lang";
      title.translate = "translate";
      title.outputclass = "outputclass";
      title.class = "class";
  
      expect(title.dir).to.equal("dir");
      expect(title["xml:lang"]).to.equal("lang");
      expect(title.translate).to.equal("translate");
      expect(title.outputclass).to.equal("outputclass");
      expect(title.class).to.equal("class");
  
    });
  });