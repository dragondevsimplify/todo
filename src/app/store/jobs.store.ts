import { Injectable } from '@angular/core';
import { Job, JobStatus } from '../models';
import { ComponentStore } from '@ngrx/component-store';

interface State {
  jobs: Job[];
  someCompleted: boolean;
  allCompleted: boolean;
  filterType: JobStatus;
  isLoading: boolean;
}

const initialState: State = {
  jobs: [],
  someCompleted: false,
  allCompleted: false,
  filterType: 'all',
  isLoading: false,
};

@Injectable({
  providedIn: 'any',
})
export class JobsStore extends ComponentStore<State> {
  constructor() {
    super(initialState);
  }

  readonly vm$ = this.select((state) => {
    const rs: State = { ...initialState };

    switch (state.filterType) {
      case 'active':
        rs.jobs = state.jobs.filter((i) => !i.completed);
        break;
      case 'completed':
        rs.jobs = state.jobs.filter((i) => i.completed);
        break;
      default:
        rs.jobs = state.jobs;
    }

    rs.someCompleted = rs.jobs.some((i) => i.completed);
    rs.allCompleted = rs.jobs.every((i) => i.completed);

    return rs;
  });

  clearCompletedJob() {
    this.patchState(({ jobs: prevJobs }) => ({
      jobs: prevJobs.filter(i => !i.completed),
    }));
  }

  setFilterType(filterType: JobStatus) {
    this.patchState(() => ({
      filterType,
    }));
  }

  addJob(newJob: Job) {
    this.patchState(({ jobs: prevJobs }) => ({
      jobs: structuredClone(prevJobs).concat(newJob),
    }));
  }

  updateJob(updateJob: Partial<Job> & Pick<Job, 'id'>) {
    if (!updateJob.id) {
      return;
    }

    this.patchState(({ jobs: prevJobs }) => ({
      jobs: structuredClone(prevJobs).map((i) =>
        i.id === updateJob.id
          ? {
              ...i,
              ...updateJob,
            }
          : i
      ),
    }));
  }

  deleteJob(id: string) {
    this.patchState(({ jobs: prevJobs }) => ({
      jobs: prevJobs.filter((i) => i.id !== id),
    }));
  }

  toggleJobComplete(job: Job) {
    this.patchState(({ jobs: prevJobs }) => ({
      jobs: structuredClone(prevJobs).map((i) => ({
        ...i,
        completed: i.id === job.id ? !i.completed : i.completed,
      })),
    }));
  }

  toggleAllJobsToComplete() {
    this.patchState(({ jobs: prevJobs }) => {
      const newJobs = structuredClone(prevJobs);

      if (!newJobs.length) {
        return {};
      }

      let someCompleted = false,
        allCompleted = true;

      for (const job of newJobs) {
        if (job.completed) {
          someCompleted = true;
        } else {
          allCompleted = false;
        }
      }

      return {
        jobs: newJobs.map((i) => ({
          ...i,
          completed: someCompleted && !allCompleted ? true : !allCompleted,
        })),
        someCompleted,
        allCompleted,
      };
    });
  }

  getJobsByStatus(status: JobStatus) {
    return this.select(({ jobs }) => {
      if (status === 'all') {
        return jobs;
      }

      return jobs.filter((i) =>
        status === 'active' ? !i.completed : i.completed
      );
    });
  }
}
