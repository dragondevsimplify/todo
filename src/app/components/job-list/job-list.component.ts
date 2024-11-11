import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Job, JobStatus } from '../../models';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-list.component.html',
})
export class JobListComponent {
  @Input({ required: true }) jobs!: Job[];
  @Input({ required: true }) activeTabName!: JobStatus;
  @Input({ required: true }) getJobsByStatus!: (status: JobStatus) => Job[]

  @Output() reloadJobsStatus = new EventEmitter<void>();

  @ViewChild('jobsUl') jobsUl!: ElementRef

  toggleJobComplete(job: Job) {
    job.completed = !job.completed;
    this.reloadJobsStatus.emit();
  }

  deleteJob(idx: number) {
    this.jobs.splice(idx, 1);
  }

  editJob(e: Event) {
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
}
