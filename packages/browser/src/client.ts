import { BaseClient } from "@monocle/core";
import { MonocleClientOptions } from "./types";
import {
  onCLS,
  onLCP,
  onFID,
  onFCP,
  onTTFB,
  onINP,
  CLSReportCallback,
} from "web-vitals";
import {
  Subscription,
  bufferCount,
  bufferWhen,
  fromEvent,
  map,
  merge,
  takeWhile,
  throttleTime,
} from "rxjs";

export class MonocleClient extends BaseClient {
  private mousePositionsSubscription?: Subscription;
  private static monocleInstance: MonocleClient;

  private constructor(options: MonocleClientOptions) {
    super(options);
  }

  private send(endpoint: string, payload: Record<string, unknown>): void {
    const body = new Blob(
      [
        JSON.stringify({
          ...payload,
          app: this.app,
          userId: this.userId,
          appId: this.identifier,
          source: "browser",
        }),
      ],
      { type: "application/json" }
    );

    const url = new URL(endpoint, this.host);
    const isQueued = navigator.sendBeacon(url, body);
    if (!isQueued) {
      fetch(url, { body, method: "POST", keepalive: true });
    }
  }

  event(name: string, payload?: Record<string, unknown>): void {
    this.send("/events", { name, ...(payload ? { payload } : {}) });
  }

  metric(name: string, value: number): void {
    this.send("/metrics", { name, value });
  }

  dimension(name: string, value: string): void {
    this.send("/dimensions", { name, value });
  }

  page(url?: string): void {
    this.dimension("page", url || window.location.href);
  }

  time(action: string, duration = performance.now()): void {
    this.metric(action, duration);
  }

  vitals(): void {
    const onReport: CLSReportCallback = ({ name, value }) => {
      return this.metric(name, value);
    };

    onCLS(onReport);
    onLCP(onReport);
    onFID(onReport);
    onFCP(onReport);
    onTTFB(onReport);
    onINP(onReport);
  }

  mouse(): { subscribe: () => void; unsubscribe: () => void } {
    const subscribe = () => {
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const visibilityChange$ = fromEvent(document, "visibilitychange");

      const mousePositions$ = mouseMove$.pipe(
        throttleTime(100),
        map(({ clientX, clientY, pageX, pageY, timeStamp }) => ({
          clientX,
          clientY,
          pageX,
          pageY,
          timeStamp,
        }))
      );

      const isHidden$ = visibilityChange$.pipe(
        takeWhile(() => document.visibilityState === "hidden")
      );

      const buffer$ = mousePositions$.pipe(bufferCount(100));
      const trigger$ = merge(buffer$, isHidden$);

      this.mousePositionsSubscription = mousePositions$
        .pipe(bufferWhen(() => trigger$))
        .subscribe((mousePositions) => {
          this.event("mouse", {
            page: window.location.href,
            mousePositions,
          });
        });
    };

    const unsubscribe = () => {
      if (this.mousePositionsSubscription) {
        this.mousePositionsSubscription.unsubscribe();
      }
    };

    return {
      subscribe,
      unsubscribe,
    };
  }

  static get monocle() {
    return this.monocleInstance;
  }

  static initialize(options: MonocleClientOptions) {
    if (this.monocleInstance) {
      return this.monocleInstance;
    }

    this.monocleInstance = new MonocleClient(options);
    return this.monocleInstance;
  }

  static isInitialized() {
    if (!this.monocleInstance) {
      throw new Error("Monocle has not been initialized.");
    }
  }

  static event(name: string, payload?: Record<string, unknown>) {
    this.isInitialized();
    return this.monocleInstance.event(name, payload);
  }

  static metric(name: string, value: number) {
    this.isInitialized();
    return this.monocleInstance.metric(name, value);
  }

  static dimension(name: string, value: string) {
    this.isInitialized();
    return this.monocleInstance.dimension(name, value);
  }

  static page(url?: string) {
    this.isInitialized();
    return this.monocleInstance.page(url);
  }

  static time(action: string, duration = performance.now()) {
    this.isInitialized();
    return this.monocleInstance.time(action, duration);
  }

  static vitals() {
    this.isInitialized();
    return this.monocleInstance.vitals();
  }

  static mouse() {
    this.isInitialized();
    return this.monocleInstance.mouse();
  }
}
