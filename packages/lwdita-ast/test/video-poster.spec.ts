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
import { VideoPosterNode, isVideoPosterNode } from "../src/nodes/video-poster";
import { expect } from "chai";

doNodeTest(
  VideoPosterNode,
  'video-poster',
  isVideoPosterNode,
  ['dir', 'xml:lang', 'translate', 'props',  'href', 'format', 'scope', 'id', 'conref', 'keyref', 'outputclass', 'class']
);

describe('Class VideoPosterNode', () => {
  it('sets correct attributes', () => {
    const videoPoster = new VideoPosterNode({});

    videoPoster.keyref = "keyref";
    videoPoster.dir = "dir";
    videoPoster["xml:lang"] = "lang";
    videoPoster.translate = "translate";
    videoPoster.props = "props";
    videoPoster.href = "href";
    videoPoster.format = "format";
    videoPoster.scope = "local";
    videoPoster.id = "id";
    videoPoster.conref = "conref";
    videoPoster.keyref = "keyref";
    videoPoster.outputclass = "outputclass";
    videoPoster.class = "class";

    expect(videoPoster.keyref).to.equal("keyref");
    expect(videoPoster.dir).to.equal("dir");
    expect(videoPoster["xml:lang"]).to.equal("lang");
    expect(videoPoster.translate).to.equal("translate");
    expect(videoPoster.props).to.equal("props");
    expect(videoPoster.href).to.equal("href");
    expect(videoPoster.format).to.equal("format");
    expect(videoPoster.scope).to.equal("local");
    expect(videoPoster.id).to.equal("id");
    expect(videoPoster.conref).to.equal("conref");
    expect(videoPoster.keyref).to.equal("keyref");
    expect(videoPoster.outputclass).to.equal("outputclass");
    expect(videoPoster.class).to.equal("class");
  });
});