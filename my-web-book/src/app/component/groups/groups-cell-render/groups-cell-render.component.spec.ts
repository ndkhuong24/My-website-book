import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsCellRenderComponent } from './groups-cell-render.component';

describe('GroupsCellRenderComponent', () => {
  let component: GroupsCellRenderComponent;
  let fixture: ComponentFixture<GroupsCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsCellRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
