import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  todos: string[] = [];
  input: string = '';

  constructor(private router: Router) {
    this.loadTasks();
  }

  loadTasks() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  onAddTodo() {
    if (this.input.trim()) {
      this.todos.push(this.input);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.input = '';
    }
  }

  onTaskDone(index: number) {
    const task = this.todos.splice(index, 1)[0];
    localStorage.setItem('todos', JSON.stringify(this.todos));

    const completedTasks = JSON.parse(
      localStorage.getItem('completedTasks') || '[]'
    );
    completedTasks.push(task);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

   
    window.dispatchEvent(new Event('taskUpdated'));
    this.router.navigate(['/tabs/tab2']);
  }

  onTaskForgotten(index: number) {
    const task = this.todos.splice(index, 1)[0];
    localStorage.setItem('todos', JSON.stringify(this.todos));

    const forgottenTasks = JSON.parse(
      localStorage.getItem('forgottenTasks') || '[]'
    );
    forgottenTasks.push(task);
    localStorage.setItem('forgottenTasks', JSON.stringify(forgottenTasks));

    
    window.dispatchEvent(new Event('taskUpdated'));
    this.router.navigate(['/tabs/tab3']);
  }

  onDeleteTodo(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
