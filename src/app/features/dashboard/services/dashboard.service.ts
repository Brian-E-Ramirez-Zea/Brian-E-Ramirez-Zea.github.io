import { Injectable } from '@angular/core';
import { Observable, timer, map } from 'rxjs';

export interface SystemStats {
  cpuUsage: number;
  ramUsage: number;
  temperature: number;
  networkIn: number;
  networkOut: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  // Mock data stream simulating a Raspberry Pi 5
  getSystemStats(): Observable<SystemStats> {
    return timer(0, 2000).pipe(
      map(() => ({
        cpuUsage: Math.floor(Math.random() * 30) + 10, // Random 10-40%
        ramUsage: Math.floor(Math.random() * 20) + 40, // Random 40-60%
        temperature: Math.floor(Math.random() * 10) + 45, // 45-55 C
        networkIn: Math.floor(Math.random() * 1000), // kbps
        networkOut: Math.floor(Math.random() * 500)  // kbps
      }))
    );
  }
}
