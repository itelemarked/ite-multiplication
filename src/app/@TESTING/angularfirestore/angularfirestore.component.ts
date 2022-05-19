import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeType } from '@angular/fire/compat/firestore';
import { take } from 'rxjs';
import { Multiple } from '../../models/multiple/multiple.model';

@Component({
  selector: 'app-angularfirestore',
  templateUrl: './angularfirestore.component.html',
  styleUrls: ['./angularfirestore.component.scss']
})
export class AngularfirestoreComponent implements OnInit {

  private booksRef = this.afs.collection<any>('books')
  books$ = this.booksRef.valueChanges({idField: 'id'})

  constructor(private afs: AngularFirestore) {
    this.books$.subscribe(console.log)
  }

  addBook(title: string | number | undefined | null) {
    if (!title) return;
    this.booksRef.add({title})
  }

  removeBook(id: string) {
    this.booksRef.doc(id).delete()
  }

  /**
   * WORKING, NEWDOC IS CATCHED IN OFFLINE MODE. SUBOPTIMAL HOWEVER...
   */
  // constructor(private afs: AngularFirestore) {
  //   const booksRef = this.afs.collection<any>('books')
  //   const books$ = booksRef.valueChanges({idField: 'id'})
  //   // const books$ = booksRef.snapshotChanges()
  //   // const books$ = booksRef.snapshotChanges(['added', 'removed'])

  //   books$.subscribe(console.log)

  //   let newDoc: AngularFirestoreDocument;
  //   setTimeout(() => {
  //     newDoc = booksRef.doc()
  //     newDoc.set({title: 'another cool book'}).then(_ => {
  //       console.log(`newDoc set, id: ${newDoc.ref.id}`)
  //     })
  //   }, 2000);

  //   setTimeout(() => {
  //     newDoc.delete().then(_ => {
  //       console.log(`newDoc removed, id: ${newDoc.ref.id}`)
  //     })
  //   }, 5000);

  // }

  /**
   * NOT WORKING, NEWID IS NOT CATCH IN OFFLINE MODE
   */
  // constructor(private afs: AngularFirestore) {
  //   const booksRef = this.afs.collection<any>('books')
  //   const books$ = booksRef.valueChanges({idField: 'id'})
  //   // const books$ = booksRef.snapshotChanges()
  //   // const books$ = booksRef.snapshotChanges(['added', 'removed'])

  //   books$.subscribe(console.log)

  //   let newId: string
  //   setTimeout(() => {
  //     booksRef.add({title: 'another cool book'}).then(res => {
  //       newId = res.id;
  //       console.log(`added id: ${newId}`)
  //     })
  //   }, 2000);

  //   setTimeout(() => {
  //     booksRef.doc(newId).delete().then(_ => {
  //       console.log(`removed id: ${newId}`)
  //     })
  //   }, 5000);
  // }

  ngOnInit(): void {}
}
