import { Component, OnInit, ViewChild } from '@angular/core';


import {ItemService} from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

  private items;
  private itemCount: number;
  private newItem: string = '';
  private alertMessage: string  = '';
  private isNew: boolean  = true;
  private selectedKey: number;

  @ViewChild('itemInput') itemInputElement: any;

  constructor(private service: ItemService) {
    console.log('itemComponent constructor entered')
  }

  getItems(updateMessage: boolean) {
    return this.service.get().then(response => {
      var r = response['_body'];
      console.log("response", r);
      this.items = r.data;
      this.itemCount = this.items? this.items.length : 0;
      if(updateMessage) {
        this.alertMessage = r.message;
      }
    });
  }

  addOrUpdateItem() {
    if(this.isNew) {
      this.addItem();
    } else {
      this.updateItem();
    }
  }

  addItem() {
    this.service.add({value: this.newItem}).then(response => {
      var r = response['_body'];
      console.log("response", r);
      this.alertMessage = r.message;
      return this.getItems(false);
    }).then(() => {
      this.resetNew();
    });
  }
  
  updateItem() {
    this.service.update(this.selectedKey, {value: this.newItem}).then(response => {
      var r = response['_body'];
      console.log("response", r);
      this.alertMessage = r.message;
      return this.getItems(false);
    }).then(() => {
      this.resetNew();
    });
  }

  deleteItem(key) {
    this.service.delete(key).then(response => {
      var r = response['_body'];
      console.log("response", r);
      this.alertMessage = r.message;
      return this.getItems(false);
    }).then(() => {
      this.resetNew();
    });
  }

  setupUpdate(data) {
    this.isNew = false;
    this.newItem = data.value;
    this.selectedKey = data.key;
    this.itemInputElement.nativeElement.focus();
  }

  resetNew() {
    this.newItem = '';
    this.isNew = true;
  }

  ngOnInit() {
    this.getItems(true);
  }

}
