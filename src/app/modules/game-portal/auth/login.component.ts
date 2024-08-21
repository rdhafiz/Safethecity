import { Component, OnDestroy } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { LoadingService } from "../../../services/loading.service";
import { Router } from '@angular/router';
import {UserInfoService} from "../../../services/userInfo/userInfo.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class LoginComponent   {
  duration: any = 3; // seconds
  progress: any = 0;
  progressPercentage: any = 0;
  progressInterval: any = null;
  constructor(private loadingService: LoadingService,private userInfoService: UserInfoService, private route:Router, private AuthService:AuthService) {
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
    let param:any = {
      username:'Default User',
      password:12345678,
      email:'ridwan@gmail.com',
      stage:1,
      gameStage:0,
    }
    this.AuthService.signUp(param.email, param.password).then(v =>{
      this.userInfoService.removeItem('userInfo').then(value => {
        this.userInfoService.setStoreValue('userInfo', param).then(r =>{
          setTimeout(() => {
            this.route.navigate(['/portal']);
          },1000)
        })
      })
    })



  }

  ngOnDestroy() {
    // Cleanup to avoid memory leaks
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}
