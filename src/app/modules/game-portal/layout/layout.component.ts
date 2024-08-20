import { Component, OnDestroy } from "@angular/core";
import {HeaderComponent} from "../includes/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  standalone: true
})
export class LayoutComponent   {

}
