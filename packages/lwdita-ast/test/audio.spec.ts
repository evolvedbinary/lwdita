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
import { AudioNode, isAudioNode } from "../src/nodes/audio";
import { expect } from "chai";

doNodeTest(
  AudioNode,
  'audio',
  isAudioNode,
  ['props', 'dir', 'xml:lang', 'translate', 'keyref',
    'id', 'conref', 'outputclass', 'class', 'href', 'format',
    'scope', 'autoplay', 'controls', 'loop', 'muted', 'tabindex'
  ],
  ['desc?', 'fallback?', 'media-source*', 'media-track*']
);

describe('Class AudioNode', () => {
  it("sets correct attributes", () => {
    const audio = new AudioNode({});

    audio.props = "props";
    audio.dir = "dir";
    audio["xml:lang"] = "lang";
    audio.translate = "translate";
    audio.keyref = "keyref";
    audio.id = "id";
    audio.conref = "conref";
    audio.class = "class";
    audio.outputclass = "outputclass";
    audio.href = "href";
    audio.format = "format";
    audio.scope = "local";
    audio.autoplay = "false";
    audio.controls = "true";
    audio.loop = "false";
    audio.muted = "false";
    audio.tabindex = "1";

    expect(audio.props).to.equal("props");
    expect(audio.dir).to.equal("dir");
    expect(audio["xml:lang"]).to.equal("lang");
    expect(audio.translate).to.equal("translate");
    expect(audio.keyref).to.equal("keyref");
    expect(audio.id).to.equal("id");
    expect(audio.conref).to.equal("conref");
    expect(audio.class).to.equal("class");
    expect(audio.outputclass).to.equal("outputclass");
    expect(audio.href).to.equal("href");
    expect(audio.format).to.equal("format");
    expect(audio.scope).to.equal("local");
    expect(audio.autoplay).to.equal("false");
    expect(audio.controls).to.equal("true");
    expect(audio.loop).to.equal("false");
    expect(audio.muted).to.equal("false");
    expect(audio.tabindex).to.equal("1");
  });
});