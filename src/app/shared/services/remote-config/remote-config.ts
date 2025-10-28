import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getBoolean, getValue } from '@angular/fire/remote-config';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { KeysRemoteConfig } from 'src/environments/environment';

type ParamsRemoteConfig = {
  [KeysRemoteConfig.CATEGORIES_FEATURE_DISABLED]: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  constructor(
    private remoteConfig: RemoteConfig
  ) { }

  private flagsParams$ = new BehaviorSubject<ParamsRemoteConfig>({
    [KeysRemoteConfig.CATEGORIES_FEATURE_DISABLED]: false
  });

  async initializeRemoteConfig(): Promise<void> {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 60_000,
      fetchTimeoutMillis: 10_000
    };

    this.remoteConfig.defaultConfig = { [KeysRemoteConfig.CATEGORIES_FEATURE_DISABLED]: false };

    try {
      await fetchAndActivate(this.remoteConfig);
    } catch {
      console.warn('No se pudo activar Remote Config, usando defaults.');
    }

    this.publish();
  }

  private publish(): void {
    const next: ParamsRemoteConfig = {
      [KeysRemoteConfig.CATEGORIES_FEATURE_DISABLED]: getValue(this.remoteConfig, KeysRemoteConfig.CATEGORIES_FEATURE_DISABLED).asBoolean()
    };
    this.flagsParams$.next(next);
  }

  flag$(key: keyof ParamsRemoteConfig): Observable<boolean> {
    return this.flagsParams$.pipe(
      map(f => f[key]),
      distinctUntilChanged()
    );
  }
}
