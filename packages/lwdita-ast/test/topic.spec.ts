/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { doNodeTest } from "./tests";
import { TopicNode, isTopicNode } from "../src/nodes/topic";
import { expect } from "chai";

doNodeTest(
  TopicNode,
  'topic',
  isTopicNode,
  ['xmlns:ditaarch', 'ditaarch:DITAArchVersion', 'specializations', 'outputclass', 'class', 'dir', 'xml:lang', 'translate', 'id'],
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
    topic["xmlns:ditaarch"] = "http://dita.oasis-open.org/architecture/2005/";
    topic["ditaarch:DITAArchVersion"] = "ditaarch:DITAArchVersion";
    topic.specializations = "&included-domains;";

    expect(topic.dir).to.equal("dir");
    expect(topic["xml:lang"]).to.equal("lang");
    expect(topic.translate).to.equal("translate");
    expect(topic.class).to.equal("class");
    expect(topic.outputclass).to.equal("outputclass");
    expect(topic.id).to.equal("id");
    expect(topic["xmlns:ditaarch"]).to.equal("http://dita.oasis-open.org/architecture/2005/");
    expect(topic["ditaarch:DITAArchVersion"]).to.equal("ditaarch:DITAArchVersion");
    expect(topic.specializations).to.equal("&included-domains;");
  });
});