import { Component, ElementRef, ViewChild } from '@angular/core';
import type { Job, JobStatus } from './models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddJobComponent } from "./components/add-job/add-job.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, AddJobComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  jobs: Job[] = [];
  activeTabName: JobStatus = 'all'
  someCompleted = false
  allCompleted = false

  @ViewChild('jobsUl', { static: true}) jobsUl!: ElementRef

  getJobsByStatus(status: JobStatus) {
    if (status === 'all') {
      return this.jobs
    }

    return this.jobs.filter(i => status === 'active' ? !i.completed : i.completed)
  }

  toggleJobComplete(job: Job) {
    job.completed = !job.completed;
    this.reloadJobsStatus()
  }

  deleteJob(idx: number) {
    this.jobs.splice(idx, 1);
  }

  activeTab(tabName: JobStatus) {
    this.activeTabName = tabName
  }

  clearCompletedJob() {
    this.jobs = this.getJobsByStatus('active')
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

  editJob(e: Event) {
    const target = e.target as HTMLElement

    if (target?.localName !== 'span') {
      return
    }

    target.contentEditable = 'true'
    target.focus()
  }

  updateJobTitle(e: Event, job: Job) {
    const target = e.target as HTMLSpanElement
    job.title = target.textContent ?? ""
    target.blur()
  }

  clickOutside(e: Event) {
    const target = e.target as HTMLElement
    let targetJobIndex: number

    // Get current target job index
    if (target?.localName === 'span') {
      targetJobIndex = +target.dataset['jobindex']!
    }

    const { nativeElement } = this.jobsUl
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
