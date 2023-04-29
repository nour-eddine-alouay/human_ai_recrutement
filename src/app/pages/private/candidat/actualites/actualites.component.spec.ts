import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitesCandidatComponent } from './actualites.component';

describe('ActualitesCandidatComponent', () => {
  let component: ActualitesCandidatComponent;
  let fixture: ComponentFixture<ActualitesCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualitesCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualitesCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
