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
import { OlNode, isOlNode } from "../src/nodes/ol";
import { expect } from "chai";

doNodeTest(
  OlNode,
  'ol',
  isOlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['li+']
);

describe('Class OlNode', () => {
  it("sets correct attributes", () => {
    const ol = new OlNode({});

    ol.dir = "dir";
    ol["xml:lang"] = "lang";
    ol.translate = "translate";
    ol.props = "props";
    ol.id = "id";
    ol.conref = "conref";
    ol.outputclass = "outputclass";
    ol.class = "class";

    expect(ol.dir).to.equal("dir");
    expect(ol["xml:lang"]).to.equal("lang");
    expect(ol.translate).to.equal("translate");
    expect(ol.props).to.equal("props");
    expect(ol.id).to.equal("id");
    expect(ol.conref).to.equal("conref");
    expect(ol.outputclass).to.equal("outputclass");
    expect(ol.class).to.equal("class");
  });
});