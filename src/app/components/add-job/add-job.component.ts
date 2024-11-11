import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../models';
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
  jobInput = '';

  @Output() reloadJobsStatus = new EventEmitter<void>()

  constructor(private jobsService: JobsService) {}

  get allCompleted() {
    return this.jobsService.allCompleted
  }

  addJob() {
    if (!this.jobInput) {
      return
    };

    this.jobsService.addJob(this.jobInput)
    this.jobInput = '';
  }

  toggleAllJobComplete() {
    this.jobsService.toggleAllJobComplete()
  }
}
