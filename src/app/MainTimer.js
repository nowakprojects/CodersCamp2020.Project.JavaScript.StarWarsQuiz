export class MainTimer {
  constructor(time) {
    this.time = time;
  }

  startCountdown(callbackUpdateTimeFunction, callbackEndOfTimeFunction) {
    const timer = setInterval(() => {
      callbackUpdateTimeFunction(this.time);
      if (this.time <= 0) {
        callbackEndOfTimeFunction();
        clearInterval(timer);
      }
      this.time -= 1;
    }, 1000);
  }
}
