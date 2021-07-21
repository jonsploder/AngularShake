import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appShakeDetect]'
})
export class ShakeDetectDirective {
  @Output() shook = new EventEmitter<void>();

  previousTime: Date;
  previousX: number | null;
  previousY: number | null;
  previousZ: number | null;
  threshold: number;
  timeout: number;

  constructor() {
    this.previousTime = new Date();
    this.threshold = 10;
    this.timeout = 3000;
    this.previousX = null;
    this.previousY = null;
    this.previousZ = null;
  }

  @HostListener('window:devicemotion ', ['$event'])
  onMotion(event: DeviceMotionEvent) {
    const current = event.accelerationIncludingGravity;
    if ((this.previousX === null) && (this.previousY === null) && (this.previousZ === null)) {
      this.previousX = current.x;
      this.previousY = current.y;
      this.previousZ = current.z;
    } else {
      const deltaX = Math.abs(this.previousX - current.x);
      const deltaY = Math.abs(this.previousY - current.y);
      const deltaZ = Math.abs(this.previousZ - current.z);

      if (((deltaX > this.threshold) && (deltaY > this.threshold)) ||
        ((deltaX > this.threshold) && (deltaZ > this.threshold)) ||
        ((deltaY > this.threshold) && (deltaZ > this.threshold))) {
        const currentTime = new Date();
        const deltaTime = currentTime.getTime() - this.previousTime.getTime();

        if (deltaTime > this.timeout) {
          this.shook.emit();
          this.previousTime = currentTime;
        }
      }

      this.previousX = current.x;
      this.previousY = current.y;
      this.previousZ = current.z;
    }
  }
}
