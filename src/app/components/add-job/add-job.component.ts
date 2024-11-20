import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job.component.html',
})
export class AddJobComponent {
  private jobsService = inject(JobsService)

  jobTitleInput = '';

  get allCompleted() {
    return this.jobsService.allCompleted
  }

  addJob() {
    if (!this.jobTitleInput) {
      return
    };

    this.jobsService.addJob(this.jobTitleInput)
    this.jobTitleInput = '';
  }

  toggleAllJobComplete() {
    this.jobsService.toggleAllJobComplete()
  }
}
