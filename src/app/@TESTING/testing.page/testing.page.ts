import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Test } from '../../models/Test';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { TestsService } from '../../services/tests.service';



@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss']
})
export class TestingPage implements OnInit {

  user$: Observable<User | null>;
  tests$: Observable<Test[]>;

  constructor(public auth: AuthService, private testsService: TestsService) {
    this.tests$ = this.testsService.getTests$$()
    this.user$ = this.auth.getUser$$();
  }

  ngOnInit(): void {}

  addTest() {
    const successNb = 2;
    const timeInterval = 2;
    this.testsService.addTest(successNb, timeInterval)
  }

  removeTest(id: string, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.testsService.removeTest(id);
  }



}

