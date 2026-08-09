import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageViewerService {

  private viewerState = new BehaviorSubject<ImageViewerData | null>(null);

  viewerState$ = this.viewerState.asObservable();

  open(images: string[], currentIndex = 0) {
    this.viewerState.next({
      images,
      currentIndex
    });

    document.body.style.overflow = 'hidden';
  }

  close() {
    this.viewerState.next(null);

    document.body.style.overflow = '';
  }
}

export interface ImageViewerData {
  images: string[];
  currentIndex: number;
}