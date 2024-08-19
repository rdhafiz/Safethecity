import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(
      (loading: boolean) => (this.isLoading = loading)
    );
  }
}
