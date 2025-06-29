import PriceTicker from "../components/PriceTicker";
import VolumeDelta from "../components/VolumeDelta";
import PriceChart from "../components/PriceChart";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-2xl mb-4">TRDR.io Clone — BTC/USDT</h1>
      <PriceTicker symbol="btcusdt" />
      <div className="flex space-x-4 mt-6">
        <div className="w-2/3">
          <PriceChart symbol="btcusdt" />
        </div>
        <div className="w-1/3">
          <VolumeDelta symbol="btcusdt" />
        </div>
      </div>
    </div>
  );
}
