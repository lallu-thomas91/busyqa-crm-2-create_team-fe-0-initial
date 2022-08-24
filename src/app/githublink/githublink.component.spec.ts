import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithublinkComponent } from './githublink.component';

describe('GithublinkComponent', () => {
  let component: GithublinkComponent;
  let fixture: ComponentFixture<GithublinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithublinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithublinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
