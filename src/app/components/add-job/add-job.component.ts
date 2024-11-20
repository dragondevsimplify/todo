import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsStore } from '../../store/jobs.store';
import { Job } from '../../models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job.component.html',
})
export class AddJobComponent {
  private jobsStore = inject(JobsStore)

  vm$ = this.jobsStore.vm$

  jobTitleInput = '';

  addJob() {
    if (!this.jobTitleInput) {
      return
    };

    const job: Job = {
      id: uuidv4(),
      title: this.jobTitleInput,
      completed: false
    }

    this.jobsStore.addJob(job)
    this.jobTitleInput = '';
  }

  toggleAllJobComplete() {
    this.jobsStore.toggleAllJobsToComplete()
  }
}
