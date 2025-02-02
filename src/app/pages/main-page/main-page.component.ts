import { Component } from '@angular/core';
import { openDB } from 'idb';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  modes={
    introduction:"introduction",
    donation:"donation"
  }

  mode:string=this.modes.introduction

  changeMode(mode:string){
    this.mode=mode
  }


  storedData: string | null = null;

  async saveData() {
    const db = await openDB('myDatabase', 1, {
      upgrade(db) {
        db.createObjectStore('store');
      }
    });
    await db.put('store', 'John Doe', 'user_name');
    alert('Data saved!');
  }

  async loadData() {
    const db = await openDB('myDatabase', 1);
    this.storedData = await db.get('store', 'user_name');
    alert(`Stored Value: ${this.storedData}`);
  }

}
