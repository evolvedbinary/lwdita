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

import { assert, expect } from 'chai';
import { ChildType, ChildTypes } from "../ast-classes";
import { acceptsNodeName, areFieldsValid, has, isChildTypeRequired, isChildTypeSingle, isOrUndefined, splitTypenames, stringToChildTypes } from "../utils";
import { BasicValue } from "../classes";

describe('acceptsNodeName', () => {
  const mockedNodeGroups = {
    'group1': ['node1', 'node2'],
    'group2': ['node3', 'node4'],
  };

  it('should return undefined if childType is an empty array', () => {
    const value = 'node';
    const childType: ChildTypes = [];
    const result = acceptsNodeName(value, childType, mockedNodeGroups);
    expect(result).to.be.undefined;
  });

  it('should return childType if childType is not a group and name matches', () => {
    const value = 'node';
    const childType: ChildType = {
      name: 'node',
      single: true,
      required: false,
      isGroup: false,
    };
    const result = acceptsNodeName(value, childType, mockedNodeGroups);
    expect(result).to.equal(childType);
  });

  it('should return undefined if childType is a group and value is not in the group', () => {
    const value = 'node';
    const childType: ChildType = {
      name: 'group1',
      single: true,
      required: false,
      isGroup: true,
    };
    const result = acceptsNodeName(value, childType, mockedNodeGroups);
    expect(result).to.be.undefined;
  });

  it('should return childType if childType is a group and value is in the group', () => {
    const value = 'node1';
    const childType: ChildType = {
      name: 'group1',
      single: true,
      required: false,
      isGroup: true,
    };
    const result = acceptsNodeName(value, childType, mockedNodeGroups);
    expect(result).to.equal(childType);
  });

  it('should return childType if childType is an array and any child accepts the node name', () => {
    const value = 'node1';
    const childType: ChildTypes = [
      {
        name: 'group1',
        single: true,
        required: false,
        isGroup: true,
      },
      {
        name: 'group2',
        single: true,
        required: false,
        isGroup: true,
      },
    ];
    const result = acceptsNodeName(value, childType, mockedNodeGroups);
    expect(result).to.equal(childType[0]);
  });
});

describe('areFieldsValid', () => {
  it('returns true if all fields pass the validations', () => {
    const fields = ['field1', 'field2'];
    const value = {
      field1: 'value1',
      field2: 'value2',
    };
    const validations = [
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (field: string, value: BasicValue) => typeof value === 'string',
    ];
    const result = areFieldsValid(fields, value, ...validations);
    expect(result).to.be.true;
  });

  it('returns false if one field fails the validations', () => {
    const fields = ['field1', 'field2'];
    const value = {
      field1: 'value1',
      field2: 'value2',
    };
    const validations = [
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (field: string, value: BasicValue) => value === 'value1',
    ];
    const result = areFieldsValid(fields, value, ...validations);
    expect(result).to.be.false;
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

describe('isChildTypeRequired', () => {
  it('returns true for required childType', () => {
    const childType = {
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    };
    const result = isChildTypeRequired(childType);
    expect(result).to.be.true;
  });

  it('returns true for string as required childtype', () => {
    const child = 'child';
    const result = isChildTypeRequired(child);
    expect(result).to.be.true;
  });

  it('returns false for string as non-required childtype', () => {
    const child = 'child?';
    const result = isChildTypeRequired(child);
    expect(result).to.be.false;
  });

  it('returns true for childtypes array with one required member', () => {
    const childType: ChildTypes = [
      {
        name: 'group1',
        single: false,
        required: true,
        isGroup: false,
      },
      {
        name: 'group2',
        single: false,
        required: false,
        isGroup: false,
      },
    ];
    const result = isChildTypeRequired(childType);
    expect(result).to.be.true;
  });

  it('returns true for childtypes array with multiple required members', () => {
    const childType: ChildTypes = [
      {
        name: 'group1',
        single: false,
        required: true,
        isGroup: false,
      },
      {
        name: 'group2',
        single: false,
        required: false,
        isGroup: false,
      },
      {
        name: 'group3',
        single: false,
        required: true,
        isGroup: false,
      },
    ];
    const result = isChildTypeRequired(childType);
    expect(result).to.be.true;
  });


  it('returns false for childtypes array without required member', () => {
    const childType: ChildTypes = [
      {
        name: 'group1',
        single: false,
        required: false,
        isGroup: false,
      },
      {
        name: 'group2',
        single: false,
        required: false,
        isGroup: false,
      },
    ];
    const result = isChildTypeRequired(childType);
    expect(result).to.be.false;
  });

});


describe('isChildTypeSingle', () => {
  it('returns true for single childType', () => {
    const childType = {
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    };
    const result = isChildTypeSingle(childType);
    expect(result).to.be.true;
  });

  it('returns true for string as single childtype', () => {
    const child = 'child';
    const result = isChildTypeSingle(child);
    expect(result).to.be.true;
  });

  it('returns false for string as non-single childtype', () => {
    const child = '%child*';
    const result = isChildTypeSingle(child);
    expect(result).to.be.false;
  });

  it('returns true for childtypes array', () => {
    const childType: ChildTypes = [
      {
        name: 'group1',
        single: true,
        required: false,
        isGroup: true,
      },
      {
        name: 'group2',
        single: true,
        required: false,
        isGroup: true,
      },
    ];
    const result = isChildTypeSingle(childType);
    expect(result).to.be.true;
  });

});

describe('isOrUndefined', () => {
  it('returns true if value is undefined', () => {
    const result = isOrUndefined((value) => typeof value === 'string', undefined);
    expect(result).to.be.true;
  });

  it('returns true if check function returns true', () => {
    const result = isOrUndefined((value) => typeof value === 'string', 'test');
    expect(result).to.be.true;
  });

  it('returns false if check function returns false and value is not undefined', () => {
    const result = isOrUndefined((value) => typeof value === 'string', 123);
    expect(result).to.be.false;
  });
});

describe('Childtype from string', () => {
  it('should return an empty ChildType', () => {
    assert.deepEqual([], stringToChildTypes(''));
  });
  it('[0..1] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child?'));
  });
  it('[1..1] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: true,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child'));
  });
  it('[0..n] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: false,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child*'));
  });
  it('[1..n] should return the correct ChildType', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    }] as ChildTypes, stringToChildTypes('child+'));
  });
  it('[0..1] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: false,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child?'));
  });
  it('[1..1] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: true,
      required: true,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child'));
  });
  it('[0..n] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: false,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child*'));
  });
  it('[1..n] should return the correct ChildType (group)', () => {
    assert.deepEqual([{
      name: 'child',
      single: false,
      required: true,
      isGroup: true,
    }] as ChildTypes, stringToChildTypes('%child+'));
  });
});