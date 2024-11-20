export interface Job {
  id: string;
  title: string;
  completed?: boolean;
}

export type JobStatus = 'all' | 'active' | 'completed'
