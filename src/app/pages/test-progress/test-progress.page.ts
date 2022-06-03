import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-progress',
  templateUrl: './test-progress.page.html',
  styleUrls: ['./test-progress.page.scss']
})
export class TestProgressPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {}

}
