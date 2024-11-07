import { Component } from '@angular/core';
import type { Job } from './models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  jobs: Job[] = [];
  jobInput: string = '';

  addJob() {
    if (!this.jobInput) return;
    this.jobs.push({
      title: this.jobInput,
    });
  }
}
