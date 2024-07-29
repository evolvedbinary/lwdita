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
import { astToJdita, xditaToAst } from "../src/converter";
import { expect } from "chai";

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

    const jdita = astToJdita(ast);
  });
});