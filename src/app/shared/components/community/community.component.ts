import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { SinglePostComponent } from "../single-post/single-post.component";
import { Ipost } from '../../../core/models/Ipost/ipost.interface';
import { PostsService } from '../../../core/services/posts/posts.service';

@Component({
  selector: 'app-community',
  imports: [SinglePostComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css',
})
export class CommunityComponent implements OnInit, DoCheck {

  private readonly postsService = inject(PostsService);
  isLoading: boolean = false;
  postList: Ipost[] = [];

  thePostIsDeleteAll: boolean = false;
  thePostIsUpadteAll: boolean = false;



  refreshCurrentPageData() {
    if (this.thePostIsDeleteAll) {
      this.getAllPosts();
      this.thePostIsDeleteAll = false;
    } else if (this.thePostIsUpadteAll) {
      this.getAllPosts();
      this.thePostIsUpadteAll = false;
    }
  }

  getAllPosts() {
    this.isLoading = true
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.postList = res.data.posts
        }

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }


  ngOnInit(): void {
    this.getAllPosts();
  }

  ngDoCheck(): void {
    this.refreshCurrentPageData();
  }

}
