/* eslint-disable @typescript-eslint/no-require-imports */
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

const td = require("typedoc");
const ts = td.TypeScript;
const fs = require("fs");
const path = require("path");

/** @param {td.Application} app - TypeDoc application */
exports.load = function (app) {
    // Add decorator info to reflections
    // if you need parameters, you need app.converter.on(td.Converter.EVENT_CREATE_PARAMETER)
    app.converter.on(td.Converter.EVENT_CREATE_DECLARATION, addDecoratorInfo);
    // Add decorator info to serialized json
    app.serializer.addSerializer({
        priority: 0,
        supports(item) {
            return item instanceof td.DeclarationReflection;
        },
        toObject(item, obj, _ser) {
            if (item.decorators) {
                obj.decorators = item.decorators;
            }
            return obj;
        },
    });
};


/**
 * @param {td.Context} context - TypeDoc context
 * @param {td.DeclarationReflection} decl - Declaration reflection
 */
function addDecoratorInfo(context, decl) {
    const symbol = context.getSymbolFromReflection(decl);
    if (!symbol) return;

    const declaration = symbol.valueDeclaration;
    if (!declaration) return;
    if (
        !ts.isPropertyDeclaration(declaration) &&
        !ts.isMethodDeclaration(declaration)
    ) {
        return;
    }

    if (!declaration.modifiers) return;

    const decorators = declaration.modifiers?.filter(ts.isDecorator);
    debugger
    decl.decorators = decorators?.map((d) => ({
        expression: d.getText(),
    }));
}