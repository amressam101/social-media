import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient)

  getMyProfile(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}users/profile-data`)
  }
  uploadProfilePhoto(data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}users/upload-photo`, data)
  }

  getSuggestionsFollow(limitNumber: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}users/suggestions?limit=${limitNumber}`)
  }


  getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}users/${userId}/profile`)
  }

  getBookMarkPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}users/bookmarks`)
  }

  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}users/${userId}/posts`)
  }

  changePassword(date: any): Observable<any> {
    return this.httpClient.patch(`${environment.baseUrl}users/change-password`, date);
  }

}
