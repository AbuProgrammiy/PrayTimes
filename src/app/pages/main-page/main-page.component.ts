import { Component } from '@angular/core';

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
}
