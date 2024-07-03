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
import { PrologNode, isPrologNode } from "../src/nodes/prolog";
import { expect } from "chai";

doNodeTest(
  PrologNode,
  'prolog',
  isPrologNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['metadata*']
);

describe('Class PrologNode', () => {
  it("sets correct attributes", () => {
    const prolog = new PrologNode({});

    prolog.dir = "dir";
    prolog["xml:lang"] = "lang";
    prolog.translate = "translate";
    prolog.props = "props";
    prolog.outputclass = "outputclass";
    prolog.class = "class";

    expect(prolog.dir).to.equal("dir");
    expect(prolog["xml:lang"]).to.equal("lang");
    expect(prolog.translate).to.equal("translate");
    expect(prolog.props).to.equal("props");
    expect(prolog.outputclass).to.equal("outputclass");
    expect(prolog.class).to.equal("class");
  });
});