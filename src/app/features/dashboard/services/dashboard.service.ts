import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface SystemStats {
  cpuUsage: number;
  ramUsage: number;
  temperature: number;
  networkIn: number;
  networkOut: number;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // Matches server.js endpoint: GET /api/stats/latest
  private readonly API_URL = `${environment.apiUrl}/stats/latest`;

  constructor(private http: HttpClient) {}

  getSystemStats(): Observable<SystemStats> {
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get<any>(this.API_URL)),
      map(data => {
        // Handle array response (if API returns list) or single object
        const latest = Array.isArray(data) ? data[0] : data;
        
        // Map from DB column names (server.js) to Frontend Interface
        return {
          cpuUsage: latest.cpu_usage || 0,
          ramUsage: latest.ram_usage || 0,
          temperature: latest.temperature || 0,
          networkIn: latest.network_in || 0,
          networkOut: latest.network_out || 0,
          timestamp: latest.timestamp
        };
      }),
      shareReplay(1)
    );
  }
}