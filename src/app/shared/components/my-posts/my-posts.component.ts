import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { ImyPosts } from '../../../core/models/my-posts/imy-posts.interface';
import { DatePipe } from '@angular/common';
import { SinglePostComponent } from "../single-post/single-post.component";
import { Ipost } from '../../../core/models/Ipost/ipost.interface';

@Component({
  selector: 'app-my-posts',
  imports: [DatePipe, SinglePostComponent, RouterLink],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit, DoCheck {
  showImage: boolean = false;
  selectedPostId: string | null = null;
  showPosts: boolean = true;
  isLoading: boolean = false;
  userId: string = ''
  myPostsList: ImyPosts[] = [];
  postList: Ipost[] = [];

  theMyPostIsDelete: boolean = false
  theUpdateMyPosts: boolean = false;


  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  profileUrl: any;



  refreshCurrentPageData() {
    if (this.theMyPostIsDelete) {
      this.getMyProfile();
      this.theMyPostIsDelete = false;
    } else if (this.theUpdateMyPosts) {
      this.getMyProfile();
      this.theUpdateMyPosts = false;
    }
  }

  // function to check of url 
  cheakOfUrl(): boolean {
    if (this.router.url.includes("profile")) {
      return true
    } else {
      return false;
    }
  }



  // function to get the id of post 
  getIdOfImage(id: string) {
    this.selectedPostId = id;
  }
  // function to remove the id in close the post 
  removeIdOfImage() {
    this.selectedPostId = null;
  }

  // function to show the model imgae
  showTheImage(id: string) {
    this.showImage = !this.showImage;
    this.getIdOfImage(id);
  }
  // function to hide the model imgae
  closeImage() {
    this.showImage = !this.showImage;
    this.removeIdOfImage();
  }


  toggleThePosts() {
    this.showPosts = !this.showPosts;
  }

  getMyProfile() {
    this.isLoading = true;
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.userId = res.data.user.id
        }
      },
      error: (err) => {
        console.log("the id is undfind....");

      },
      complete: () => {
        this.getUserPosts();
      }
    })
  }

  getUserPosts() {
    this.userService.getUserPosts(this.userId).subscribe({
      next: (res) => {
        if (res.success) {
          this.myPostsList = res.data.posts
          this.postList = res.data.posts
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;

      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  ngOnInit(): void {
    this.getMyProfile();

  }
  ngDoCheck(): void {
    this.refreshCurrentPageData();
  }

}
