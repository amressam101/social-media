import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Isave } from '../../../core/models/save/isave.interface';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SinglePostComponent } from "../single-post/single-post.component";
import { Ipost } from '../../../core/models/Ipost/ipost.interface';

@Component({
  selector: 'app-saved-posts',
  imports: [DatePipe, SinglePostComponent, RouterLink],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent implements OnInit, DoCheck {
  showImage: boolean = false;
  selectedPostId: string | null = null;
  isLoading: boolean = false;


  thePostIsDeleteSaved: boolean = false;
  thePostIsUpadteSaved: boolean = false;

  savePostsList: Isave[] = [];
  postList: Ipost[] = [];
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  profileUrl: any;

  refreshCurrentPageData() {
    if (this.thePostIsDeleteSaved) {
      this.getBookMarkPosts();
      this.thePostIsDeleteSaved = false;
    } else if (this.thePostIsUpadteSaved) {
      this.getBookMarkPosts();
      this.thePostIsUpadteSaved = false;
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

  getBookMarkPosts() {
    this.isLoading = true;
    this.userService.getBookMarkPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.savePostsList = res.data.bookmarks
          this.postList = res.data.bookmarks

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
    this.getBookMarkPosts();
  }

  ngDoCheck(): void {
    this.refreshCurrentPageData();
  }

}
