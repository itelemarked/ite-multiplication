import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { Test } from '../../models/Test';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-testing2.page',
  templateUrl: './testing2.page.html',
  styleUrls: ['./testing2.page.scss']
})
export class Testing2Page implements OnInit {

  test$: Observable<Test | null>;

  constructor(private activatedRoute: ActivatedRoute, private testsService: TestsService) {
    const testId$: Observable<string> = this.activatedRoute.params.pipe(
      map(res => res['testId'])
    )

    this.test$ = testId$.pipe(
      switchMap(res => this.testsService.getTestById$(res))
    )
  }

  ngOnInit(): void {}

}
