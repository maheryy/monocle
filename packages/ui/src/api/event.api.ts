import api from ".";

export function getEventStats() {
  return api.get("/events/stats").json();
}
