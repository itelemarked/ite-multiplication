import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { IMultipleArr, Multiple } from '../../models/Multiple';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-testing2.page',
  templateUrl: './testing2.page.html',
  styleUrls: ['./testing2.page.scss']
})
export class Testing2Page implements OnInit {

  testId$$: Observable<string> ;
  multiples$$: Observable<Multiple[]>;

  constructor(private activatedRoute: ActivatedRoute, private testsService: TestsService) {

    this.testId$$ = this.activatedRoute.params.pipe(
      map(res => res['testId'])
    )

    this.multiples$$ = this.getMultiples$$();

    // setTimeout(() => {
    //   this.testsService.editTestMultiple('test4', '0x0', {successes: 1, fails: 3, n1: 0, n2: 0});
    // }, 4000);

  }

  ngOnInit(): void {}


  getMultiples$$(): Observable<Multiple[]> {
    return this.testId$$.pipe(
      switchMap(testId => this.testsService.getTestById$$(testId)),
      map(test => {
        if(test) {
          return test.getMultiples('id');
        } else {
          return [];
        }
      })
    )
  }

  increment(multipleId: string, prop: 'successes' | 'fails', e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const test$ = this.testId$$.pipe(
      switchMap(testId => this.testsService.getTestById$$(testId).pipe(take(1)))
    )

    test$.subscribe(test => {
      if(test) {
        const multiple = test.getMultipleById(multipleId);
        if(multiple) {
          multiple[prop] += 1;
          this.testsService.editTestMultiple(test.id, multipleId, multiple.toJson())
        }
      }
    })
  }

}
