import { Component, DoCheck, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Icomment } from '../../../core/models/Icomment/icomment.interface';
import { UserService } from '../../../core/services/user/user.service';
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit, OnChanges {
  isLoading: boolean = false;
  isLoadingDelete: boolean = false;
  isLoadingUpdate: boolean = false;
  menuList: boolean = false;
  myUserName: string = '';
  isDelete: boolean = false;
  isUpdate: boolean = false;
  @Input({ required: true }) postIdComment: string = '';
  @Input({ required: true }) theCommentIsCreate!: boolean
  MyCommentValue: FormControl = new FormControl(null, [Validators.required])
  private readonly commentsService = inject(CommentsService);
  private readonly userService = inject(UserService);
  commentList: Icomment[] = [];



  sendInPutToParent() {
    if (this.theCommentIsCreate) {
      this.getPostComments();
      this.theCommentIsCreate = false;
    }
  }

  toggelList() {
    this.menuList = !this.menuList;
  }

  showModel() {
    this.isDelete = true;
  }

  closeTheModel() {
    this.isDelete = false;
    this.isUpdate = false;
  }

  startEdit(comment: Icomment) {
    this.isUpdate = true;
    this.menuList = false;
    this.MyCommentValue.setValue(comment.content);
  }

  upadateComment(e: SubmitEvent, postId: string, commentId: string) {
    this.isLoadingUpdate = true;
    e.preventDefault();
    if (this.MyCommentValue.valid) {
      let forDate = new FormData()
      forDate.append("content", this.MyCommentValue.value)
      this.commentsService.updateComment(postId, forDate, commentId).subscribe({
        next: (res) => {
          if (res.success) {
          }

        },
        error: (err) => {
          console.log(err);
          this.isLoadingUpdate = false
          this.isUpdate = false;

        },
        complete: () => {
          this.isLoadingUpdate = false
          this.isUpdate = false;
          this.getPostComments();
        }
      })
    }
  }

  deleteComment(commentId: string, postId: string) {
    this.isLoadingDelete = true;
    this.isDelete = true;
    this.commentsService.deleteComment(postId, commentId).subscribe({
      next: (res) => {
        if (res.success) {

        }
      },
      error: (err) => {
        console.log(err);
        this.isLoadingDelete = false;
        this.isDelete = false;
      },
      complete: () => {
        this.menuList = false;
        this.isLoadingDelete = false;
        this.isDelete = false;
        this.getPostComments()
      }
    })
  }

  getPostComments() {
    this.isLoading = true;
    this.commentsService.getPostComments(this.postIdComment).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentList = res.data.comments
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


  getMyUserName() {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.myUserName = res.data.user.username;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnInit(): void {
    this.getMyUserName();
    this.getPostComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theCommentIsCreate'] && changes['theCommentIsCreate'].currentValue) {
      if (this.theCommentIsCreate) {
        this.getPostComments();
      }
    }
  }
}