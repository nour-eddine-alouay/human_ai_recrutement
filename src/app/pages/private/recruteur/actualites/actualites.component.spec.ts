import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitesRecruteurComponent } from './actualites.component';

describe('ActualitesRecruteurComponent', () => {
  let component: ActualitesRecruteurComponent;
  let fixture: ComponentFixture<ActualitesRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualitesRecruteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualitesRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
