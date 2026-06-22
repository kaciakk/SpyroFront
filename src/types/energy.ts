export type DailyEnergyMix = {
  date: string;
  generationMix: Record<string, number>;
  cleanEnergyPercentage: number;
};

export type ChargingWindow = {
  start: string;
  end: string;
  cleanEnergyPercentage: number;
};
