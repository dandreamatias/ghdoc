import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDocumentationComponent } from './home-documentation.component';

describe('HomeDocumentationComponent', () => {
  let component: HomeDocumentationComponent;
  let fixture: ComponentFixture<HomeDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
