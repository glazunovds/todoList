import {Component, OnInit} from '@angular/core';
import {ITodoItemState} from "../../redux/reducers/todoItemsReducer";
import {Store} from "@ngrx/store";
import _ from 'lodash';

import {addItem, editItemTitle, removeItem, editItemDescription} from '../../redux/actions/todoItemsActions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  items = [];
  filteredItems = [];
  rightItems = [];
  pageItems = 8;
  currentPage = 1;
  totalPages = 1;
  pagesArr = [];

  constructor(private store: Store<ITodoItemState>) {
    store.subscribe(result => {
      this.items = result.toJS();
      this.filteredItems = this.items;
    });
    this.recountPages();
  }

  recountPages() {
    this.totalPages = Math.ceil(this.rightItems.length / this.pageItems);
    this.pagesArr = _.range(1, this.totalPages + 1);
  }

  onAddItem(title, description) {
    //console.log(title, description);
    this.store.dispatch(addItem(title, description));
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
    this.filterItems('', '');
  }

  changePage(sign, lastPage = null, remove = false, title, dateTime) {
    this.recountPages();
    if (remove) {
      this.currentPage = this.currentPage > this.totalPages ? this.totalPages : this.currentPage;
    }
    if (!lastPage) {
      if (sign > 0 && this.currentPage < this.totalPages) {
        this.currentPage++;
      } else if (sign < 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    } else {
      this.currentPage = this.totalPages;
    }
    this.filterItems(title, dateTime, this.currentPage);
  }

  filterItems(title, dateTime, page = 1) {
    let tempItems = [];
    page--;
    if (title !== '' && dateTime !== '') {
      tempItems = this.items.filter((el) => el.title.indexOf(title) != -1).filter((el) => el.dateTime.indexOf(dateTime) != -1);
    } else {
      if (title !== '') {
        tempItems = this.items.filter((el) => el.title.indexOf(title) != -1);
      } else if (dateTime !== '') {
        tempItems = this.items.filter((el) => el.dateTime.indexOf(dateTime) != -1);
      } else {
        tempItems = this.items;
      }
    }
    this.rightItems = tempItems;
    this.filteredItems = tempItems.slice(page * this.pageItems, (page + 1) * this.pageItems);
    this.recountPages();
  }
}
