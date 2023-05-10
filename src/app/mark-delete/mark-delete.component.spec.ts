import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDeleteComponent } from './mark-delete.component';

describe('MarkDeleteComponent', () => {
  let component: MarkDeleteComponent;
  let fixture: ComponentFixture<MarkDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
