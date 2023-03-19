import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerTableComponent } from './video-player-table.component';

describe('TableRecordComponent', () => {
  let component: VideoPlayerTableComponent;
  let fixture: ComponentFixture<VideoPlayerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
