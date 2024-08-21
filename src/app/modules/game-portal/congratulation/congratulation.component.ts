import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserInfoService} from "../../../services/userInfo/userInfo.service";

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class CongratulationComponent {
  userInfo:any = null;
  constructor(private userInfoService: UserInfoService) {

  }
  ngOnInit() {
    this.userInfoService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }

}
