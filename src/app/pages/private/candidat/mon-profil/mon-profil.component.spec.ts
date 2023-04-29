import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonProfilCandidatComponent } from './mon-profil.component';

describe('MonProfilCandidatComponent', () => {
  let component: MonProfilCandidatComponent;
  let fixture: ComponentFixture<MonProfilCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonProfilCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonProfilCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
