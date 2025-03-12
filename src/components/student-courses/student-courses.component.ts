import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  registeredCourses: any[] = [];
  availableCourses: any[] = [];
  userId: string | null = sessionStorage.getItem('userId');

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.loadRegisteredCourses();
    this.loadAvailableCourses();
  }

  loadRegisteredCourses() {
    if (this.userId) { // בדוק אם userId לא ריק
      this.coursesService.getRegisteredCourses(Number(this.userId)).subscribe({
        next: (data) => {
          this.registeredCourses = data; // עדכון הקורסים הרשומים
        },
        error: (err) => {
          console.error('Error fetching registered courses:', err);
        }
      });
    } else {
      console.error('User ID is null or undefined');
    }
  }

  loadAvailableCourses() {
    if (this.userId) { // בדוק אם userId לא ריק
      this.coursesService.getAvailableCourses(Number(this.userId)).subscribe({
        next: (data) => {
          this.availableCourses = data;
        },
        error: (err) => {
          console.error('Error fetching available courses:', err);
        }
      });
    } else {
      console.error('User ID is null or undefined');
    }
  }

  leaveCourse(courseId: number) {
    if (this.userId) { // בדוק אם userId לא ריק
      this.coursesService.leaveCourse(courseId, Number(this.userId)).subscribe({
        next: (response) => {
          console.log('Successfully left course:', response);
          this.loadRegisteredCourses(); // טען מחדש את הקורסים הרשומים
        },
        error: (error) => {
          console.error('Error leaving course', error);
        }
      });
    } else {
      console.error('User ID is null or undefined');
    }
  }

  registerCourse(courseId: number) {
    if (this.userId) { // בדוק אם userId לא ריק
      this.coursesService.registerCourse(courseId, Number(this.userId)).subscribe({
        next: (response) => {
          console.log('Successfully registered for course:', response);
          this.loadAvailableCourses(); // טען מחדש את הקורסים הזמינים
          this.loadRegisteredCourses(); // טען מחדש את הקורסים הרשומים
        },
        error: (error) => {
          console.error('Error registering for course', error);
        }
      });
    } else {
      console.error('User ID is null or undefined');
    }
  }
}
