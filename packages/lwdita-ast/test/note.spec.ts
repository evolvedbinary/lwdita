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
import { NoteNode, NoteTypes, isNoteNode } from "../src/nodes/note";
import { expect } from "chai";

doNodeTest(
  NoteNode,
  'note',
  isNoteNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class', 'type'],
  ['%simple-blocks*']
);

describe('Class NoteNode', () => {
  it("sets correct attributes", () => {
    const note = new NoteNode({});

    note.dir = "dir";
    note["xml:lang"] = "lang";
    note.translate = "translate";
    note.props = "props";
    note.id = "id";
    note.conref = "conref";
    note.outputclass = "outputclass";
    note.class = "class";
    note.type = NoteTypes.Danger;

    expect(note.dir).to.equal("dir");
    expect(note["xml:lang"]).to.equal("lang");
    expect(note.translate).to.equal("translate");
    expect(note.props).to.equal("props");
    expect(note.id).to.equal("id");
    expect(note.conref).to.equal("conref");
    expect(note.outputclass).to.equal("outputclass");
    expect(note.class).to.equal("class");
    expect(note.type).to.equal(NoteTypes.Danger);
  });
});