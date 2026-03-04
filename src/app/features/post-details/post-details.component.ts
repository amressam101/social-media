import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';
import { Ipost } from '../../core/models/Ipost/ipost.interface';
import { SinglePostComponent } from "../../shared/components/single-post/single-post.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [SinglePostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly postsService = inject(PostsService)
  private location = inject(Location);
  postId: string | null = null
  post!: Ipost;


  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.getPostIdFromRoute();
  }

  getPostIdFromRoute() {
    this.activatedRoute.paramMap.subscribe((url) => {
      if (url.get('id')) {
        this.postId = url.get('id')
        this.getPostDetails();
      }
    })
  }

  getPostDetails() {
    this.postsService.getSinglePost(this.postId!).subscribe({
      next: (res) => {
        if (res.success) {
          this.post = res.data.post
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


}
