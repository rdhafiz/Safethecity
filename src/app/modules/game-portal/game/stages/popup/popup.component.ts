import { Component } from "@angular/core";
import { LoadingService } from "../../../../../services/loading.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-game-popup',
  templateUrl: './popup.component.html',
  imports: [],
  standalone: true
})
export class PopupComponent {
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
}
