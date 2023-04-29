import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCandidatComponent } from './navbar.component';

describe('NavCandidatComponent', () => {
  let component: NavCandidatComponent;
  let fixture: ComponentFixture<NavCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
