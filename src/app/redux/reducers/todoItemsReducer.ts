import {Action} from '@ngrx/store';
import uuid from 'uuid/v4';
import * as moment from 'moment';
import {fromJS, List, Map} from 'immutable';

import {actions as A} from '../actions/todoItemsActions';

export type ITodoItemState = List<Map<string, any>>;

function generateData(count) {
  let data = [];
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: uuid(),
      title: `title ${i+1}`,
      description: `description ${i+1}`,
      dateTime: moment().add(Math.floor(Math.random() * 20) - 10, 'days').format('MM.DD.YY'),
    }
  }
  return data;
}

const initialState: ITodoItemState = fromJS(generateData(17));

export default function reducer(state = initialState, action: Action): ITodoItemState {
  switch (action.type) {
    case A.ADD_ITEM:
      return state
        .push(fromJS({
          id: uuid(),
          title: action.payload.title,
          description: action.payload.description,
          dateTime: moment().format('MM.DD.YY'),
        }));
    case A.REMOVE_ITEM:
      return state.filter((el) => el.get('id') !== action.payload.id).toList();
    case A.EDIT_ITEM_TITLE:
      return state.setIn([state.findIndex((el) => el.get('id') == action.payload.id), 'title'], action.payload.title);
    case A.EDIT_ITEM_DESCRIPTION:
      return state.setIn([state.findIndex((el) => el.get('id') == action.payload.id), 'description'], action.payload.description);
    default:
      return state;
  }
}


