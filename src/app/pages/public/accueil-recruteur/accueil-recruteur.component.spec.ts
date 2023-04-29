import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilRecruteurComponent } from './accueil-recruteur.component';

describe('AccueilRecruteurComponent', () => {
  let component: AccueilRecruteurComponent;
  let fixture: ComponentFixture<AccueilRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilRecruteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
