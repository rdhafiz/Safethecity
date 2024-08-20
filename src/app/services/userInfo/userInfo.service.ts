import { Injectable } from '@angular/core';
import {CookieService} from "../cookies/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: any = null;

  constructor(private cookieService: CookieService) {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const cookieData = this.cookieService.getCookie('userInfo');
    if (cookieData) {
      this.userInfo = JSON.parse(cookieData);
    } else {
      // Initialize with default values if needed
      this.userInfo = {
        username: 'defaultUser',
        telegram_id: '12346879654365',
        stage: 0,
      };
      this.cookieService.setCookie('userInfo', JSON.stringify(this.userInfo), 1);
    }
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
    this.cookieService.setCookie('userInfo', JSON.stringify(this.userInfo), 1);
  }
}
