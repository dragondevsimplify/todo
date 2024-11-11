import { Injectable } from '@angular/core';
import { Job, JobStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobs: Job[] = []
  someCompleted = false
  allCompleted = false

  isSomeJobsCompleted() {
    return this.jobs.some(i => i.completed)
  }

  isAllJobsCompleted() {
    return this.jobs.every(i => i.completed)
  }

  getJobsByStatus(status: JobStatus) {
    if (status === 'all') {
      return this.jobs
    }

    return this.jobs.filter(i => status === 'active' ? !i.completed : i.completed)
  }

  add(title: string) {
    this.jobs.push({
      title,
      completed: false
    });
  }

  reloadJobsStatus() {
    this.someCompleted = this.isSomeJobsCompleted()
    this.allCompleted = this.isAllJobsCompleted()
  }

  toggleAllJobComplete() {
    if (!this.jobs.length) {
      return
    }

    this.someCompleted = false
    this.allCompleted = true
    for (const job of this.jobs) {
      if (job.completed) {
        this.someCompleted = true
      } else {
        this.allCompleted = false
      }
    }

    this.jobs.forEach(job => {
      job.completed = (this.someCompleted && !this.allCompleted) ? true : !this.allCompleted
    })

    this.reloadJobsStatus()
  }

  deleteJob(idx: number) {
    this.jobs.splice(idx, 1);
  }

  clearCompletedJob() {
    this.jobs = this.getJobsByStatus('active')
    this.reloadJobsStatus()
  }
}
