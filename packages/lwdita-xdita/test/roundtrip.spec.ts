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

import { describe } from "mocha";
import { fullAstObject, fullJditaObject, fullXditaExample } from "./test-utils";
import { astToJdita, jditaToAst, xditaToAst } from "../src/converter";
import { expect } from "chai";
import { XditaSerializer } from "../src/xdita-serializer";
import { InMemoryTextSimpleOutputStreamCollector } from "../src/stream";

describe('round trip', () => {
  /**
   * xdita -> ast -> jdita -> ast -> xdita
   */

  it('xdita to ast', async () => {
    const xdita = fullXditaExample;
    const ast = await xditaToAst(xdita);
    // assert that the ast is as expected
    expect(ast).to.deep.equal(fullAstObject);
  })

  it('ast to jdita', async () => {
    const xdita = fullXditaExample;
    const ast = await xditaToAst(xdita);

    const jdita = astToJdita(ast);
    // assert that the lwdita is as expected
    expect(jdita).to.deep.equal(fullJditaObject);
  })

  it('jdita to ast', async () => {
    const xdita = fullXditaExample;
    const ast = await xditaToAst(xdita);
    // assert that the ast is as expected
    expect(ast).to.deep.equal(fullAstObject);

    const jdita = astToJdita(ast);

    const newAst = jditaToAst(jdita);
    // assert that the new ast is as expected
    expect(newAst).to.deep.equal(fullAstObject);
  });

  it('ast to xdita', async () => {
    const xdita = fullXditaExample;
    const ast = await xditaToAst(xdita);

    const jdita = astToJdita(ast);

    const newAst = jditaToAst(jdita);

    const outStream = new InMemoryTextSimpleOutputStreamCollector();
    const serializer = new XditaSerializer(outStream);

    serializer.serialize(newAst);

    const newXdita = outStream.getText();

    // assert that the new xdita is as expected
    expect(newXdita).to.equal(xdita);
  });

});