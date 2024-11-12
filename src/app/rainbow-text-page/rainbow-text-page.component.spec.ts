import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowTextPageComponent } from './rainbow-text-page.component';

describe('RainbowTextPageComponent', () => {
  let component: RainbowTextPageComponent;
  let fixture: ComponentFixture<RainbowTextPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RainbowTextPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RainbowTextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
