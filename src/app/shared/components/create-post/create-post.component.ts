import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../core/services/posts/posts.service';


@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly userService = inject(UserService);

  isLoading: boolean = false;
  userName: string = ''
  userImage: string = ''
  // uploaded file 
  uploadedFile: any;
  // input file 
  postDescription: FormControl = new FormControl('', [Validators.required,])

  perpareUploadFile(e: Event) {
    let input = e.target as HTMLInputElement
    if (input) {
      if (input.files) {
        this.uploadedFile = input.files[0];
      }
    }
  }

  /** Resets all form fields to their initial state */
  clearInput() {
    this.postDescription.reset();
  }


  getPostsHomeFeed() {
    this.postsService.getPostsHomeFeed().subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllPost() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getMyProfile() {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.userName = res.data.user.name
          this.userImage = res.data.user.photo
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  createPost(e: SubmitEvent) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('body', this.postDescription.value)
    if (this.uploadedFile) {
      formData.append('image', this.uploadedFile)
    }
    this.isLoading = true;
    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.clearInput();
        this.isLoading = false;

      }
    })
  }


  ngOnInit(): void {
    this.getMyProfile()
  }

}
