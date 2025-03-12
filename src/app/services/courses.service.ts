import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = sessionStorage.getItem('myToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders()); // ✅ תקין
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getAuthHeaders()); // ✅ תקין
  }

  createCourse(courseData: any, token?: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || sessionStorage.getItem('myToken') || ''}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}`, courseData, { headers });
  }
  
  updateCourse(id: number, courseData: any, token?: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || sessionStorage.getItem('myToken') || ''}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put(`${this.apiUrl}/${id}`, courseData, { headers });
  }
  
  deleteCourse(id: number, token?: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || sessionStorage.getItem('myToken') || ''}`
    });
  
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
  getRegisteredCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/registered/${userId}`, this.getAuthHeaders()); // ✅ תקין
  }

  getAvailableCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/available/${userId}`, this.getAuthHeaders()); // ✅ תקין
  }

  leaveCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/leave`, { courseId, userId }, this.getAuthHeaders());
  }

  registerCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { courseId, userId }, this.getAuthHeaders());
  }
}
