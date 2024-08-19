import { Component, OnDestroy } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { LoadingService } from "../../../services/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class LoginComponent implements OnDestroy {
  duration: number = 20; // seconds
  progress: number = 0;
  progressPercentage: number = 0;
  progressInterval: any = null;

  constructor(private loadingService: LoadingService) {
    this.loadData();
  }

  loadData() {
    this.loadingService.show();
    this.progressInterval = setInterval(() => {
      this.progress++;
      this.progressPercentage = (this.progress / this.duration) * 100; // Calculate percentage
      this.loadingService.setProgress(this.progressPercentage);
      if (this.progress >= this.duration) {
        this.completeProgress();
      }
    }, 1000);

    setTimeout(() => {
      this.completeProgress();
    }, this.duration * 1000);
  }

  completeProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.progress = this.duration; // Ensure progress is set to 100%
    this.loadingService.hide();
  }

  ngOnDestroy() {
    // Cleanup to avoid memory leaks
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}
