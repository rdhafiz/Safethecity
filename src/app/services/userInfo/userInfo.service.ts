import { Injectable } from '@angular/core';
import {CookieService} from "../cookies/cookie.service";
import * as localforage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: any = null;

  constructor(private cookieService: CookieService) {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    localforage.getItem('userInfo', (err, value) => {
      // if err is non-null, we got an error. otherwise, value is the value
      let storageData:any = value;
      if (storageData != null) {
        this.userInfo = JSON.parse(storageData);
      } else {
        // Initialize with default values if needed
        this.userInfo = {
          username: 'defaultUser',
          telegram_id: '12346879654365',
          stage: 0,
        };
        localforage.setItem('userInfo', JSON.stringify(this.userInfo));
      }
    });

  }

  getUserInfo(): any {
    return this.userInfo;
  }

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
    localforage.setItem('userInfo', JSON.stringify(this.userInfo));
  }
}
