import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../models';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'li[jobItem]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.component.html',
  host: {
    '(dblclick)': "editJob($event)"
  }
})
export class JobItemComponent {
  @Input({ required: true }) job!: Job;
  @Input({ required: true }) index!: number;

  constructor(private jobsService: JobsService) {}

  toggleJobComplete(job: Job) {
    this.jobsService.toggleJobComplete(job)
  }

  openEditableJob(e: Event) {
    const target = e.target as HTMLElement;

    if (target?.localName !== 'span') {
      return;
    }

    target.contentEditable = 'true';
    target.focus();
  }

  updateJobTitle(e: Event, job: Job) {
    const target = e.target as HTMLSpanElement;
    job.title = target.textContent ?? '';
    target.blur();
  }

  deleteJob(idx: number) {
    this.jobsService.deleteJob(idx)
  }
}
