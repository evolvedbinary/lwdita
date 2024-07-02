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
import { LiNode, isLiNode } from "../src/nodes/li";
import { expect } from "chai";

doNodeTest(
  LiNode,
  'li',
  isLiNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%list-blocks*']
);

describe('Class LiNode', () => {
  it("sets correct attributes", () => {
    const li = new LiNode({});

    li.dir = "dir";
    li["xml:lang"] = "lang";
    li.translate = "translate";
    li.props = "props";
    li.id = "id";
    li.conref = "conref";
    li.outputclass = "outputclass";
    li.class = "class";

    expect(li.dir).to.equal("dir");
    expect(li["xml:lang"]).to.equal("lang");
    expect(li.translate).to.equal("translate");
    expect(li.props).to.equal("props");
    expect(li.id).to.equal("id");
    expect(li.conref).to.equal("conref");
    expect(li.outputclass).to.equal("outputclass");
    expect(li.class).to.equal("class");
  });
});