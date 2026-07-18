import { useState, useMemo } from "react";
import AgencyHubLayout from "@/components/AgencyHubLayout";
import { team, departments } from "@/data/team";

export default function HubTeam() {
  const [selectedDept, setSelectedDept] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    if (!selectedDept) return team;
    return team.filter(m => m.department === selectedDept);
  }, [selectedDept]);

  return (
    <AgencyHubLayout>
      <div className="hub-team-page">
        <div className="hub-team-controls">
          <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="hub-filter-select">
            <option value="">All Departments ({team.length})</option>
            {departments.map(d => (
              <option key={d} value={d}>{d} ({team.filter(m => m.department === d).length})</option>
            ))}
          </select>
          <div className="hub-view-toggle">
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Tiles</button>
          </div>
        </div>

        {view === "list" ? (
          <div className="hub-team-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Reports To</th>
                  <th>Hire Date</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.email}>
                    <td className="hub-team-name">{m.name}</td>
                    <td>{m.title}</td>
                    <td>{m.department}</td>
                    <td><span className={`hub-status-badge ${m.status.includes("Contractor") ? "contractor" : "fulltime"}`}>{m.status}</span></td>
                    <td>{m.reportsTo}</td>
                    <td>{m.hireDate}</td>
                    <td>
                      <a href={`mailto:${m.email}`} className="hub-contact-link">{m.email}</a>
                      {m.phone && <><br /><a href={`tel:${m.phone}`} className="hub-contact-link">{m.phone}</a></>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="hub-team-grid">
            {filtered.map(m => (
              <div key={m.email} className="hub-team-card">
                <div className="hub-team-card-avatar">
                  {m.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h4>{m.name}</h4>
                <p className="hub-team-card-title">{m.title}</p>
                <p className="hub-team-card-dept">{m.department}</p>
                <div className="hub-team-card-contact">
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                  {m.phone && <a href={`tel:${m.phone}`}>{m.phone}</a>}
                </div>
                <div className="hub-team-card-meta">
                  <span className={`hub-status-badge ${m.status.includes("Contractor") ? "contractor" : "fulltime"}`}>{m.status}</span>
                  <span>Since {m.hireDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AgencyHubLayout>
  );
}
