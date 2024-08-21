import {Component, OnInit} from "@angular/core";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../includes/header.component";
import {UserInfoService} from "../../../services/userInfo/userInfo.service";

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  imports: [
    NgClass,
    HeaderComponent,
    RouterLink
  ],
  standalone: true
})
export class StagesComponent implements OnInit {
  userInfo:any = null;
  totalStages:any[] = [
    { stage: 1, name: 'Stage 1', completed:false },
    { stage: 2, name: 'Stage 2', completed:false },
    { stage: 3, name: 'Stage 3', completed:false },
    { stage: 4, name: 'Stage 4', completed:false },
    { stage: 5, name: 'Stage 5', completed:false },
    { stage: 6, name: 'Stage 6', completed:false },
    { stage: 7, name: 'Stage 7', completed:false },
    { stage: 8, name: 'Stage 8', completed:false },
    { stage: 9, name: 'Stage 9', completed:false },
  ];
constructor(private userInfoService:UserInfoService) {
}
  ngOnInit():void {
    this.userInfoService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
      setTimeout(() => {
        this.completedStages(this.userInfo?.stage)
      },500)
    });
  }
  completedStages(stage:number){
    this.totalStages.forEach((v:any) => {
      if (v.stage < stage){
        v.completed = true;
      }
    })
  }


}
