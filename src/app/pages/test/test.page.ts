import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage implements OnInit {

  hasPendingTest = false;

  timeInterval: number;
  animationTime: number;
  successesNeeded: number;
  events: number;
  estimatedTime: {min: number, sec: number};

  constructor(private router: Router) {
    this.timeInterval = 2;
    this.animationTime = 1;
    this.successesNeeded = 2;
    this.events = this.getEvents(this.successesNeeded);
    this.estimatedTime = this.getEstimatedTime(this.timeInterval, this.animationTime, this.events);
  }

  ngOnInit(): void {}

  getEstimatedTime(timeInterval: number, animationTime: number, events: number): {min: number, sec: number} {
    const totalTimeSeconds = (timeInterval + animationTime) * events;
    const min = Math.floor(totalTimeSeconds / 60);
    const sec = totalTimeSeconds - (min * 60);
    return {min, sec}
  }

  getEvents(successesNeeded: number) {
    const EVENTS = 13 + 12 + 11 + 10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1;
    return EVENTS * successesNeeded;
  }

  changeTimeInterval(type: 'increment' | 'decrement') {
    if(this.timeInterval === 1 && type === 'decrement') return;

    type === 'increment' ? this.timeInterval++ : this.timeInterval--;
    this.estimatedTime = this.getEstimatedTime(this.timeInterval, this.animationTime, this.events);
  }

  changeSuccessesNeeded(type: 'increment' | 'decrement') {
    if(this.successesNeeded === 1 && type === 'decrement') return;

    type === 'increment' ? this.successesNeeded++ : this.successesNeeded--;
    this.events = this.getEvents(this.successesNeeded);
    this.estimatedTime = this.getEstimatedTime(this.timeInterval, this.animationTime, this.events);
  }

  onStart() {
    this.router.navigateByUrl('/test-progress', {state: {hello: 'world'}})
  }

}
