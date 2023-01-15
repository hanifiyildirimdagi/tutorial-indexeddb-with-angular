import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotTutorialComponent } from './plot-tutorial.component';

describe('PlotTutorialComponent', () => {
  let component: PlotTutorialComponent;
  let fixture: ComponentFixture<PlotTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
