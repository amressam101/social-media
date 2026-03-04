import { Component, DoCheck, ElementRef, EventEmitter, HostListener, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Ipost } from '../../../core/models/Ipost/ipost.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { PostsService } from '../../../core/services/posts/posts.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-single-post',
  imports: [DatePipe, CommonModule, CommentsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit, OnChanges {
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  @Input() post!: Ipost
  isCommentCreate: boolean = false;
  // varibale to Delete 
  @Output() isDelataPostFeed: EventEmitter<boolean> = new EventEmitter()
  @Output() isDelataPostAll: EventEmitter<boolean> = new EventEmitter()
  @Output() isDelataMyPosts: EventEmitter<boolean> = new EventEmitter()
  @Output() isDelataPostSaved: EventEmitter<boolean> = new EventEmitter()
  // varibale to Update 
  @Output() isUpdatePostFeed: EventEmitter<boolean> = new EventEmitter()
  @Output() isUpdatePostAll: EventEmitter<boolean> = new EventEmitter()
  @Output() isUpdateMyPosts: EventEmitter<boolean> = new EventEmitter()
  @Output() isUpdatePostSaved: EventEmitter<boolean> = new EventEmitter()
  userName: string = '';
  userImage: string = '';
  menuList: boolean = false;
  showImage: boolean = false;
  isLoading: boolean = false;
  isLoadingDelete: boolean = false;
  isLoadingUpdate: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  postLike: boolean = false;
  selectedPostId: string | null = null;

  private readonly userService = inject(UserService);
  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  private readonly router = inject(Router)
  commentvalue: FormControl = new FormControl(null, [Validators.required])
  postValue: FormControl = new FormControl(null, [Validators.required])


  showModalUpdate() {
    this.isUpdate = true;
    this.menuList = false;
  }

  showModel() {
    this.isDelete = true;
    this.menuList = false;
  }

  closeTheModel() {
    this.isDelete = false;
    this.isUpdate = false;
  }
  // for Delete 
  sendOutPutToParent() {
    const url = this.router.url;
    if (url.includes('feed')) {
      this.isDelataPostFeed.emit(true)
    } else if (url.includes('community')) {
      this.isDelataPostAll.emit(true)
    } else if (url.includes('my-posts')) {
      this.isDelataMyPosts.emit(true)
    } else if (url.includes('saved')) {
      this.isDelataPostSaved.emit(true)
    }
  }
  // for Update 
  sendOutPutToParentUpdate() {
    const url = this.router.url;
    if (url.includes('feed')) {
      this.isUpdatePostFeed.emit(true)
    } else if (url.includes('community')) {
      this.isUpdatePostAll.emit(true)
    } else if (url.includes('my-posts')) {
      this.isUpdateMyPosts.emit(true)
    } else if (url.includes('saved')) {
      this.isUpdatePostSaved.emit(true)
    }
  }


  updatePost(e: SubmitEvent, postId: string) {
    this.isLoadingUpdate = true
    e.preventDefault();
    if (this.postValue.valid) {
      let formDate = new FormData()
      formDate.append("body", this.postValue.value)
      this.postsService.updatePost(postId, formDate).subscribe({
        next: (res) => {
          if (res.success) {
          }

        },
        error: (err) => {
          console.log(err);
          this.isLoadingUpdate = false;
          this.isUpdate = false;

        },
        complete: () => {
          this.sendOutPutToParentUpdate();
          this.isLoadingUpdate = false;
          this.isUpdate = false;
        }
      })
    }
  }

  createComment(e: SubmitEvent, commentId: string) {
    this.isLoading = true;
    e.preventDefault();
    if (this.commentvalue.valid) {
      let formData = new FormData()
      formData.append("content", this.commentvalue.value);
      this.commentsService.createComment(commentId, formData).subscribe({
        next: (res) => {
          if (res.success) {
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.commentvalue.reset();
          this.isCommentCreate = true;
        }
      })
    }

  }

  deletePost(postId: string) {
    this.isLoadingDelete = true;
    this.isDelete = true;
    this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        if (res.success) {
        }
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        this.sendOutPutToParent();
        this.menuList = false;
        this.isLoadingDelete = false;
        this.isDelete = false;
      }
    })
  }

  ClickLike(postId: string) {
    this.postsService.toggleLikePost(postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.postLike = res.data.liked
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  toggelList() {
    this.menuList = !this.menuList;
  }
  @HostListener('document:click', ['$event'])
  hideMenu(event: MouseEvent) {
    if (!this.menuList) return;

    const clickedInside =
      this.menuContainer?.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.menuList = false;
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

  getIdMyProfile() {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.userName = res.data.user.username
          this.userImage = res.data.user.photo
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  ngOnInit(): void {
    this.getIdMyProfile();

  }

  ngOnChanges(): void {
    if (this.post) {
      this.postValue.setValue(this.post.body);
    }
  }

}
