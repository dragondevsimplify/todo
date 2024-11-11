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
import { JobItemComponent } from "../job-item/job-item.component";

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-list.component.html',
})
export class JobListComponent {
  @Input({ required: true }) jobs!: Job[];
  @Input({ required: true }) activeTabName!: JobStatus;
  @Input({ required: true }) getJobsByStatus!: (status: JobStatus) => Job[]

  @Output() reloadJobsStatus = new EventEmitter<void>();

  @ViewChild('jobsUl') jobsUl!: ElementRef

  deleteJob(idx: number) {
    this.jobs.splice(idx, 1);
  }
}
