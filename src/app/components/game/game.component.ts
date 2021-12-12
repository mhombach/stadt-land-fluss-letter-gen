import { Component, HostBinding, HostListener } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  private HOLD_DELAY_IN_MS: number = 200;

  private holdingTimeout: any;
  private holdingDelayTimeout: any;
  private clickHoldingState: boolean;

  @HostBinding('class.allLettersUsed')
  allLettersUsed: boolean;

  @HostBinding('class.gameHasntStarted')
  get gameHasntStarted(): boolean {
    return this.gameService.currentLetter === undefined;
  }

  @HostBinding('class.holding')
  get isHolding(): boolean {
    return this.holdingTimeout !== undefined;
  }
  constructor(public gameService: GameService) {
    this.allLettersUsed = false;
    this.clickHoldingState = false;
  }

  @HostListener('document:touchstart')
  mouseDown(): void {
    if(!this.gameHasntStarted) {
      this.holdingDelayTimeout = window.setTimeout(() => {
        this.clickHoldingState = true;
        this.holdingTimeout = window.setTimeout(() => {
          this.reset();
        }, 1000);
      }, this.HOLD_DELAY_IN_MS);
    }
  }

  reset(): void {
    this.gameService.reset();
    this.holdingDelayTimeout = undefined;
    this.holdingTimeout = undefined;
    this.allLettersUsed = false;
  }

  @HostListener('document:touchend')
  mouseUp(): void {
    window.clearTimeout(this.holdingDelayTimeout);
    window.clearTimeout(this.holdingTimeout);
    this.holdingDelayTimeout = undefined;
    this.holdingTimeout = undefined;
    if(!this.clickHoldingState) {
      if(this.gameHasntStarted || !this.allLettersUsed) {
        this.nextLetter();
      } else {
        this.reset();
      }
    }
    this.clickHoldingState = false;
  }

  nextLetter(): void {
    if(this.gameService.lastLetter) {
      this.allLettersUsed = true;
    } else {
      this.gameService.getNewLetter();
    }
  }

}
