import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Ifollower } from '../../../core/models/follower/ifollower.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-suggested-friends',
  imports: [RouterLink],
  templateUrl: './suggested-friends.component.html',
  styleUrl: './suggested-friends.component.css',
})
export class SuggestedFriendsComponent implements OnInit {
  isLoading: boolean = false;
  @Input() isSideBar: boolean = false;

  private readonly userService = inject(UserService)
  limitNumber: number = 5
  followList: Ifollower[] = [];



  getSuggestionsFollow() {
    this.isLoading = true;
    this.userService.getSuggestionsFollow(this.limitNumber).subscribe({
      next: (res) => {
        if (res.success) {
          this.followList = res.data.suggestions
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
    this.getSuggestionsFollow()
  }
}
