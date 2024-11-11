import { Component, ViewChild } from '@angular/core';
import type { Job, JobStatus } from './models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddJobComponent } from "./components/add-job/add-job.component";
import { JobListComponent } from "./components/job-list/job-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, AddJobComponent, JobListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  jobs: Job[] = [];
  activeTabName: JobStatus = 'all'
  someCompleted = false
  allCompleted = false

  @ViewChild(JobListComponent) jobListComp!: JobListComponent

  getJobsByStatus(status: JobStatus) {
    if (status === 'all') {
      return this.jobs
    }

    return this.jobs.filter(i => status === 'active' ? !i.completed : i.completed)
  }

  isSomeJobsCompleted() {
    return this.jobs.some(i => i.completed)
  }

  isAllJobsCompleted() {
    return this.jobs.every(i => i.completed)
  }

  reloadJobsStatus() {
    this.someCompleted = this.isSomeJobsCompleted()
    this.allCompleted = this.isAllJobsCompleted()
  }

  clickOutside(e: Event) {
    const target = e.target as HTMLElement
    let targetJobIndex: number

    // Get current target job index
    if (target?.localName === 'span') {
      targetJobIndex = +target.dataset['jobindex']!
    }

    const { nativeElement } = this.jobListComp.jobsUl
    if (!nativeElement) {
      return
    }

    // Disable content editable for all job, only current target
    [...nativeElement.children].forEach(li => {
      const span = li.querySelector('span') as HTMLSpanElement
      if (!span) {
        return
      }

      const jobIndex = +span.dataset['jobindex']!
      span.contentEditable = (jobIndex === targetJobIndex) ? 'true' : 'false'
    })
  }
}
