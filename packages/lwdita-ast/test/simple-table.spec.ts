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
import { SimpleTableNode, isSimpleTableNode } from "../src/nodes/simple-table";
import { expect } from "chai";

doNodeTest(
  SimpleTableNode,
  'simpletable',
  isSimpleTableNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['title?', 'sthead?', 'strow+']
);

describe('Class SimpleTableNode', () => {
  it("sets correct attributes", () => {
    const simpletable = new SimpleTableNode({});

    simpletable.dir = "dir";
    simpletable["xml:lang"] = "lang";
    simpletable.translate = "translate";
    simpletable.props = "props";
    simpletable.id = "id";
    simpletable.conref = "conref";
    simpletable.outputclass = "outputclass";
    simpletable.class = "class";

    expect(simpletable.dir).to.equal("dir");
    expect(simpletable["xml:lang"]).to.equal("lang");
    expect(simpletable.translate).to.equal("translate");
    expect(simpletable.props).to.equal("props");
    expect(simpletable.id).to.equal("id");
    expect(simpletable.conref).to.equal("conref");
    expect(simpletable.outputclass).to.equal("outputclass");
    expect(simpletable.class).to.equal("class");
  });
});