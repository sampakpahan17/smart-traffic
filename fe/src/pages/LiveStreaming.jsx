import React, { useEffect, useState } from "react";
import { getStreams, getDataLocation, streamUrl } from "../utils/api";
import VehicleStats from "../components/VehicleStats";
import { VehiclePie } from "../components/TrafficChart";

export default function LiveStreaming(){
  const [streams, setStreams] = useState([]);
  const [selected, setSelected] = useState("");
  const [counts, setCounts] = useState({});
  const [lineData, setLineData] = useState([]);

  useEffect(()=>{
    getStreams().then(r=>{
      const list = r.available_streams || r.available_streams || r.available_streams;
      // compatibility: some backend return list in root endpoint, else from /streams
      if(list && list.length) {
        setStreams(list);
        if(!selected) setSelected(list[0]);
      }
    }).catch(()=>{});
  },[]);

  // poll counts for selected
  useEffect(()=>{
    if(!selected) return;
    let mounted = true;
    async function poll(){
      try {
        const d = await getDataLocation(selected);
        if(!mounted) return;
        setCounts(d.counts || {});
        const total = Object.values(d.counts||{}).reduce((a,b)=>a+(b||0),0);
        setLineData(prev => [...prev.slice(-11), {time: new Date().toLocaleTimeString(), value: total}]);
      } catch(e){}
    }
    poll();
    const t = setInterval(poll, 3000);
    return ()=>{mounted=false; clearInterval(t);}
  },[selected]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Live Streaming: {selected}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-3">
            <select className="p-2 border rounded" value={selected} onChange={e=>setSelected(e.target.value)}>
              {streams.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="bg-black rounded-xl overflow-hidden">
            {selected ? (
              <img src={streamUrl(selected)} alt="Live Stream" className="w-full h-[480px] object-contain bg-black" />
            ) : (
              <div className="w-full h-[480px] flex items-center justify-center text-slate-400">Pilih lokasi</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <VehicleStats counts={counts} />
          <VehiclePie data={counts} />
        </div>
      </div>
    </div>
  );
}
