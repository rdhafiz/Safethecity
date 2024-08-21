import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";
import {HeaderComponent} from "../../../includes/header.component";

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  imports: [
    NgClass,
    HeaderComponent
  ],
  standalone: true
})
export class StagesComponent implements OnInit {

  ngOnInit() {

  }

}
