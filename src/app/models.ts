export interface Job {
  title: string;
  completed?: boolean;
}

export type JobStatus = 'all' | 'active' | 'completed'
