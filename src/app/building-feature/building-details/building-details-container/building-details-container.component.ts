import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'building-details-container',
  
  template: `<div class="app-default-container"><br/><building-details [address]="address" [description]="description"></building-details><br /><br />
             <nickname-editor-container [existingNicknames]="nicknames"></nickname-editor-container>`
})
export class BuildingDetailsContainerComponent implements OnInit {
  get address(): string {
    return "30 St Mary Axe, London"
  }

  get description(): string {
    return "Known previously as the Swiss Re Building, informally known as The Gherkin, is a commercial skyscraper in London's primary financial district, the City of London. It was completed in December 2003 and opened in April 2004.";
  }

  nicknames: string[];
  existingNicknames: string[];

  constructor() {
    this.nicknames = new Array<string>();   
  }

  ngOnInit() {
    this.existingNicknames = [...this.nicknames];
  }
}