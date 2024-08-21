import { Component } from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CookieService} from "../../../services/cookies/cookie.service";
import {UserInfoService} from "../../../services/userInfo/userInfo.service";
import localforage from "localforage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class HomeComponent {
  userInfo:any = null;
  constructor() {
    this.userInfo = localforage.getItem('userInfo');
    if (!this.userInfo || Object.keys(this.userInfo).length === 0) {
      // Call API or initialize userInfo
      this.userInfo = {
        username: 'ridwan',
        telegram_id: '12346879654365',
        stage: 0,
      };
      localforage.setItem('userInfo',this.userInfo);
    }
  }
  ngOnInit(){

  }
}
