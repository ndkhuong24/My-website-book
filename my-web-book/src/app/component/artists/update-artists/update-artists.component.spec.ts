import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArtistsComponent } from './update-artists.component';

describe('UpdateArtistsComponent', () => {
  let component: UpdateArtistsComponent;
  let fixture: ComponentFixture<UpdateArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateArtistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
