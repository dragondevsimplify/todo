import { Component } from '@angular/core';
import type { Job, JobStatus } from './models';
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
  jobInput = '';
  activeTabName: JobStatus = 'all'

  getJobsByStatus(status: JobStatus) {
    if (status === 'all') {
      return this.jobs
    }

    return this.jobs.filter(i => status === 'active' ? !i.completed : i.completed)
  }

  addJob() {
    if (!this.jobInput) {
      return
    };

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

  activeTab(tabName: JobStatus) {
    this.activeTabName = tabName
  }

  clearCompletedJob() {
    this.jobs = this.getJobsByStatus('active')
  }

  toggleAllJobComplete() {
    let someCompleted = false, allCompleted = true
    for (const job of this.jobs) {
      if (job.completed) {
        someCompleted = true
      } else {
        allCompleted = false
      }
    }

    this.jobs.forEach(job => {
      job.completed = (someCompleted && !allCompleted) ? true : !allCompleted
    })
  }
}
