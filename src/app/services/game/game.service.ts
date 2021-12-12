import { Injectable } from '@angular/core';
import ALPHABET from '../../../assets/alphabet.json';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentLetter?: IAlphabetLetter;
  alphabet!: IAlphabetLetter[];
  lastLetter!: boolean;

  constructor() {
    this.reset();
    console.log('Loaded alphabet:', this.alphabet);
  }

  private processAlphabet(alphabet: string[]): IAlphabetLetter[] {
    return alphabet.map((letter) => {
      return {
        value: letter,
        used: false,
      }
    });
  }

  getNewLetter(): void {
    const availableLetters: IAlphabetLetter[] = this.alphabet.filter(entry => !entry.used);
    if(availableLetters.length === 1) {
      this.lastLetter = true;
    }
    const randomPosition: number = this.getRandomInt(availableLetters.length);
    const chosenLetter: IAlphabetLetter = availableLetters[randomPosition];
    chosenLetter.used = true;
    this.currentLetter = chosenLetter;
  }

  reset(): void {
    this.alphabet = this.processAlphabet(ALPHABET);
    this.lastLetter = false;
    this.currentLetter = undefined;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}

export interface IAlphabetLetter {
  value: string;
  used: boolean;
}