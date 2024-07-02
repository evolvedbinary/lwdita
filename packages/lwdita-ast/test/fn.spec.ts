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
import { FnNode, isFnNode } from "../src/nodes/fn";
import { expect } from "chai";

doNodeTest(
  FnNode,
  'fn',
  isFnNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class', 'callout'],
  ['%fn-blocks*']
);

describe('Class FnNode', () => {
  it("sets correct attributes", () => {
    const fn = new FnNode({});

    fn.dir = "dir";
    fn["xml:lang"] = "lang";
    fn.translate = "translate";
    fn.props = "props";
    fn.id = "id";
    fn.conref = "conref";
    fn.outputclass = "outputclass";
    fn.class = "class";
    fn.callout = "callout";

    expect(fn.dir).to.equal("dir");
    expect(fn["xml:lang"]).to.equal("lang");
    expect(fn.translate).to.equal("translate");
    expect(fn.props).to.equal("props");
    expect(fn.id).to.equal("id");
    expect(fn.conref).to.equal("conref");
    expect(fn.outputclass).to.equal("outputclass");
    expect(fn.class).to.equal("class");
    expect(fn.callout).to.equal("callout");
  });
});