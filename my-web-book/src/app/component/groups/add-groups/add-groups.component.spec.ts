import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupsComponent } from './add-groups.component';

describe('AddGroupsComponent', () => {
  let component: AddGroupsComponent;
  let fixture: ComponentFixture<AddGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
