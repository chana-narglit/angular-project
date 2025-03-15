import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../app/services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddLessonDialogComponent } from '../add-lesson-dialog/add-lesson-dialog.component';



@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, AddLessonDialogComponent],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent implements OnInit {
  lessons: any[] = [];
  courseId: string = '';
  role: string = sessionStorage.getItem('role') ?? '';

  constructor(private lessonService: LessonService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseId = courseId;
      this.loadLessons();
    }
  }

  trackLesson(index: number, lesson: any) {
    return lesson.id;
  }
  
  loadLessons() {
    this.lessonService.getLessons(Number(this.courseId)).subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (err) => {
        console.error('Error fetching lessons:', err);
      }
    });
  }

  openAddLessonDialog() {
    const dialogRef = this.dialog.open(AddLessonDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addLesson(result);
      }
    });
  }

  addLesson(lessonData: any) {
    this.lessonService.createLesson(Number(this.courseId), lessonData.title, lessonData.content).subscribe({
      next: () => this.loadLessons(),
      error: (err) => console.error('Error adding lesson:', err)
    });
  }

  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(Number(this.courseId), lessonId).subscribe({
      next: () => this.loadLessons(),
      error: (err) => console.error('Error deleting lesson:', err)
    });
  }
}
