import { Component, inject, Input, OnInit } from '@angular/core';
import { Inotifications } from '../../core/models/Inotifications/inotifications.interface';
import { NotificationsService } from '../../core/services/notifications/notifications.service';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-unread-notification',
  imports: [DatePipe],
  templateUrl: './unread-notification.component.html',
  styleUrl: './unread-notification.component.css',
})
export class UnreadNotificationComponent implements OnInit {
  isLoading: boolean = false;
  private readonly notificationsService = inject(NotificationsService);
  notificationList: Inotifications[] = [];



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

  getUnreadCount() {
    this.notificationsService.getUnreadCount().subscribe({
      next: (res) => {
        if (res.success) {
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  getNotifications() {
    this.isLoading = true;
    this.notificationsService.getNotifications().pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationList = res.data.notifications.filter((n: any) => !n.isRead);
          this.getUnreadCount()
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  ngOnInit(): void {
    this.getNotifications();
  }
}
