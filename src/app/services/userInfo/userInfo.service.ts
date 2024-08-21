import { Injectable } from '@angular/core';
import {CookieService} from "../cookies/cookie.service";
import * as localforage from "localforage";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: any = null;
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';

    this.loadUserInfo().then(r => {});
  }

  private async loadUserInfo(): Promise<void> {
   localforage.getItem('userInfo').then((value:any) => {
      if (value != null) {
        console.log(value)
        this.userInfo = JSON.parse(value);
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

  async setUserInfo(userInfo: any): Promise<void> {
    this.userInfo = userInfo;
    await localforage.setItem('userInfo', JSON.stringify(this.userInfo));
  }
}
