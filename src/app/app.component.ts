import { Component, OnInit } from '@angular/core';
import { paths } from './app-routing.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tutorial-indexed-db';

  public Navigations = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: paths.TodoApp,
      text: 'ToDo App',
    },
    {
      path: paths.Plot,
      text: 'Plot Tutorial',
    },
  ];

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    // this._db.Connect('PROJECT').then(async () => {
    //   await this.Count();
    // });
  }

  // public Length = 0;
  // public Stop = true;
  // async Count() {
  //   this.Length = await this._db.Length();
  // }

  // async Add() {
  //   this.Stop = false;
  //   // var tasks: Promise<void>[] = [];
  //   // for (let index = 0; index < 100000; index++) {
  //   //   tasks.push(this._db.Set());
  //   // }
  //   // await Promise.all(tasks);
  //   // tasks = [];

  //   let items: any[] = [];

  //   for (let i = 0; i < 1000000; i++) {
  //     items.push([i, i, i, i, i, i, i, i, i, i, i, i, i, i, i]);
  //   }

  //   console.log('data ready');

  //   for (let index = 0; index < 1000000; index += 10000) {
  //     const elements = items.slice(index, 10000);
  //     await this._db.BulkAdd(elements);
  //     if (this.Stop) break;
  //   }
  //   await this.Count();

  //   this.Stop = false;
  // }
}
