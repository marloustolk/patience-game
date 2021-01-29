import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Card } from "../card";

@Component({
  selector: 'app-foundationpile',
  templateUrl: './foundationpile.component.html',
  styleUrls: ['./foundationpile.component.css']
})
export class FoundationpileComponent implements OnInit {
@Input() nr: number;
@Output() putEvent: EventEmitter<any> = new EventEmitter();
cards: Card[] = new Array();
id: string;

  ngOnInit(){
    this.id = "foundationpile-" + (this.nr).toString();
  }

  public clear(){
    this.cards = new Array();
  }

  getTopCard(): Card {
    return (this.cards.length == 0) ? null : this.cards[0];
  }

  getSecondCard(): Card {
    return (this.cards.length > 1) ? this.cards[1] : null;
  }

  drop(event: CdkDragDrop<Card[]>) {
    let index = this.getIndex(event);
    let card = event.previousContainer.data[index];
    if (this.canPlace(card)){
       let cardRemoved  = event.previousContainer.data.splice(index,1)[0];
       event.container.data.unshift(cardRemoved);
       this.putEvent.emit();
    }
  }

  canPlace(card: Card): boolean {
    if (this.cards.length > 0) {
      let topCard = this.getTopCard();
      return card.suit == topCard.suit && card.isOneValueHigherThen(topCard);
    }
    return this.cards.length == 0 && card.isAce();
  }

  getIndex(event: CdkDragDrop<Card[]>): number {
    if (event.previousContainer.id.startsWith("foundationpile")){
      return 0;
    }
    return event.previousContainer.id.startsWith("mainpile") ? event.previousContainer.data.length - 1: event.previousIndex;
  }
}