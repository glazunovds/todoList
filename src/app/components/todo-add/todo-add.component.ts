import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {ITodoItemState} from "../../redux/reducers/todoItemsReducer";

import {addItem} from '../../redux/actions/todoItemsActions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})

export class TodoAddComponent implements OnInit {

  constructor(private store: Store<ITodoItemState>) {

  }

  onAddItem(title, description) {
    this.store.dispatch(addItem(title, description));
  }

  ngOnInit() {
  }

}
