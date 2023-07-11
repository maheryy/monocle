import { BaseClient, Payload } from "@monocle/core";
import { BrowserClientOptions } from "./types";
import { onCLS, onLCP, onFID, onFCP, onTTFB, onINP } from "web-vitals";
import {
  bufferCount,
  bufferWhen,
  filter,
  fromEvent,
  map,
  merge,
  takeWhile,
  throttleTime,
} from "rxjs";

export class BrowserClient extends BaseClient {
  constructor({ app, url }: BrowserClientOptions) {
    super({ app, url });
  }

  private send(endpoint: string, payload: Payload): void {
    const body = new Blob(
      [
        JSON.stringify({
          ...payload,
          app: this.app,
          userId: this.userId,
        }),
      ],
      { type: "application/json" }
    );

    const url = new URL(endpoint, this.url);

    const isQueued = navigator.sendBeacon(url, body);

    if (!isQueued) {
      fetch(url, { body, method: "POST", keepalive: true });
    }
  }

  event(name: string, payload?: Payload): void {
    if (!payload) {
      return this.send("/events", { name });
    }

    this.send("/events", { name, payload });
  }

  metric(name: string, value: number): void {
    this.send("/metrics", { name, value });
  }

  dimension(name: string, value: string): void {
    this.send("/dimensions", { name, value });
  }

  page(): void {
    this.dimension("page", window.location.href);
  }

  time(action: string, duration = performance.now()): void {
    this.metric(action, duration);
  }

  vitals(): void {
    onCLS(({ name, value }) => {
      this.metric(name, value);
    });

    onLCP(({ name, value }) => {
      this.metric(name, value);
    });

    onFID(({ name, value }) => {
      this.metric(name, value);
    });

    onFCP(({ name, value }) => {
      this.metric(name, value);
    });

    onTTFB(({ name, value }) => {
      this.metric(name, value);
    });

    onINP(({ name, value }) => {
      this.metric(name, value);
    });
  }

  mouse(): void {
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

    mousePositions$
      .pipe(bufferWhen(() => trigger$))
      .subscribe((mousePositions) => {
        this.event("mouse", {
          page: window.location.href,
          mousePositions,
        });
      });
  }
}
