import { Component, OnDestroy } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import {HeaderComponent} from "../includes/header.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgOptimizedImage,
    HeaderComponent
  ],
  standalone: true,
})
export class HomeComponent   {

}
