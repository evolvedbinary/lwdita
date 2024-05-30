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

import { expect, assert } from 'chai';
import { AbstractBaseNode } from '../nodes/base';
import { NonAcceptedChildError } from '../ast-classes';
import { stringToChildTypes } from '../ast-utils';

// TODO: add tests for an unknown node
// Not enough information to implement this test

describe('Base Node children (nodes)', () => {
  class ChildNode extends AbstractBaseNode {
    static nodeName = 'child';
  }
  class Child2Node extends AbstractBaseNode {
    static nodeName = 'child2';
  }

  class WrongChildNode extends AbstractBaseNode {
    static nodeName = 'wrong-child';
  }

  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });

    // TODO: add tests for not throwing an exception on wrong children
    // It does throw an exception, why shouldn't it?
    it('should not accept wrong child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new WrongChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
  // TODO: add going back in order tests for nodes
  // TODO: add going back in order tests for groups
  describe('Order', () => {
    it('[0..1] should skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first?', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
  describe('Any order', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)?']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child|child2']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept many children', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)+']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept many children', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)*']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
  });
});

describe('Base Node children (groups)', () => {
  class ChildInlineNode extends AbstractBaseNode {
    static nodeName = 'text';
  }
  class ChildBlockNode extends AbstractBaseNode {
    static nodeName = 'video';
  }
  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
  });
  describe('Order', () => {
    it('[0..1] should skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first?', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
  describe('Any order', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)?']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline|%all-blocks']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept many children', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)+']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should accept many children', () => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)*']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });

    it.skip('order for groups',() => {
      class ParentNode extends AbstractBaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-block*, %all-inline*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
  });
});

describe('JDita', () => {
  it('Empty node', () => {
    class Node extends AbstractBaseNode {
      static nodeName = 'node';
    }
    const node = new Node();
    assert.deepEqual(node.json, {
        nodeName: 'node',
        attributes: undefined,
        children: undefined,
    });
  });
  it('Empty node with attributes', () => {
    class Node extends AbstractBaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
    }
    const node = new Node({});
    assert.deepEqual(node.json, {
        nodeName: 'node',
        attributes: {
          field1: undefined,
          field2: undefined,
        },
        children: undefined,
    });
  });
  it('Empty node with attributesand values', () => {
    class Node extends AbstractBaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
    }
    const node = new Node({
      field1: 'value1',
      field2: 'value2',
    });
    assert.deepEqual(node.json, {
        nodeName: 'node',
        attributes: {
          field1: 'value1',
          field2: 'value2',
        },
        children: undefined,
    });
  });
  it('Empty node with a child node', () => {
    class ParentNode extends AbstractBaseNode {
      static nodeName = 'parent';
      static fields = ['parent-field1', 'parent-field2'];
      static childTypes = stringToChildTypes(['node*']);
    }
    class Node extends AbstractBaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
    }
    const parentNode = new ParentNode({
      'parent-field1': 'parent-value1',
      'parent-field2': 'parent-value2',
    });
    parentNode.add(new Node({
      field1: 'value1',
      field2: 'value2',
    }));
    assert.deepEqual(parentNode.json, {
      nodeName: 'parent',
      attributes: {
        'parent-field1': 'parent-value1',
        'parent-field2': 'parent-value2',
      },
      children: [{
        nodeName: 'node',
        attributes: {
          field1: 'value1',
          field2: 'value2',
        },
        children: undefined,
      }],
    });
  });
  it('Empty node with children of children', () => {
    class ParentNode extends AbstractBaseNode {
      static nodeName = 'parent';
      static fields = ['parent-field1', 'parent-field2'];
      static childTypes = stringToChildTypes(['node*']);
    }
    class Node extends AbstractBaseNode {
      static nodeName = 'node';
      static fields = ['field1', 'field2'];
      static childTypes = stringToChildTypes(['node*']);
    }
    const parentNode = new ParentNode({
      'parent-field1': 'parent-value1',
      'parent-field2': 'parent-value2',
    });
    const node = new Node({
      field1: 'value1',
      field2: 'value2',
    });
    parentNode.add(node);
    node.add(new Node({
      field1: 'sub value1',
      field2: 'sub value2',
    }));
    node.add(new Node({
      field1: 'sub value3',
      field2: 'sub value4',
    }));
    assert.deepEqual(parentNode.json, {
      nodeName: 'parent',
      attributes: {
        'parent-field1': 'parent-value1',
        'parent-field2': 'parent-value2',
      },
      children: [{
        nodeName: 'node',
        attributes: {
          field1: 'value1',
          field2: 'value2',
        },
        children: [{
          nodeName: 'node',
          attributes: {
            field1: 'sub value1',
            field2: 'sub value2',
          },
          children: undefined,
        }, {
          nodeName: 'node',
          attributes: {
            field1: 'sub value3',
            field2: 'sub value4',
          },
          children: undefined,
        }],
      }],
    });
  });
});
