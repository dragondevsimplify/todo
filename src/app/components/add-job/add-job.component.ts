import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job.component.html',
})
export class AddJobComponent {
  jobInput = '';
  @Input({required: true}) jobs!: Job[]
  @Input({required: true}) someCompleted!: boolean
  @Input({required: true}) allCompleted!: boolean

  @Output() reloadJobsStatus = new EventEmitter<void>()

  addJob() {
    if (!this.jobInput) {
      return
    };

    this.jobs.push({
      title: this.jobInput,
      completed: false
    });

    this.jobInput = '';
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

    this.reloadJobsStatus.emit()
  }
}
