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

  getJobsByStatus(status: 'all' | 'active' | 'completed') {
    if (status === 'all') {
      return this.jobs
    }

    return this.jobs.filter(i => status === 'active' ? !i.completed : i.completed)
  }

  addJob() {
    if (!this.jobInput) return;

    this.jobs.push({
      title: this.jobInput,
    });

    this.jobInput = '';
  }

  toggleJobComplete(job: Job) {
    job.completed = !job.completed;
  }

  deleteJob(idx: number) {
    this.jobs.splice(idx, 1);
  }
}
