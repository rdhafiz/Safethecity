import { Component, OnDestroy } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class HeaderComponent {

}
