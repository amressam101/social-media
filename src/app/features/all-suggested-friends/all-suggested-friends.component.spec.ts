import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuggestedFriendsComponent } from './all-suggested-friends.component';

describe('AllSuggestedFriendsComponent', () => {
  let component: AllSuggestedFriendsComponent;
  let fixture: ComponentFixture<AllSuggestedFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSuggestedFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSuggestedFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
