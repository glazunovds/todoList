import { Component, OnInit, Input } from '@angular/core';
import {TodoListComponent} from "../todo-list/todo-list.component";
import {PaginationComponent} from '../pagination/pagination.component';
@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})

export class TodoFilterComponent implements OnInit {

  items:TodoListComponent;
  pagination:PaginationComponent;
  filteredItems = [];
  constructor(private filter: TodoFilterComponent) {

  }

  filterItems(rowName, value, page = 1) {
    let tempItems = [];
    page--;
    if (value !== '') {
      switch (rowName) {
        case 'title':
          tempItems = this.items.items.filter((el) => el.title.indexOf(value) !== -1);
        case 'dateTime':
          tempItems = this.items.items.filter((el) => el.dateTime.indexOf(value) !== -1)
      }
    } else {
      tempItems = this.items.items;
    }
    this.filteredItems = tempItems.slice(page * this.pagination.pageItems, (page + 1) * this.pagination.pageItems);
    console.log(tempItems.slice(page * this.pagination.pageItems, (page + 1) * this.pagination.pageItems))
  }

  ngOnInit() {
  }

}
