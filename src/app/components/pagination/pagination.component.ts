import {Component, Input, OnInit} from '@angular/core';
import {TodoListComponent} from "../todo-list/todo-list.component";

import _ from 'lodash';
import {TodoFilterComponent} from "../todo-filter/todo-filter.component";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {

  pageItems = 8;
  currentPage = 1;
  totalPages = 1;
  pagesArr = [];
  items = [];
  filter: TodoFilterComponent;

  constructor(@Input() items: TodoListComponent) {
    this.items = items.items;
    this.recountPages();
  }

  recountPages() {
    this.totalPages = Math.ceil(this.items.length / this.pageItems);
    this.pagesArr = _.range(1, this.totalPages + 1);
  }

  changePage(sign, lastPage = null, remove = false) {
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
    this.filter.filterItems("", "", this.currentPage);
  }

  ngOnInit() {
  }

}
