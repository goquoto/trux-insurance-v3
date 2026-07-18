import { useState, useMemo } from "react";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { carriers, allMarkets, allAmsOptions, getAllLobs } from "@/data/carriers";

export default function HubCarriers() {
  const [search, setSearch] = useState("");
  const [marketFilters, setMarketFilters] = useState<string[]>([]);
  const [amsFilters, setAmsFilters] = useState<string[]>([]);
  const [lobFilters, setLobFilters] = useState<string[]>([]);
  const allLobs = useMemo(() => getAllLobs(), []);

  const filtered = useMemo(() => {
    return carriers.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (marketFilters.length > 0 && !marketFilters.some(m => c.markets.includes(m))) return false;
      if (amsFilters.length > 0 && !amsFilters.includes(c.ams)) return false;
      if (lobFilters.length > 0 && !lobFilters.some(l => c.lob.includes(l))) return false;
      return true;
    });
  }, [search, marketFilters, amsFilters, lobFilters]);

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const clearAll = () => { setMarketFilters([]); setAmsFilters([]); setLobFilters([]); setSearch(""); };

  return (
    <AgencyHubLayout>
      <div className="hub-carriers-page">
        <div className="hub-carriers-sidebar">
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="hub-filter-search"
          />

          <div className="hub-filter-group">
            <h4>Markets</h4>
            {allMarkets.map(m => (
              <label key={m} className="hub-filter-checkbox">
                <input type="checkbox" checked={marketFilters.includes(m)} onChange={() => toggleFilter(marketFilters, setMarketFilters, m)} />
                <span>{m}</span>
                <span className="hub-filter-count">({carriers.filter(c => c.markets.includes(m)).length})</span>
              </label>
            ))}
          </div>

          <div className="hub-filter-group">
            <h4>AMS Integration</h4>
            {allAmsOptions.map(a => (
              <label key={a} className="hub-filter-checkbox">
                <input type="checkbox" checked={amsFilters.includes(a)} onChange={() => toggleFilter(amsFilters, setAmsFilters, a)} />
                <span>{a}</span>
                <span className="hub-filter-count">({carriers.filter(c => c.ams === a).length})</span>
              </label>
            ))}
          </div>

          <div className="hub-filter-group">
            <h4>Lines of Business</h4>
            <div className="hub-lob-list">
              {allLobs.map(l => (
                <label key={l} className="hub-filter-checkbox">
                  <input type="checkbox" checked={lobFilters.includes(l)} onChange={() => toggleFilter(lobFilters, setLobFilters, l)} />
                  <span>{l}</span>
                  <span className="hub-filter-count">({carriers.filter(c => c.lob.includes(l)).length})</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={clearAll} className="hub-clear-btn">Clear filters</button>
        </div>

        <div className="hub-carriers-results">
          <div className="hub-carriers-header">
            <span>{filtered.length} of {carriers.length} companies</span>
          </div>
          <div className="hub-carriers-table">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Lines of Business</th>
                  <th>Markets</th>
                  <th>AMS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.name}>
                    <td className="hub-carrier-name">{c.name}</td>
                    <td>
                      <div className="hub-tag-list">
                        {c.lob.map(l => <span key={l} className="hub-tag">{l}</span>)}
                      </div>
                    </td>
                    <td>{c.markets.join(", ") || "—"}</td>
                    <td>{c.ams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AgencyHubLayout>
  );
}
