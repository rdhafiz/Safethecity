import { Component, OnDestroy } from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { LoadingService } from "../../../services/loading.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class HomeComponent   {

}
