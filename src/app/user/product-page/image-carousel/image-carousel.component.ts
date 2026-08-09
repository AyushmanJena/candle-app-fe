import { Component, OnInit } from '@angular/core';
import { ImageViewerData, ImageViewerService } from './image-viewer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css'
})
export class ImageCarouselComponent implements OnInit {
  data: ImageViewerData | null = null;

  constructor(private viewerService: ImageViewerService) { }

  ngOnInit() {
    this.viewerService.viewerState$
      .subscribe(data => this.data = data);
  }

  next() {
    if (!this.data) return;

    this.data.currentIndex =
      (this.data.currentIndex + 1) %
      this.data.images.length;
  }

  prev() {
    if (!this.data) return;

    this.data.currentIndex =
      (this.data.currentIndex - 1 + this.data.images.length) %
      this.data.images.length;
  }

  close() {
    this.viewerService.close();
  }

}
