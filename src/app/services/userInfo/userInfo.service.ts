import {Injectable} from '@angular/core';
import * as localforage from "localforage";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userInfo$ = this.userInfoSubject.asObservable(); // Expose as observable

  constructor() {
    this.loadUserInfo().then((r) => {
      if (r != null) {
        const parsedUserInfo = JSON.parse(r);
        this.userInfoSubject.next(parsedUserInfo); // Update the BehaviorSubject
      }
    });
  }

  async loadUserInfo() {
    const info: any = await this.getStoreValue('userInfo');
    return info;
  }

  async getStoreValue(key: string) {
    return await localforage.getItem(key);
  }

  async setStoreValue(key: string, value: any) {
    await localforage.setItem(key, JSON.stringify(value));
    this.userInfoSubject.next(value); // Update the BehaviorSubject
  }

  getUserInfo() {
    return this.userInfoSubject.getValue();
  }

  async removeItem(key: string) {
    await localforage.removeItem(key);
    this.userInfoSubject.next(null); // Reset the BehaviorSubject
  }
}

