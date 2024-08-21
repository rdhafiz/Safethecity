import {Component, ViewChild, OnDestroy, OnInit, viewChild} from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import { Router, ActivatedRoute } from "@angular/router";
import { StageOneComponent } from "./stages/stage-one/stage-one.component";
import { StageTwoComponent } from "./stages/stage-two/stage-two.component";
import { StageThreeComponent } from "./stages/stage-three/stage-three.component";
import { PopupComponent } from "./stages/popup/popup.component";
import { UserInfoService } from "../../../services/userInfo/userInfo.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    StageOneComponent,
    StageTwoComponent,
    StageThreeComponent,
    PopupComponent,
  ],
  standalone: true
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild(PopupComponent, { static: false }) private popupComponent!: PopupComponent;

  loading: boolean = true;
  userInfo: any = null;
  duration: number = 1;
  progress: number = 0;
  progressPercentage: number = 0;
  progressInterval: any = null;
  stages: number[] = [1, 2, 3];
  stagesDuration: number[] = [15, 10, 7];
  selectNextStage: number = 0;
  selectedStage: any = 0;

  images: any[] = [];
  defaultImage: string = '';
  changeImageTo: string = '';

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    const stage = this.route.snapshot.paramMap.get('stage');
    console.log(stage)
    this.userInfo = this.userInfoService.getUserInfo();
    if (this.userInfo) {
      this.selectedStage = this.userInfo?.stage || 0;
      this.selectNextStage = this.selectedStage;
      this.nextStage()
    }

  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  pageLoading() {
    this.loading = true;
    this.progressPercentage = 0;
    this.progress = 0;
    this.loadingService.show();

    this.progressInterval = setInterval(() => {
      this.progress += 0.1;
      this.progressPercentage = (this.progress / this.duration) * 100;
      this.loadingService.setProgress(this.progressPercentage);

      if (this.progress >= this.duration) {
        this.completeProgress();
      }
    }, 100);

    setTimeout(() => this.completeProgress(), this.duration * 1000);
  }

  completeProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.progress = this.duration;
    this.loadingService.hide();
    this.loading = false;
  }

  changeStage(stage: number = 0) {
    this.selectNextStage = stage;

    if (this.selectNextStage > 2) {
      this.userInfo.stage = 0;
    } else {
      this.userInfo.stage = this.selectNextStage;
    }

    this.userInfoService.setUserInfo(this.userInfo);

    let messageParam:any = {
      title: '',
      subTitle: '',
    };

    const messages:any = {
      1: { title: 'Success!', subTitle: 'You have successfully planted grass' },
      2: { title: 'Success!', subTitle: 'You have successfully planted trees' },
      3: { title: 'Success!', subTitle: 'You have successfully built houses' },
    };

    messageParam = messages[stage] || { title: 'Unknown Stage', subTitle: 'The stage does not match any predefined stages.' };
    this.popupComponent.openModal(messageParam);
  }

  nextStage() {
    this.progress = 0;
    this.progressPercentage = 0;
    this.selectedStage = this.selectNextStage;
    this.selectImage(this.selectedStage);

    if (this.stages[this.selectedStage] !== undefined) {
      this.pageLoading();
    } else {
      this.router.navigate(['/portal']);
    }
  }

  selectImage(stage: number = 0) {
    this.images = [];
    this.selectedStage = stage;

    const imagesMap: { [key: number]: { defaultImage: string, changeImageTo: string } } = {
      0: { defaultImage: 'ground.png', changeImageTo: 'ground-green.png' },
      1: { defaultImage: 'ground-green.png', changeImageTo: 'tree-3.png' },
      2: { defaultImage: 'tree-3.png', changeImageTo: 'house.png' }
    };

    const { defaultImage, changeImageTo } = imagesMap[stage] || { defaultImage: '', changeImageTo: '' };

    this.defaultImage = defaultImage;
    this.changeImageTo = changeImageTo;

    for (let i = 0; i < 9; i++) {
      this.images.push({ src: defaultImage, id: i + 1, clicked: false });
    }
  }
}
