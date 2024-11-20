import { Injectable } from '@angular/core';
import { Job, JobStatus } from '../models';
import { BehaviorSubject, filter, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface State {
  jobs: Job[];
  someCompleted: boolean;
  allCompleted: boolean;
  filterType: JobStatus;
}

const initialState: State = {
  jobs: [],
  someCompleted: false,
  allCompleted: false,
  filterType: 'all',
};

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private _state = new BehaviorSubject<State>(initialState);
  state$ = this._state.asObservable();
  filteredJobs$ = this.state$.pipe(
    map(({ jobs, filterType }: Pick<State, 'jobs' | 'filterType'>) => {
      switch (filterType) {
        case 'active':
          return jobs.filter((i) => !i.completed);
        case 'completed':
          return jobs.filter((i) => i.completed);
        default:
          return jobs;
      }
    })
  );
  filterType$ = this.state$.pipe(
    map(state => state.filterType)
  )

  patchState(newState: Partial<State>) {
    const dataEmit: State = {
      ...this._state.value,
      ...newState,
    };

    if (newState.jobs) {
      dataEmit.someCompleted = newState.jobs.some((i) => i.completed);
      dataEmit.allCompleted = newState.jobs.every((i) => i.completed);
    }

    this._state.next(dataEmit);
  }

  get someCompleted() {
    return this._state.value.jobs.some((i) => i.completed);
  }

  get allCompleted() {
    return this._state.value.jobs.every((i) => i.completed);
  }

  setFilterType(type: JobStatus) {
    this.patchState({ filterType: type })
  }

  getJobsByStatus(status: JobStatus) {
    if (status === 'all') {
      return this._state.value.jobs;
    }

    return this._state.value.jobs.filter((i) =>
      status === 'active' ? !i.completed : i.completed
    );
  }

  addJob(title: string) {
    const newJobs = [
      ...this._state.value.jobs,
      {
        id: uuidv4(),
        title,
        completed: false,
      },
    ];
    this.patchState({ jobs: newJobs });
  }

  deleteJob(idx: number) {
    const newJobs = this._state.value.jobs.splice(idx, 1);
    this.patchState({ jobs: newJobs });
  }

  toggleJobComplete(job: Job) {
    const newJobs = structuredClone(this._state.value.jobs);
    newJobs.forEach((i) => {
      if (i.id === job.id) {
        i.completed = !i.completed;
      }
    });
    this.patchState({ jobs: newJobs });
  }

  toggleAllJobComplete() {
    const newJobs = structuredClone(this._state.value.jobs);

    if (!newJobs.length) {
      return;
    }

    this._state.value.someCompleted = false;
    this._state.value.allCompleted = true;
    for (const job of newJobs) {
      if (job.completed) {
        this._state.value.someCompleted = true;
      } else {
        this._state.value.allCompleted = false;
      }
    }

    newJobs.forEach((job) => {
      job.completed =
        this._state.value.someCompleted && !this._state.value.allCompleted
          ? true
          : !this._state.value.allCompleted;
    });

    this.patchState({ jobs: newJobs });
  }

  clearCompletedJob() {
    const newJobs = this.getJobsByStatus('active');
    this.patchState({ jobs: newJobs });
  }
}
