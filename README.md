 resetIdleTimer() {
    console.log('User activity detected. Resetting idle timer.');
    this.bnIdle.resetTimer(); // Reset the idle timer when the user interacts
    this.startIdleWatcher(); // Restart watcher to ensure it continues detecting inactivity
  }


  document.addEventListener('mousemove', () => this.resetIdleTimer());
document.addEventListener('keydown', () => this.resetIdleTimer());
document.addEventListener('click', () => this.resetIdleTimer());
