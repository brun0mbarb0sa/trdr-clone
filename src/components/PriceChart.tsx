import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function PriceChart({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = createChart(ref.current, { width: ref.current.offsetWidth, height: 300, layout: { background: { color: "#1e293b" }, textColor: "#FFFFFF" } });
    const candle = chart.addCandlestickSeries();

    const fetchHistory = async () => {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1m&limit=100`);
      const data = await res.json();
      const formatted = data.map((d: any) => ({ time: d[0] / 1000, open: +d[1], high: +d[2], low: +d[3], close: +d[4] }));
      candle.setData(formatted);
    };

    fetchHistory();

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_1m`);
    ws.onmessage = (msg) => {
      const { k } = JSON.parse(msg.data);
      candle.update({ time: k.t / 1000, open: +k.o, high: +k.h, low: +k.l, close: +k.c });
    };

    return () => ws.close();
  }, [symbol]);

  return <div ref={ref} />;
}
