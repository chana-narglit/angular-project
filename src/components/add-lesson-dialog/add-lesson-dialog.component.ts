import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-lesson-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-lesson-dialog.component.html',
  styleUrl: './add-lesson-dialog.component.css'
})
export class AddLessonDialogComponent {
  myForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor(private dialogRef: MatDialogRef<AddLessonDialogComponent>) {}

  submit() {
    if (this.myForm.valid) {
      this.dialogRef.close(this.myForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
