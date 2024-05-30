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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { expect, assert } from 'chai';
import { splitTypenames, childTypesToString, customChildTypesToString, has, childTypeToString, acceptsNodeName, isChildTypeSingle, childTypesArray } from '../utils';
import { ChildType, ChildTypes } from '../classes';

const mockedNodeGroups = {
  'data': ['data'],
};

describe('String from Childtype', () => {
  it('[0..1] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    },mockedNodeGroups), 'child?');
  });
  it('[1..1] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: true,
      required: true,
      isGroup: false,
    },mockedNodeGroups), 'child');
  });
  it('[0..n] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: false,
      required: false,
      isGroup: false,
    },mockedNodeGroups), 'child*');
  });
  it('[1..n] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    },mockedNodeGroups), 'child+');
  });
  it('[0..1] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: true,
      required: false,
      isGroup: true,
    }, mockedNodeGroups), 'data?');
  });
  it('[1..1] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: true,
      required: true,
      isGroup: true,
    }, mockedNodeGroups), 'data');
  });
  it('[0..n] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: false,
      required: false,
      isGroup: true,
    }, mockedNodeGroups), 'data*');
  });
  it('[1..n] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: false,
      required: true,
      isGroup: true,
    }, mockedNodeGroups), 'data+');
  });
  it('[0..1] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)?'), mockedNodeGroups), 'ph?|b?|i?|u?|sub?|sup?');
  });
  it('[1..1] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('ph|b|i|u|sub|sup'), mockedNodeGroups), 'ph|b|i|u|sub|sup');
  });
  it('[0..n] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)*'), mockedNodeGroups), 'ph*|b*|i*|u*|sub*|sup*');
  });
  it('[1..n] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)+'), mockedNodeGroups), 'ph+|b+|i+|u+|sub+|sup+');
  });
  it('should return the correct string (mixed)', () => {
    assert.equal(childTypesToString(stringToChildTypes(['(ph|b|i|u|sub|sup)?', 'child+', 'a*|b']), mockedNodeGroups), '(ph?|b?|i?|u?|sub?|sup?)|child+|(a*|b)');
  });
  it('should return the correct string (empty)', () => {
    assert.equal(childTypesToString(stringToChildTypes(''), mockedNodeGroups), '');
  });
});
// TODO: add other cardinalities tests
describe('Custom string from Childtype', () => {
  it('[0..1] should return the correct custom string', () => {
    assert.equal(customChildTypesToString([{
      name: 'child1',
      single: true,
      required: false,
      isGroup: false,
    }, {
      name: 'child2',
      single: true,
      required: false,
      isGroup: false,
    }], mockedNodeGroups, x => x === 'child1' ? 'text' : 'p'), 'text?|p?');
  });
});
describe('Childtypes from strings', () => {
  it('should split types names correctly', () => {
    assert.deepEqual(splitTypenames('child1?|child2+'), ['child1?', 'child2+']);
  });
  it('should split types names correctly (using parentheses)', () => {
    assert.deepEqual(splitTypenames('(child1|child2)+'), ['child1+', 'child2+']);
  });
  it('should return the correct ChildTypes', () => {
    assert.deepEqual(stringToChildTypes(['child1?', 'child2+']), [stringToChildTypes('child1?', false), stringToChildTypes('child2+', false)]);
  });
  it('should return the ChildTypes with any order', () => {
    assert.deepEqual(stringToChildTypes([['child1?', 'child2+']]), [[stringToChildTypes('child1?', false), stringToChildTypes('child2+', false)]]);
  });
  it('should return the ChildTypes with any order', () => {
    assert.deepEqual(stringToChildTypes(['child1?|child2+']), [[stringToChildTypes('child1?', false), stringToChildTypes('child2+', false)]]);
  });
});

describe('has', () => {
  it('should return true if the value exists in the array', () => {
    const array = ['+', '*', '?'];
    const value = '*';
    const result = has(array, value);
    expect(result).to.be.true;
  });

  it('should return false if the value does not exist in the array', () => {
    const array = ['+', '*', '?'];
    const value = '%';
    const result = has(array, value);
    expect(result).to.be.false;
  });
});

describe('childTypeToString', () => {
  const mockedNodeGroups = {
    'data': ['data'],
    'all-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', 'data']
  };

  it('returns the correct string for a non-group child type', () => {
    const type = {
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    };
    const result = childTypeToString(type, mockedNodeGroups);
    expect(result).to.equal('child?');
  });

  it('single group child type with one node', () => {
    const type = {
      name: 'data',
      single: true,
      required: true,
      isGroup: false,
    };
    const result = childTypeToString(type, mockedNodeGroups);
    expect(result).to.equal('data');
  });

  it('single group child type with multiple nodes', () => {
    const type = {
      name: 'all-blocks',
      single: false,
      required: false,
      isGroup: true,
    };

    const result = childTypeToString(type, mockedNodeGroups);
    expect(result).to.equal('(p|ul|ol|dl|pre|audio|video|simpletable|fig|fn|note|data)*');
  });
});

describe('childTypesArray', () => {
  it('returns the same array when passed an array of child types', () => {
    const childTypes = [
      {
        name: 'child1',
        single: true,
        required: false,
        isGroup: false,
      },
      {
        name: 'child2',
        single: false,
        required: true,
        isGroup: false,
      },
    ];
    const result = childTypesArray(childTypes);
    expect(result).to.deep.equal(childTypes);
  });

  it('creates an array when passed a single child type object', () => {
    const childType = {
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    };
    const result = childTypesArray([childType]);
    expect(result).to.deep.equal([childType]);
  });
});
