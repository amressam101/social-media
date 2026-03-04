import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private readonly httpClient = inject(HttpClient)

  getPostComments(postId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}posts/${postId}/comments`)
  }

  createComment(postId: string, data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}posts/${postId}/comments`, data)
  }

  updateComment(postId: string, data: any, commentId: string | number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}posts/${postId}/comments/${commentId}`, data)
  }

  deleteComment(postId: string, commentId: string | number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}posts/${postId}/comments/${commentId}`)
  }

}
