import { Component, OnInit } from '@angular/core';
import { PlotDbService, PlotItem } from 'src/services/plot-db.service';

@Component({
  templateUrl: './plot-tutorial.component.html',
  styleUrls: ['./plot-tutorial.component.scss'],
})
export class PlotTutorialComponent implements OnInit {
  constructor(private _service: PlotDbService) {}

  public plotItems: PlotItem[] = [];

  public graph = {
    data: [
      {
        x: [0],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'red' },
      },
      {
        x: [0],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'blue' },
      },
      {
        x: [0],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'black' },
      },
    ],
    layout: { width: 1500, height: 500, title: 'Random Data' },
  };

  public AddCount:number = 10;
  public AddGroup:number = 2;
  public XMin:number = 1;
  public XMax:number = 1000;
  public Ymin:number = 1;
  public YMax:number = 1000

  ngOnInit(): void {
    this.init();
  }
  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  private generateRandomData(): PlotItem[] {
    let result: PlotItem[] = [];
    for (let i = 0; i < this.AddCount; i++) {
      result.push({
        x: this.randomIntFromInterval(this.XMin, this.XMax),
        y: this.randomIntFromInterval(this.Ymin, this.YMax),
        type: this.randomIntFromInterval(0, this.AddGroup),
      });
    }
    return result;
  }

  public async Get() {
    this.plotItems = await this._service.GetAll();

    this.graph.data[0].x = this.plotItems
      .filter((x) => x.type == 0)
      .map((i) => i.x);
    this.graph.data[0].y = this.plotItems
      .filter((x) => x.type == 0)
      .map((i) => i.y);

    this.graph.data[1].x = this.plotItems
      .filter((x) => x.type == 1)
      .map((i) => i.x);
    this.graph.data[1].y = this.plotItems
      .filter((x) => x.type == 0)
      .map((i) => i.y);

    this.graph.data[2].x = this.plotItems
      .filter((x) => x.type == 2)
      .map((i) => i.x);
    this.graph.data[2].y = this.plotItems
      .filter((x) => x.type == 0)
      .map((i) => i.y);
  }

  public async init() {
    await this._service.Connect();
  }

  public async Clear(): Promise<void> {
    await this._service.DeleteDatabase();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await this._service.Connect();
  }

  public async Push() {
    await this._service.BulkAdd(this.generateRandomData());
    await this.Get();
  }
}
