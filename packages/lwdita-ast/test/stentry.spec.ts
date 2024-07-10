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
import { StEntryNode, isStEntryNode } from "../src/nodes/stentry";
import { expect } from "chai";

doNodeTest(
  StEntryNode,
  'stentry',
  isStEntryNode,
  ['props', 'dir', 'xml:lang', 'translate', 'id', 'conref', 'class', 'outputclass', 'colspan', 'rowspan', 'scope', 'headers'],
  ['%simple-blocks*']
);

describe('Class StEntryNode', () => {
  it("sets correct attributes", () => {
    const stentry = new StEntryNode({});

    stentry.dir = "dir";
    stentry["xml:lang"] = "lang";
    stentry.translate = "translate";
    stentry.props = "props";
    stentry.id = "id";
    stentry.conref = "conref";
    stentry.outputclass = "outputclass";
    stentry.class = "class";
    stentry.colspan = "colspan";
    stentry.rowspan = "rowspan";
    stentry.scope = "row";
    // stentry.headers = ['firstID', 'secondID'];

    expect(stentry.dir).to.equal("dir");
    expect(stentry["xml:lang"]).to.equal("lang");
    expect(stentry.translate).to.equal("translate");
    expect(stentry.props).to.equal("props");
    expect(stentry.id).to.equal("id");
    expect(stentry.conref).to.equal("conref");
    expect(stentry.outputclass).to.equal("outputclass");
    expect(stentry.class).to.equal("class");
    expect(stentry.colspan).to.equal("colspan");
    expect(stentry.rowspan).to.equal("rowspan");
    expect(stentry.scope).to.equal("row");
    // expect(stentry.headers).to.equal('firstID', 'secondID');
  });
});