import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Job } from '../../models';
import { JobsService } from '../../services/jobs.service';
import { JobsStore } from '../../store/jobs.store';

@Component({
  selector: 'li[jobItem]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.component.html',
  host: {
    '(dblclick)': 'openEditableJob($event)',
  },
})
export class JobItemComponent {
  private jobsStore = inject(JobsStore);

  @Input({ required: true }) job!: Job;
  @Input({ required: true }) index!: number;

  toggleJobComplete(job: Job) {
    this.jobsStore.toggleJobComplete(job);
  }

  openEditableJob(e: Event) {
    const target = e.target as HTMLElement;

    if (target?.localName !== 'span') {
      return;
    }

    target.contentEditable = 'true';
    target.focus();
  }

  updateJobTitle(e: Event) {
    const target = e.target as HTMLSpanElement;
    const newTitle = target.textContent ?? '';
    this.jobsStore.updateJob({
      id: this.job.id,
      title: newTitle
    });
    target.blur();
  }

  deleteJob(id: string) {
    this.jobsStore.deleteJob(id);
  }
}
