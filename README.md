import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IdleService {
  private idleTime = 900; // 15 minutes
  private timeoutWarning = 30; // 30 seconds before session expires

  constructor(private idle: Idle, private keepalive: Keepalive, private router: Router) {
    this.setupIdleWatcher();
  }

  private setupIdleWatcher() {
    this.idle.setIdle(this.idleTime); // Time before user is considered idle
    this.idle.setTimeout(this.timeoutWarning); // Time before session expires after idle warning
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // Detect activity (clicks, mouse movement, etc.)

    this.idle.onIdleStart.subscribe(() => {
      console.log('User is idle.');
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      console.log(`Session will expire in ${countdown} seconds.`);
      // You can trigger a modal here
      alert(`You have been idle. Your session will expire in ${countdown} seconds.`);
    });

    this.idle.onTimeout.subscribe(() => {
      console.log('Session expired.');
      this.logout();
    });

    this.idle.onInterrupt.subscribe(() => {
      console.log('User activity detected, resetting idle timer.');
      this.resetIdle();
    });

    this.keepalive.interval(600); // Keepalive ping every 10 minutes
    this.keepalive.onPing.subscribe(() => console.log('Keepalive ping sent'));

    this.startWatching();
  }

  startWatching() {
    console.log('Idle watcher started.');
    this.idle.watch();
  }

  resetIdle() {
    this.idle.watch();
  }

  logout() {
    alert('Session expired. Logging out...');
    this.router.navigate(['/login']);
  }
}
