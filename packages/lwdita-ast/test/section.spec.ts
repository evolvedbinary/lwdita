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
import { SectionNode, isSectionNode } from "../src/nodes/section";
import { expect } from "chai";

doNodeTest(SectionNode, 'section', isSectionNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['title?', '%all-blocks*']);

describe('Class SectionNode', () => {
  it("sets correct attributes", () => {
    const section = new SectionNode({});
    
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

describe("Get rank for generic node",() => {
  it("The rank should be 1 for generic node", () => {
    const rank = SectionNode.rank;
  
    expect(rank).to.eq(1);
  });
});