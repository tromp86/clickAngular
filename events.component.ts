import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  phrases: string[] = [
    'Learn angular!',
    'Keep going!',
    "You're doing great!",
    'Stay motivated!',
    'Believe in yourself!',
    'Dream big!',
    'Never give up!',
    'Success is near!',
    "You've got this!",
    'Think positive!',
  ];
  name = 'Clicker Game';
  start: string = '';
  isRed = false;
  progressIncreasePerClick = 1;
  clickCount: number = 0;
  acceleratorCount: number = 0;
  acceleratorCost: number = 10;
  divs: { id: number; phrase: string }[] = [];
  intervalId: number | undefined;

  progressBarMaxValue = 100;
  progressBar: number = 0;
  isProgressBarFull: boolean = false;
  timer: any;

  isDarkMode: boolean = false;
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  clickSound = new Audio('/assets/button-pressed.mp3');
  levelUpSound = new Audio('/assets/desktop-logout.mp3');
  ower = new Audio('/assets/ower.mp3');
  perfekt = new Audio('/assets/perfekt.mp3');
  constructor() {
    this.startTimer();
    this.startTimerOfset;
  }

  getRandomPhrase(): string {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  incrementClickCount(): void {
    this.clickCount += 1 + this.acceleratorCount;
    console.log(this.clickCount);
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.progressIncreasePerClick = 1;
    this.progressBar -= this.progressIncreasePerClick;

    let progressBarMaxValue = 100;
    if (this.progressBar >= progressBarMaxValue) {
      this.isProgressBarFull = true;
      this.progressBar = progressBarMaxValue;
    } else {
      this.isProgressBarFull = false;
    }

    switch (this.clickCount) {
      case 10:
        if (this.clickCount >= 10) {
          this.startLevelInterval();
        }
        break;
      case 50:
        if (this.clickCount >= 50) {
          this.startLevelInterval();
        }
        break;
      case 100:
        if (this.clickCount >= 100) {
          this.startLevelInterval();
          this.startTimerOfset();
        }
        break;
      case 200:
        if (this.clickCount >= 200) {
          this.startLevelInterval();
          this.startTimerOfset();
        }
        break;
      case 350:
        if (this.clickCount >= 350) {
          this.startLevelIntervalMAX();
          this.startTimerOfset();
        }
        break;
      case 500:
        if (this.clickCount >= 500) {
          this.startLevelIntervalMAX();
          this.startTimerOfset();
        }
        break;
      case 850:
        if (this.clickCount >= 850) {
        }
        break;
      default:
        break;
    }
  }

  startTimer(): void {
    const timerInterval = 30;
    this.timer = setInterval(() => {
      if (!this.isProgressBarFull) {
        // this.progressBar += 1.17;
        this.progressBar += 0.2;

        if (this.acceleratorCount === 7) {
          setTimeout(() => {
            this.name = 'You Win !!!';
            this.clickCount = 0;
            this.progressBar = 0;
            clearInterval(this.intervalId);
            this.perfekt.volume = 0.3;
            this.perfekt.play();
          }, 0);
        }

        this.progressBarMaxValue = 100;
        if (this.progressBar >= this.progressBarMaxValue) {
          this.isProgressBarFull = true;
          this.progressBar = this.progressBarMaxValue;
          this.name = 'Game Over';
          if (this.isProgressBarFull) {
            clearInterval(this.intervalId);
            this.ower.play();
          }
        }
      }
    }, timerInterval);
  }

  startTimerOfset(): void {
    const timerInterval = 1500;
    this.timer = setInterval(() => {
      if (!this.isProgressBarFull) {
        this.progressBar -= 2;
      }
    }, timerInterval);
  }

  buyAccelerator(): void {
    if (this.clickCount >= this.acceleratorCost) {
      this.isRed = true;
      setTimeout(() => {
        this.isRed = false;
      }, 4000);
      this.clickCount -= this.acceleratorCost;
      this.acceleratorCount++;
      this.acceleratorCost *= 2;
      if (this.acceleratorCount) {
        this.progressBar = 0;
        this.levelUpSound.currentTime = 0;
        this.levelUpSound.volume = 0.3;
        this.levelUpSound.play();
      }
      if (this.acceleratorCount === 1) {
        this.name = 'Перший рівень';
      } else if (this.acceleratorCount === 2) {
        this.name = 'Другий рівень';
      } else if (this.acceleratorCount === 3) {
        this.name = 'Третій рівень';
      } else if (this.acceleratorCount === 4) {
        this.name = 'Четвертий рівень';
      } else if (this.acceleratorCount === 5) {
        this.name = 'Пятий рівень';
      } else if (this.acceleratorCount === 6) {
        this.name = 'Шостий рівень';
      } else if (this.acceleratorCount === 7) {
      }

      const randomPhrase = this.getRandomPhrase();
      console.log(randomPhrase);
      this.divs.push({ id: this.divs.length + 1, phrase: randomPhrase });
    }
  }
  startLevelInterval(): void {
    this.intervalId = setInterval(() => {
      this.clickCount += 2;
    }, 2000) as unknown as number;
  }
  startLevelIntervalMAX(): void {
    this.intervalId = setInterval(() => {
      this.clickCount += 8;
    }, 2000) as unknown as number;
  }
  getButtonClass(): string {
    if (this.isProgressBarFull) {
      return 'custom-button';
    } else {
      return 'disabled-button';
    }
  }
  startGame(): void {
    this.clickCount = 0;
    this.acceleratorCount = 0;
    this.acceleratorCost = 10;
    this.progressBarMaxValue = 100;
    setTimeout(() => {
      this.name = 'Clicker Game';
    }, 0);
    this.divs = [];
    clearInterval(this.timer);
    clearInterval(this.intervalId);
    this.progressBar = 0;
    this.isProgressBarFull = false;
    this.startTimer();
    console.log('Starting new game...');
  }
}
