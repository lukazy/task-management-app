import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  completedTasks: string[] = [];

  ngOnInit() {
    this.loadCompletedTasks();
    window.addEventListener('taskUpdated', this.loadCompletedTasks.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener(
      'taskUpdated',
      this.loadCompletedTasks.bind(this)
    );
  }

  loadCompletedTasks() {
    this.completedTasks = JSON.parse(
      localStorage.getItem('completedTasks') || '[]'
    );
  }

  onDeleteTask(index: number) {
    this.completedTasks.splice(index, 1);
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }
}
