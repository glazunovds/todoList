export const actions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  EDIT_ITEM_TITLE: 'EDIT_ITEM_TITLE',
  EDIT_ITEM_DESCRIPTION: 'EDIT_ITEM_DESCRIPTION',
};

export function addItem(title, description) {
  return {
    type: actions.ADD_ITEM,
    payload: {
      title,
      description,
    },
  };
}

export function removeItem(id) {
  return {
    type: actions.REMOVE_ITEM,
    payload: {
      id
    }
  }
}

export function editItemTitle(id, title) {
  return {
    type: actions.EDIT_ITEM_TITLE,
    payload: {
      id,
      title
    }
  }
}

export function editItemDescription(id, description) {
  return {
    type: actions.EDIT_ITEM_DESCRIPTION,
    payload: {
      id,
      description
    }
  }
}
