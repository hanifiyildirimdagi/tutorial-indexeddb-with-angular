import { Injectable } from '@angular/core';
import { IndexedDb } from './indexed-db.service';

export interface TodoItem {
  id: string;
  name: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoItemDbService extends IndexedDb<TodoItem> {
  constructor() {
    super('TodoApp', {
      primaryKey: 'id',
      tableName: 'TodoItems',
    });
    this.Connect();
  }
}
