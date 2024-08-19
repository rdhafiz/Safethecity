
import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class LoginComponent {
  param:any = {
    username:'',
    telegram_id:'',
}
  constructor(private loadingService: LoadingService,private authService: AuthService) {

  }

  async initializeUser(username:string,telegram_id:string){
    try {
      await this.authService.login(this.param.telegram_id, this.param.username);
      // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  loading() {
    this.loadingService.show();
    // Simulate an async operation like an HTTP request
    setTimeout(() => {
      this.loadingService.hide();
    }, 10000);
  }
}
