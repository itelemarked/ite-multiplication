import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  log(msg: string, e: string) {
    console.log(msg + e)
  }

}
