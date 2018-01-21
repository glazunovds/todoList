import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import reducer from './redux/reducers/todoItemsReducer';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { PaginationComponent } from './components/pagination/pagination.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    PaginationComponent,
    TodoAddComponent,
    TodoFilterComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
