import { UserService } from './../../core/services/user/user.service';
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Ifollower } from '../../core/models/follower/ifollower.interface';

@Component({
  selector: 'app-all-suggested-friends',
  imports: [],
  templateUrl: './all-suggested-friends.component.html',
  styleUrl: './all-suggested-friends.component.css',
})
export class AllSuggestedFriendsComponent implements OnInit {
  isLoading: boolean = false;
  limitNumber: number = 20;
  private location = inject(Location);
  private userService = inject(UserService);
  userList: Ifollower[] = [];

  goBack() {
    this.location.back();
  }

  getMoreUsers() {
    this.limitNumber += 20;
    this.getAllSuggestedFriends();
  }

  getAllSuggestedFriends() {
    this.isLoading = true;
    this.userService.getSuggestionsFollow(this.limitNumber).subscribe({
      next: (res) => {
        if (res.success) {
          this.userList = res.data.suggestions
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }


  ngOnInit(): void {
    this.getAllSuggestedFriends()
  }
}
