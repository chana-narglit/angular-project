import { Component, OnInit, signal } from '@angular/core';
import { CoursesService } from '../../app/services/courses.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatLabel,
    MatFormFieldModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  editId = -1;
  courses: any[] = [];
  open = signal(false);
  userId = sessionStorage.getItem('userId') ?? ''; // אם null, נותן מחרוזת ריקה
  role = sessionStorage.getItem('role') ?? ''; // אם null, נותן מחרוזת ריקה
  token = sessionStorage.getItem('myToken') ?? ''; // אם null, נותן מחרוזת ריקה

  myForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    teacherId: new FormControl(this.userId) // מבטיח שלא יהיה null
  });

  constructor(private coursesService: CoursesService) {}

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

  addCourse() {
    const courseData = this.myForm.getRawValue();
    console.log('Adding course:', courseData);

    this.coursesService.createCourse(courseData, this.token).subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
        this.loadCourses();
        this.myForm.reset(); // נקה את הטופס לאחר ההוספה
      },
      error: (error) => {
        console.error('Error adding course', error);
      }
    });
    this.open.set(false);
  }

  toEdit(id: number) {
    this.open.set(true);
    this.editId = id;
    const courseToEdit = this.courses.find(course => course.id === id);
    if (courseToEdit) {
      this.myForm.patchValue({
        title: courseToEdit.title,
        description: courseToEdit.description,
        teacherId: courseToEdit.teacherId
      });
    }
  }

  editCourse() {
    this.coursesService.updateCourse(this.editId, this.myForm.getRawValue()).subscribe({
      next: () => {
        console.log('Course updated successfully');
        this.loadCourses();
      },
      error: (error) => console.error('Error updating course', error)
    });
    this.open.set(false);
  }

  deleteCourse(id: number) {
    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        console.log('Course deleted successfully');
        this.loadCourses();
      },
      error: (error) => console.error('Error deleting course', error)
    });
  }
  

  openForm() {
    this.open.set(true);
  }
}
