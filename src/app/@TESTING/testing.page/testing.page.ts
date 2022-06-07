import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, of, skip, switchMap, take, takeUntil, tap } from 'rxjs';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Test } from '../Test';
import { TestsService } from '../test.service';



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

    // const obs1$ = interval(2000);
    // const obs2$ = (res1: number) => {
    //   return interval(500).pipe(
    //     map(res2 => {
    //       return `res1: ${res1}, res2: ${res2}`
    //     })
    //   )
    // }

    // const obs3$ = obs1$.pipe(
    //   tap(_ => console.log('starting again')),

    //   switchMap(res1 => obs2$(res1)),
    //   take(1),
    //   // takeUntil(obs1$.pipe(skip(1)))
    // )

    // obs3$.subscribe(res => console.log(res),()=>{},() => console.log('complete'))
  }

  ngOnInit(): void {}

  addTest() {
    const inputs = {successNb: 2, timeInterval: 3};
    this.testsService.createTest(inputs.successNb, inputs.timeInterval).subscribe();
  }

  removeTest(test: Test, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.testsService.removeTest(test.id).subscribe();
  }



}

