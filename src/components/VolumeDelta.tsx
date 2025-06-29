import { useEffect, useState } from "react";

export default function VolumeDelta({ symbol }: { symbol: string }) {
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    let cumDelta = 0;
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@aggTrade`);
    ws.onmessage = (msg) => {
      const d = JSON.parse(msg.data);
      const qty = parseFloat(d.q);
      cumDelta += d.m ? -qty : qty; // m: trade is market maker (sell side)
      setDelta(cumDelta);
    };
    return () => ws.close();
  }, [symbol]);

  return (
    <div className="p-4 bg-slate-800 rounded">
      <h2 className="text-lg mb-2">Volume Delta</h2>
      <div className="text-3xl font-mono">{delta.toFixed(3)}</div>
    </div>
  );
}
