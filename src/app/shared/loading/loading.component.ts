import {Component,  OnInit} from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [
    NgStyle
  ],
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false;
  progress:any = 0;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(
      (loading: boolean) => (this.isLoading = loading)
    );
    
    this.loadingService.progress$.subscribe(
      (progress: number) => (this.progress = progress)
    );
  }
}
