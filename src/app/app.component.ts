import { Component, ElementRef, ViewChild } from '@angular/core';
import type { Job, JobStatus } from './models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  jobs: Job[] = [];
  jobInput = '';
  activeTabName: JobStatus = 'all'
  allCompleted = false

  @ViewChild('jobsUl', { static: true}) jobsUl!: ElementRef

  getJobsByStatus(status: JobStatus) {
    if (status === 'all') {
      return this.jobs
    }

    return this.jobs.filter(i => status === 'active' ? !i.completed : i.completed)
  }

  addJob() {
    if (!this.jobInput) {
      return
    };

    this.jobs.push({
      title: this.jobInput,
    });

    this.jobInput = '';
  }

  toggleJobComplete(job: Job) {
    job.completed = !job.completed;
    this.allCompleted = this.isAllJobsCompleted()
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

  toggleAllJobComplete() {
    if (!this.jobs.length) {
      return
    }

    let someCompleted = false
    this.allCompleted = true
    for (const job of this.jobs) {
      if (job.completed) {
        someCompleted = true
      } else {
        this.allCompleted = false
      }
    }

    this.jobs.forEach(job => {
      job.completed = (someCompleted && !this.allCompleted) ? true : !this.allCompleted
    })

    this.allCompleted = this.isAllJobsCompleted()
  }

  isAllJobsCompleted() {
    return this.jobs.every(i => i.completed)
  }

  editJob(e: Event) {
    const target = e.target as HTMLElement

    if (target?.localName !== 'span') {
      return
    }

    target.contentEditable = 'true'
    target.focus()
  }

  clickOutside(e: Event) {
    const target = e.target as HTMLElement
    let targetJobIndex: number

    if (target?.localName === 'span') {
      targetJobIndex = +target.dataset['jobindex']!
    }

    const { nativeElement } = this.jobsUl
    if (!nativeElement) {
      return
    }

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
