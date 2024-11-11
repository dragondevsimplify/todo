import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { JobStatus } from '../../models';
import { JobItemComponent } from "../job-item/job-item.component";
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-list.component.html',
})
export class JobListComponent {
  @Input({ required: true }) activeTabName!: JobStatus;

  //todo: Use for app component
  @ViewChild('jobsUl') jobsUl!: ElementRef

  constructor(private jobsService: JobsService) {}

  get someCompleted() {
    return this.jobsService.someCompleted
  }

  getJobsByStatus(status: JobStatus) {
    return this.jobsService.getJobsByStatus(status)
  }

  activeTab(tabName: JobStatus) {
    this.activeTabName = tabName
  }

  deleteJob(idx: number) {
    this.jobsService.deleteJob(idx)
  }

  clearCompletedJob() {
    this.clearCompletedJob()
  }
}
