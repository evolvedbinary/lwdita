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
import { StHeadNode, isStHeadNode } from "../src/nodes/sthead";
import { expect } from "chai";

doNodeTest(
  StHeadNode,
  'sthead',
  isStHeadNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['stentry+']
);

describe('Class StHeadNode', () => {
  it("sets correct attributes", () => {
    const sthead = new StHeadNode({});

    sthead.dir = "dir";
    sthead["xml:lang"] = "lang";
    sthead.translate = "translate";
    sthead.props = "props";
    sthead.id = "id";
    sthead.conref = "conref";
    sthead.outputclass = "outputclass";
    sthead.class = "class";

    expect(sthead.dir).to.equal("dir");
    expect(sthead["xml:lang"]).to.equal("lang");
    expect(sthead.translate).to.equal("translate");
    expect(sthead.props).to.equal("props");
    expect(sthead.id).to.equal("id");
    expect(sthead.conref).to.equal("conref");
    expect(sthead.outputclass).to.equal("outputclass");
    expect(sthead.class).to.equal("class");
  });
});