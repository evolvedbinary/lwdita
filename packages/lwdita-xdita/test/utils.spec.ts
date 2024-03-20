// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { expect, assert } from 'chai';
import { stringToChildTypes, splitTypenames, childTypesToString, customChildTypesToString, has, isOrUndefined, childTypeToString, acceptsNodeName, isChildTypeSingle } from '../utils';
import { ChildType, ChildTypes } from '../classes';

// TODO: add a test for getting child types from: (X+|Y*|Z*)
// TODO: add a test for getting string from child type of group '%XYZ*' => (X|Y|Z)*
// TODO: add tests to check required/single for strings

const mockedNodeGroups = {
  'data': ['data'],
};  

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

describe('childTypeToString', () => {
  const mockedNodeGroups = {
    'data': ['data'],
    'group1': ['node1', 'node2'],
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
      name: 'group1',
      single: true,
      required: false,
      isGroup: false,
    };
    const result = childTypeToString(type, mockedNodeGroups);
    expect(result).to.equal('(node1|node2)?');
  });
});

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

describe('isChildTypeSingle', () => {
  it('should return true for a single child type', () => {
    const childType = {
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    };
    const result = isChildTypeSingle(childType);
    expect(result).to.be.true;
  });

  it('should return true for a string', () => {
    const child = 'child';
    const result = isChildTypeSingle(child);
    expect(result).to.be.true;
  });

  it.skip('should return false for a string', () => {
    const child = 'child?';
    const result = isChildTypeSingle(child);
    expect(result).to.be.false;
  });

  it('should return true for a string', () => {
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