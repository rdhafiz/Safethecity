import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {HeaderComponent} from "../includes/header.component";

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
  ngOnInit() {

  }

  boxArray: any = [
    { id: 1, name: 'Stage 1' },
    { id: 2, name: 'Stage 2' },
    { id: 3, name: 'Stage 3' },
    { id: 4, name: 'Stage 4' },
    { id: 5, name: 'Stage 5' },
    { id: 6, name: 'Stage 6' },
    { id: 7, name: 'Stage 7' },
    { id: 8, name: 'Stage 8' },
    { id: 9, name: 'Stage 9' },
  ]


}
