import { useState } from "react";
import { getChargingWindow } from "../api/energyApi";
import type { ChargingWindow } from "../types/energy";

export default function ChargingWindowForm() {
  const [hours, setHours] = useState(3);
  const [result, setResult] = useState<ChargingWindow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await getChargingWindow(hours);
      setResult(data);
    } catch {
      setError("Could not calculate charging window.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="charging-section">
      <h2>Find best charging window</h2>

      <form onSubmit={handleSubmit} className="charging-form">
        <label>
          Charging time:
          <input
            type="number"
            min={1}
            max={6}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-card">
          <p>
            <strong>Start:</strong> {new Date(result.start).toLocaleString()}
          </p>

          <p>
            <strong>End:</strong> {new Date(result.end).toLocaleString()}
          </p>

          <p>
            <strong>Average clean energy:</strong>{" "}
            {result.cleanEnergyPercentage.toFixed(2)}%
          </p>
        </div>
      )}
    </section>
  );
}
