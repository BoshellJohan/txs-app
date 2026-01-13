import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageTs } from './auth-page.js';

describe('AuthPageTs', () => {
  let component: AuthPageTs;
  let fixture: ComponentFixture<AuthPageTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPageTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
