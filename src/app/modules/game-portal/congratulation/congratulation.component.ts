import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserInfoService} from "../../../services/userInfo/userInfo.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  imports: [
    RouterLink
  ],
  standalone: true
})
export class CongratulationComponent {
  userInfo:any = null;
  stage:any = null;
  constructor(private userInfoService: UserInfoService,private router: ActivatedRoute) {

  }
  ngOnInit() {
    this.stage = this.router.snapshot.paramMap.get('stage');
    this.userInfoService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }

}
