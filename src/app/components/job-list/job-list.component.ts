import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
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
  private jobsService = inject(JobsService)

  filteredJobs$ = this.jobsService.filteredJobs$
  filterType$ = this.jobsService.filterType$

  //todo: Use for app component
  @ViewChild('jobsUl') jobsUl!: ElementRef

  get someCompleted() {
    return this.jobsService.someCompleted
  }

  get numberOfActiveJobs() {
    return this.jobsService.getJobsByStatus('active').length ?? 0
  }

  activeTab(tabName: JobStatus) {
    this.jobsService.setFilterType(tabName)
  }

  clearCompletedJob() {
    this.jobsService.clearCompletedJob()
  }
}
