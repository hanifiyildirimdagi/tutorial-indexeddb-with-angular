import { Component, OnInit } from '@angular/core';
import { TodoItem, TodoItemDbService } from 'src/services/todo-item-db.service';

@Component({
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent implements OnInit {
  constructor(private _service: TodoItemDbService) {}

  public TaskName: string = '';
  public List: TodoItem[] = [];

  ngOnInit(): void {
    this.init();
  }

  private async init(): Promise<void> {
    await this._service.Connect();
    await this.GetList();
  }

  private uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  public async Save(): Promise<void> {
    if (this.TaskName.replace(/\ /g, '') == '') return;
    await this._service.Add({
      checked: false,
      id: this.uuid(),
      name: this.TaskName,
    });
    this.TaskName = '';
    await this.GetList();
  }

  public async GetList(): Promise<void> {
    this.List = await this._service.GetAll();
  }

  public async ChangeCheck(checked: boolean, item: TodoItem): Promise<void> {
    await this._service.Update(item);
    await this.GetList();
  }

  public async Delete(id: string): Promise<void> {
    await this._service.Delete(id);
    await this.GetList();
  }
}
