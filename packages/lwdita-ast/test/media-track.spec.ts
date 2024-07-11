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
import { MediaTrackNode, isMediaTrackNode } from "../src/nodes/media-track";
import { expect } from "chai";

doNodeTest(
  MediaTrackNode,
  'media-track',
  isMediaTrackNode,
  ['dir', 'xml:lang', 'translate', 'href', 'format', 'scope', 'keyref', 'kind', 'srclang', 'outputclass', 'class'],
  ['text']
);

describe('Class MediaSourceNode', () => {
  it('sets correct attributes', () => {
    const mediaTrack = new MediaTrackNode({});

    mediaTrack.dir = "dir";
    mediaTrack["xml:lang"] = "lang";
    mediaTrack.translate = "translate";
    mediaTrack.href = "href";
    mediaTrack.format = "format";
    mediaTrack.scope = "local";
    mediaTrack.keyref = "keyref";
    mediaTrack.kind = "chapters";
    mediaTrack.srclang = "srclang";
    mediaTrack.outputclass = "outputclass";
    mediaTrack.class = "class";

    expect(mediaTrack.dir).to.equal("dir");
    expect(mediaTrack["xml:lang"]).to.equal("lang");
    expect(mediaTrack.translate).to.equal("translate");
    expect(mediaTrack.href).to.equal("href");
    expect(mediaTrack.format).to.equal("format");
    expect(mediaTrack.scope).to.equal("local");
    expect(mediaTrack.keyref).to.equal("keyref");
    expect(mediaTrack.kind).to.equal("chapters");
    expect(mediaTrack.srclang).to.equal("srclang");
    expect(mediaTrack.outputclass).to.equal("outputclass");
    expect(mediaTrack.class).to.equal("class");
  });
});