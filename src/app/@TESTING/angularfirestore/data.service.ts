import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITest, Test } from './Test';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  getTests$$(): Observable<Test[]> { return of([]); }

  getTestById$(id: string): Observable<Test | null> { return of(null); }

  getTestNextId$(): Observable<{nextId: string} | null> { return of(null) }

  addTest(test: Test) {}

  deleteTest(id: string) {}

  updateTest(id: string, options: Partial<Omit<Test, 'id'>>) {}

}
