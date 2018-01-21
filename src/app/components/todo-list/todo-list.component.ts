import {Component, OnInit} from '@angular/core';
import {ITodoItemState} from "../../redux/reducers/todoItemsReducer";
import {Store} from "@ngrx/store";
import * as Immutable from 'immutable';
import {TodoFilterComponent} from "../todo-filter/todo-filter.component";

import {editItemTitle, removeItem, editItemDescription} from '../../redux/actions/todoItemsActions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  title = 'app';
  items = [];
  filteredItems = [];
  filter:TodoFilterComponent;

  constructor(private store: Store<ITodoItemState>) {
    store.subscribe(result => {
      this.items = result.toJS();
      this.filteredItems = this.items;
    });
  }

  onRemoveItem(id) {
    this.store.dispatch(removeItem(id));
  }

  onEditTitle(item, newTitle) {
    if (item.title !== newTitle)
      this.store.dispatch(editItemTitle(item.id, newTitle));
  }

  onEditDescription(item, newDescription) {
    if (item.description !== newDescription)
      this.store.dispatch(editItemDescription(item.id, newDescription));
  }

  ngOnInit() {
    this.filter.filterItems('', '');
  }
}
