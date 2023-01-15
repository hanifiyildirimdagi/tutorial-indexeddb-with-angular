import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { PlotTutorialComponent } from './plot-tutorial/plot-tutorial.component';
import { HomeComponent } from './home/home.component';

export const paths = {
  TodoApp: 'todo-app',
  Plot: 'plot-tutorial',
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: paths.TodoApp,
    component: TodoAppComponent,
  },
  {
    path: paths.Plot,
    component: PlotTutorialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
