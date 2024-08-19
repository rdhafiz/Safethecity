
import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class LoginComponent {
  constructor(private loadingService: LoadingService) {
    setTimeout(() => {
      this.loadData()
    },3000)
  }

  loadData() {
    this.loadingService.show();

    // Simulate an async operation like an HTTP request
    setTimeout(() => {
      this.loadingService.hide();
    }, 10000);
  }
}
