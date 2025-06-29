import { useEffect, useState } from "react";

export default function PriceTicker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setPrice(parseFloat(data.p));
    };
    return () => ws.close();
  }, [symbol]);
  return (
    <div className="text-4xl font-mono">
      {symbol.toUpperCase()} – {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </div>
  );
}
