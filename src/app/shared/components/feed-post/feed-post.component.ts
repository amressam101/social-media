import { Component, DoCheck, inject } from '@angular/core';
import { SinglePostComponent } from "../single-post/single-post.component";
import { Ipost } from '../../../core/models/Ipost/ipost.interface';
import { PostsService } from '../../../core/services/posts/posts.service';

@Component({
  selector: 'app-feed-post',
  imports: [SinglePostComponent],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css',
})
export class FeedPostComponent implements DoCheck {

  private readonly postsService = inject(PostsService);
  isLoading: boolean = false;
  postList: Ipost[] = [];
  thePostIsDeleteFeed: boolean = false;
  thePostIsUpadteFeed: boolean = false;


  refreshCurrentPageData() {
    if (this.thePostIsDeleteFeed) {
      this.getPostsHomeFeed();
      this.thePostIsDeleteFeed = false;
    } else if (this.thePostIsUpadteFeed) {
      this.getPostsHomeFeed();
      this.thePostIsUpadteFeed = false;
    }
  }

  getPostsHomeFeed() {
    this.isLoading = true;
    this.postsService.getPostsHomeFeed().subscribe({
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
        this.isLoading = false;
      }
    })
  }


  ngOnInit(): void {
    this.getPostsHomeFeed();
  }

  ngDoCheck(): void {
    this.refreshCurrentPageData();
  }


}
