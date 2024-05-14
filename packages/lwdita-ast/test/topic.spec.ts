import { doNodeTest } from "../tests";
import { TopicNode, isTopicNode } from "../nodes/topic";
import { expect } from "chai";

doNodeTest(TopicNode, 'topic', isTopicNode,
  ['xmlns:ditaarch', 'ditaarch:DITAArchVersion', 'outputclass', 'class', 'dir', 'xml:lang', 'translate', 'domains', 'id'],
  ['title', 'shortdesc?', 'prolog?', 'body?']);

describe('Class TopicNode', () => {
  it("sets correct attributes", () => {
    const topic = new TopicNode({});
    topic.dir = "dir";
    topic["xml:lang"] = "lang";
    topic.translate = "translate";
    topic.class = "class";
    topic.outputclass = "outputclass";
    topic.id = "id";
    topic["xmlns:ditaarch"] = "xmlns:ditaarch";
    topic["ditaarch:DITAArchVersion"] = "ditaarch:DITAArchVersion";
    topic.domains = "domains";

    expect(topic.dir).to.equal("dir");
    expect(topic["xml:lang"]).to.equal("lang");
    expect(topic.translate).to.equal("translate");
    expect(topic.class).to.equal("class");
    expect(topic.outputclass).to.equal("outputclass");
    expect(topic.id).to.equal("id");
    expect(topic["xmlns:ditaarch"]).to.equal("xmlns:ditaarch");
    expect(topic["ditaarch:DITAArchVersion"]).to.equal("ditaarch:DITAArchVersion");
    expect(topic.domains).to.equal("domains");
  });
});