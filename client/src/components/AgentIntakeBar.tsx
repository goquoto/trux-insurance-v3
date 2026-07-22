import { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';

interface AgentIntakeBarProps {
  onCustomerSelect: (customer: { id: number; name: string; email: string; title: string | null } | null) => void;
  selectedCustomer: { id: number; name: string; email: string; title: string | null } | null;
}

export default function AgentIntakeBar({ onCustomerSelect, selectedCustomer }: AgentIntakeBarProps) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Only show for staff/admin
  const isStaff = user && (user as any).role && ['staff', 'admin'].includes((user as any).role);

  // ALL hooks must be called unconditionally (before any early return)
  const { data: customers = [] } = trpc.portal.listUsers.useQuery(undefined, {
    enabled: !!isStaff, // only fetch if staff
    select: (data: any[]) => data.filter((u: any) => u.role === 'customer' && u.accountStatus === 'approved'),
  });

  const filtered = useMemo(() => {
    if (!search) return customers as any[];
    return (customers as any[]).filter((c: any) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  // Now safe to return early
  if (!isStaff) return null;

  return (
    <div className="agent-intake-bar">
      <div className="agent-intake-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span className="agent-intake-title">Agent Intake Mode</span>
      </div>

      {selectedCustomer ? (
        <div className="agent-intake-selected">
          <div className="agent-intake-selected-info">
            <span className="agent-intake-selected-name">{selectedCustomer.name}</span>
            <span className="agent-intake-selected-email">{selectedCustomer.email}</span>
            {selectedCustomer.title && (
              <span className="agent-intake-selected-company">{selectedCustomer.title}</span>
            )}
          </div>
          <button
            className="agent-intake-clear"
            onClick={() => onCustomerSelect(null)}
            title="Clear selection"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="agent-intake-search-wrapper">
          <input
            className="form-input agent-intake-search"
            placeholder="Search customer by name, email, or company..."
            value={search}
            onChange={e => { setSearch(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && filtered.length > 0 && (
            <div className="agent-intake-dropdown">
              {filtered.slice(0, 8).map((c: any) => (
                <button
                  key={c.id}
                  className="agent-intake-option"
                  onClick={() => {
                    onCustomerSelect({ id: c.id, name: c.name, email: c.email, title: c.title });
                    setSearch('');
                    setIsOpen(false);
                  }}
                >
                  <span className="agent-intake-option-name">{c.name}</span>
                  <span className="agent-intake-option-email">{c.email}</span>
                  {c.title && <span className="agent-intake-option-company">{c.title}</span>}
                </button>
              ))}
            </div>
          )}
          {isOpen && search && filtered.length === 0 && (
            <div className="agent-intake-dropdown">
              <div className="agent-intake-no-results">No customers found</div>
            </div>
          )}
        </div>
      )}

      <p className="agent-intake-note">
        Filing on behalf of a customer. Submission will be attributed to you as the agent.
      </p>
    </div>
  );
}
