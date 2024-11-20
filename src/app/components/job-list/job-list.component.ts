import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { JobStatus } from '../../models';
import { JobItemComponent } from "../job-item/job-item.component";
import { JobsStore } from '../../store/jobs.store';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-list.component.html',
})
export class JobListComponent {
  private jobsStore = inject(JobsStore)

  vm$ = this.jobsStore.vm$
  activeJobs$ = this.jobsStore.getJobsByStatus('active')

  //todo: Use for app component
  @ViewChild('jobsUl') jobsUl!: ElementRef

  activeTab(tabName: JobStatus) {
    this.jobsStore.setFilterType(tabName)
  }

  clearCompletedJob() {
    this.jobsStore.clearCompletedJob()
  }
}
