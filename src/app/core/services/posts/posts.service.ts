import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { headerInterceptor } from '../../interceptors/header/header-interceptor';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient)

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}posts`)
  }

  getPostsHomeFeed(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}posts/feed?only=following`)
  }

  createPost(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}posts`, data)
  }

  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}posts/${postId}`)
  }

  updatePost(postId: string, data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}posts/${postId}`, data)
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}posts/${postId}`)
  }

  // toggleBookmarkPost(postId: string): Observable<any> {
  //   return this.httpClient.put(`${environment.baseUrl}posts/${postId}/bookmark`);
  // }

  toggleLikePost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}posts/${postId}/like`, headerInterceptor);
  }


}
