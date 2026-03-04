import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { SideNavComponent } from "../../shared/components/side-nav/side-nav.component";
import { CreatePostComponent } from '../../shared/components/create-post/create-post.component';
import { SuggestedFriendsComponent } from '../../shared/components/suggested-friends/suggested-friends.component';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-home',
  imports: [SideNavComponent, CreatePostComponent, SuggestedFriendsComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private token: string | null = null;
  private readonly platFormId = inject(PLATFORM_ID)
  showSuggestedFriends: boolean = false;



  getToken() {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token')
      }
    }
  }
  toggleSuggestedFriends() {
    this.showSuggestedFriends = !this.showSuggestedFriends;
  }

  ngOnInit(): void {
    this.getToken();
  }

}
