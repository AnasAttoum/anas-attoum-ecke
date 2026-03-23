import { Mark } from '@tiptap/core';

export const Span = Mark.create({
  name: 'span',

  addAttributes() {
    return {
      class: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
});