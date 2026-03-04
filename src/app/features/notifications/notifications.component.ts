import { Component, inject, OnInit } from '@angular/core';
import { UnreadNotificationComponent } from "../unread-notification/unread-notification.component";
import { NotificationsService } from '../../core/services/notifications/notifications.service';
import { Inotifications } from '../../core/models/Inotifications/inotifications.interface';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-notifications',
  imports: [UnreadNotificationComponent, DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {

  isUnread: boolean = false;
  isLoading: boolean = false;
  asRead: boolean = false;
  unreadCount: number = 0;
  private readonly notificationsService = inject(NotificationsService);
  notificationList: Inotifications[] = [];


  showNotifications() {
    this.isUnread = !this.isUnread;
  }

  getNotificationText(type: string): string {
    switch (type) {

      case 'like_post':
        return 'liked your post';

      case 'comment_post':
        return 'commented on your post';

      case 'share_post':
        return 'shared your post';

      case 'mention_user':
        return 'mentioned you';

      default:
        return '';
    }
  }

  getUnreadCount() {
    this.notificationsService.getUnreadCount().subscribe({
      next: (res) => {
        if (res.success) {
          this.unreadCount = res.data.unreadCount;
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  markNotificationAsRead(notificationId: string) {
    this.notificationsService.markNotificationAsRead(notificationId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getNotifications();
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  markAllAsRead() {
    this.notificationsService.markAllAsRead().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.getNotifications();
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  getNotifications() {
    this.isLoading = true;
    this.notificationsService.getNotifications().subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationList = res.data.notifications;
          this.asRead = res.data.notifications.isRead
          this.getUnreadCount();
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
    this.getNotifications();
  }


}
