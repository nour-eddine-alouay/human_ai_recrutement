import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonProfilRecruteurComponent } from './mon-profil.component';

describe('MonProfilRecruteurComponent', () => {
  let component: MonProfilRecruteurComponent;
  let fixture: ComponentFixture<MonProfilRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonProfilRecruteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonProfilRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
