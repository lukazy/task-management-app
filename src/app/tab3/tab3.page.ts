import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {
  forgottenTasks: string[] = [];

  ngOnInit() {
    this.loadForgottenTasks();
    window.addEventListener('taskUpdated', this.loadForgottenTasks.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener(
      'taskUpdated',
      this.loadForgottenTasks.bind(this)
    );
  }

  loadForgottenTasks() {
    this.forgottenTasks = JSON.parse(
      localStorage.getItem('forgottenTasks') || '[]'
    );
  }

  onDeleteTask(index: number) {
    this.forgottenTasks.splice(index, 1);
    localStorage.setItem('forgottenTasks', JSON.stringify(this.forgottenTasks));
  }
}
