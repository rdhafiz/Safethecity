import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0);

  loading$ = this.loadingSubject.asObservable();
  progress$ = this.progressSubject.asObservable();  // Changed to 'progress$' for consistency

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  setProgress(progress: number) {
    this.progressSubject.next(progress);
  }
}
