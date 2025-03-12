import { Component, OnInit, signal } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AddCourseDialogComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  courses: any[] = [];
  userId = sessionStorage.getItem('userId') ?? '';
  role = sessionStorage.getItem('role') ?? '';
  token = sessionStorage.getItem('myToken') ?? '';
  open = signal(false);
  editId = signal(-1);

  constructor(private coursesService: CoursesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }
  joinCourse(courseId: number) {
    this.coursesService.registerCourse(courseId, Number(this.userId)).subscribe({
      next: () => {
        console.log(`Joined course ${courseId}`);
        const course = this.courses.find(c => c.id === courseId);
        if (course) course.registered = true; // עדכון המצב באופן מקומי
      },
      error: (error) => {
        console.error('Error joining course', error);
      }
    });
  }
  
  leaveCourse(courseId: number) {
    this.coursesService.leaveCourse(courseId, Number(this.userId)).subscribe({
      next: () => {
        console.log(`Left course ${courseId}`);
        const course = this.courses.find(c => c.id === courseId);
        if (course) course.registered = false; 
      },
      error: (error) => {
        console.error('Error leaving course', error);
      }
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCourse(result);
      }
    });
  }

  addCourse(courseData: any) {
    if (!courseData.title || !courseData.description) {
      console.error('Missing course data!');
      return;
    }
  
    const newCourse = { ...courseData, teacherId: this.userId };
  
    this.coursesService.createCourse(newCourse).subscribe({
      next: () => {
        console.log('Course added successfully');
        this.loadCourses();
      },
      error: (error) => console.error('Error adding course', error)
    });
  }
  
}
