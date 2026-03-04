import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { NotificationsService } from '../../../core/services/notifications/notifications.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  userName: string = ''
  userImage: string = ''
  unreadCount: number = 0;
  private readonly authService = inject(AuthService)
  private readonly userService = inject(UserService)
  private readonly notificationsService = inject(NotificationsService)

  @ViewChild('menuContainer') menuContainer!: ElementRef;


  // function to show list of setting 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  hideMenu(event: MouseEvent) {
    const clickedInside =
      this.menuContainer?.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }

  getUnreadCount() {
    this.notificationsService.getUnreadCount().subscribe({
      next: (res) => {
        if (res.success) {
          this.unreadCount = res.data.unreadCount
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // function to logOut of application
  logOut() {
    this.authService.logOut();
  }

  getMyProfile() {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.userName = res.data.user.name
          this.userImage = res.data.user.photo
          this.getUnreadCount();
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  ngOnInit(): void {
    this.getMyProfile()
  }
}
