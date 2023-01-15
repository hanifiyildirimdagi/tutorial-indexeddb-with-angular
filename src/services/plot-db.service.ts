import { Injectable } from '@angular/core';
import { IndexedDb } from './indexed-db.service';

export interface PlotItem {
  id?: number;
  x: number;
  y: number;
  type:number;
}

@Injectable({
  providedIn: 'root',
})
export class PlotDbService extends IndexedDb<PlotItem> {
  constructor() {
    super('PlotTutorial', {
      primaryKey: 'id',
      tableName: 'PlotStore',
      autoIncrament: true,
    });
  }
}
