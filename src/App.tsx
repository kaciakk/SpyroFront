import { useEffect, useState } from "react";
import "./App.css";
import { getEnergyMix } from "./api/energyApi";
import type { DailyEnergyMix } from "./types/energy";
import EnergyPieChart from "./components/EnergyPieChart";
import ChargingWindowForm from "./components/ChargingWindowForm";

function App() {
  const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEnergyMix() {
      try {
        const data = await getEnergyMix();
        setEnergyMix(data);
      } catch {
        setError("Could not load energy mix data.");
      } finally {
        setLoading(false);
      }
    }

    loadEnergyMix();
  }, []);

  return (
    <main className="app">
      <h1>Great Britain Energy Mix</h1>

      {loading && <p>Loading energy mix...</p>}
      {error && <p className="error">{error}</p>}

      <section className="charts-grid">
        {energyMix.map((day) => (
          <EnergyPieChart key={day.date} data={day} />
        ))}
      </section>

      <ChargingWindowForm />
    </main>
  );
}

export default App;
