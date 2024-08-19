import { Component, OnDestroy } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { LoadingService } from "../../../services/loading.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class HomeComponent   {

}
