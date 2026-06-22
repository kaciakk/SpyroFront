import type { ChargingWindow, DailyEnergyMix } from "../types/energy";

const API_URL = "http://localhost:8080/api";

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await fetch(`${API_URL}/energy-mix`);

  if (!response.ok) {
    throw new Error("Failed to fetch energy mix");
  }

  return response.json();
}

export async function getChargingWindow(
  hours: number,
): Promise<ChargingWindow> {
  const response = await fetch(`${API_URL}/charging-window?hours=${hours}`);

  if (!response.ok) {
    throw new Error("Failed to fetch charging window");
  }

  return response.json();
}
