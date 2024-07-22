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
import { MediaSourceNode, isMediaSourceNode } from "../src/nodes/media-source";
import { expect } from "chai";

doNodeTest(
  MediaSourceNode,
  'media-source',
  isMediaSourceNode,
  ['dir', 'xml:lang', 'translate', 'href', 'format', 'scope', 'keyref', 'class', 'outputclass']
);

describe('Class MediaSourceNode', () => {
  it('sets correct attributes', () => {
    const mediaSource = new MediaSourceNode({});

    mediaSource.keyref = "keyref";
    mediaSource.outputclass = "outputclass";
    mediaSource.class = "class";
    mediaSource.dir = "dir";
    mediaSource["xml:lang"] = "lang";
    mediaSource.translate = "translate";
    mediaSource.href = "href";
    mediaSource.format = "format";
    mediaSource.scope = "local";

    expect(mediaSource.keyref).to.equal("keyref");
    expect(mediaSource.outputclass).to.equal("outputclass");
    expect(mediaSource.class).to.equal("class");
    expect(mediaSource.dir).to.equal("dir");
    expect(mediaSource["xml:lang"]).to.equal("lang");
    expect(mediaSource.translate).to.equal("translate");
    expect(mediaSource.href).to.equal("href");
    expect(mediaSource.format).to.equal("format");
    expect(mediaSource.scope).to.equal("local");
  });
});