import {Component, EventEmitter, Input, Output} from "@angular/core";
import { LoadingService } from "../../../../../services/loading.service";
import { Router } from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-game-popup',
  templateUrl: './popup.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class PopupComponent {
  @Output() clickEvent = new EventEmitter();
  @Input() icon :any = ''
  @Input() title :any = 'Success!'
  @Input() subTitle :any = 'You have successfully planted grass'
  private myModal: any;

  constructor(private loadingService: LoadingService, private route: Router) {}

  closeModel() {
    if (this.myModal) {
      this.myModal.hide();
    }
  }

  openModal() {
    const bootstrap = (window as any).bootstrap;
    const modalElement = document.getElementById('stageModal');

    if (modalElement) {
      this.myModal = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false,
      });

      this.myModal.show();
    }
  }

  nextStage(){
    this.closeModel()
    this.clickEvent.emit()
  }
}
