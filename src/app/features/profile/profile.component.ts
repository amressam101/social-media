import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { Iuser } from './../../core/models/user/iuser.interface';
import { MyPostsComponent } from "../../shared/components/my-posts/my-posts.component";
import { SavedPostsComponent } from "../../shared/components/saved-posts/saved-posts.component";
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-profile',
  imports: [MyPostsComponent, SavedPostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  uploadFile: File | null = null;
  errorMsg: string = ''
  showImage: boolean = false;
  showPosts: boolean = true;
  userData: Iuser | null = null;
  userName: string = '';
  private readonly userService = inject(UserService)
  private readonly title = inject(Title)

  // function to show the model imgae
  showTheImage() {
    this.showImage = !this.showImage;
  }

  // function to toggle bettwen component (my posts && saved)
  toggleThePosts() {
    this.showPosts = !this.showPosts;
  }
  perpareUploadFile(e: Event) {
    let input = e.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // نتأكد إنه صورة
      if (file.type.startsWith('image/')) {
        this.uploadFile = file;
      } else {
        console.log('Please select an image file');
        this.uploadFile = null;
      }
    }
  }

  changePhoto() {
    if (!this.uploadFile) {
      this.errorMsg = 'No image selected'
      return;
    }
    let formDate = new FormData()
    formDate.append('photo', this.uploadFile)
    this.userService.uploadProfilePhoto(formDate).subscribe({
      next: (res) => {
        if (res.success) {
          this.getMyProfile();
          console.log(res);
        }

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setPageTitle() {
    this.title.setTitle(`${this.userName} profile | Route Posts`)
  }

  // function to call api 
  getMyProfile() {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.userName = res.data.user.name
          this.userData = res.data.user
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.setPageTitle();
      }
    })
  }

  ngOnInit(): void {
    this.getMyProfile()
  }

}
