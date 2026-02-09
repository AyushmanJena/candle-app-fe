import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit, OnDestroy {

  images = [
    "/banner/banner-01.jpeg",
    "/banner/banner-02.jpg"
  ];

  activeSlideIndex = signal(0);

  private intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000); // 3 seconds
  }

  nextImage() {
    const next = (this.activeSlideIndex() + 1) % this.images.length;
    this.activeSlideIndex.set(next);
  }

  prevImage() {
    const prev =
      (this.activeSlideIndex() - 1 + this.images.length) % this.images.length;
    this.activeSlideIndex.set(prev);
  }
}
