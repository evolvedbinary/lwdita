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
import { VideoNode, isVideoNode } from "../src/nodes/video";
import { expect } from "chai";

doNodeTest(
  VideoNode,
  'video',
  isVideoNode,
  ['props', 'dir', 'xml:lang', 'translate', 'id', 'conref',
    'outputclass', 'class', 'width', 'height', 'href', 'format', 'scope',
    'autoplay', 'controls', 'loop', 'muted', 'tabindex'
  ],
  ['desc?', 'fallback?', 'video-poster?', 'media-source*', 'media-track*']
);

describe('Class VideoNode', () => {
  it("sets correct attributes", () => {
    const video = new VideoNode({});

    video.props = "props";
    video.dir = "dir";
    video["xml:lang"] = "lang";
    video.translate = "translate";
    video.id = "id";
    video.conref = "conref";
    video.class = "class";
    video.outputclass = "outputclass";
    video.href = "href";
    video.format = "format";
    video.scope = "local";
    video.width = "width";
    video.height = "height";
    video.autoplay = "false";
    video.controls = "true";
    video.loop = "false";
    video.muted = "false";
    video.tabindex = "1";

    expect(video.props).to.equal("props");
    expect(video.dir).to.equal("dir");
    expect(video["xml:lang"]).to.equal("lang");
    expect(video.translate).to.equal("translate");
    expect(video.id).to.equal("id");
    expect(video.conref).to.equal("conref");
    expect(video.class).to.equal("class");
    expect(video.outputclass).to.equal("outputclass");
    expect(video.href).to.equal("href");
    expect(video.format).to.equal("format");
    expect(video.scope).to.equal("local");
    expect(video.width).to.equal("width");
    expect(video.height).to.equal("height");
    expect(video.autoplay).to.equal("false");
    expect(video.controls).to.equal("true");
    expect(video.loop).to.equal("false");
    expect(video.muted).to.equal("false");
    expect(video.tabindex).to.equal("1");
  });
});