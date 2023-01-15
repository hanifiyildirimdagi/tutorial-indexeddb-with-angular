  import { Component, OnInit } from '@angular/core';
import { paths } from '../app-routing.module';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  path = paths;
  constructor() { }

  ngOnInit(): void {
  }

}
