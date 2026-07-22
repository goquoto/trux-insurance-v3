import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';

type Submission = {
  id: number;
  ref: string;
  type: string;
  userId: number | null;
  customerEmail: string | null;
  takenByUserId: number | null;
  workStatus: string;
  data: any;
  createdAt: Date;
};

const TYPE_LABELS: Record<string, string> = {
  policy_change: 'Policy Change',
  certificate: 'Certificate Request',
  claim: 'Claim',
  account_review: 'Account Review',
  contact: 'Contact',
  fast_quote: 'Fast Quote',
  full_quote: 'Full Quote',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  in_progress: 'In Progress',
  done: 'Done',
};

export default function HubSubmissions() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: submissions = [], refetch } = trpc.submissions.list.useQuery({
    search: search || undefined,
    type: typeFilter || undefined,
    workStatus: statusFilter || undefined,
    limit: 100,
    offset: 0,
  });

  const updateStatus = trpc.submissions.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  const handleStatusChange = (id: number, status: string) => {
    updateStatus.mutate({ id, workStatus: status as any });
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (d: any) => {
    if (!d) return '—';
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const renderDataFields = (data: any) => {
    if (!data) return <p style={{ color: 'var(--taupe)' }}>No data</p>;
    const entries = Object.entries(data).filter(([k, v]) => v !== null && v !== undefined && v !== '');
    return (
      <div className="submission-detail-grid">
        {entries.map(([key, value]) => (
          <div key={key} className="submission-detail-row">
            <span className="submission-detail-label">{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}</span>
            <span className="submission-detail-value">
              {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="hub-page">
      <div className="hub-page-header">
        <h2 className="hub-page-title">Submissions Inbox</h2>
        <p className="hub-page-desc">All form submissions from customers and agents.</p>
      </div>

      {/* Filters */}
      <div className="submissions-filters">
        <input
          className="form-input"
          placeholder="Search by ref, email, or content..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <select
          className="form-input"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          style={{ maxWidth: '180px' }}
        >
          <option value="">All Types</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          className="form-input"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ maxWidth: '160px' }}
        >
          <option value="">All Statuses</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Submissions list */}
      <div className="submissions-list">
        {(submissions as Submission[]).length === 0 && (
          <div className="hub-empty-state">
            <p>No submissions found.</p>
          </div>
        )}
        {(submissions as Submission[]).map((sub) => (
          <div key={sub.id} className={`submission-row ${expandedId === sub.id ? 'expanded' : ''}`}>
            <div className="submission-row-header" onClick={() => toggleExpand(sub.id)}>
              <div className="submission-row-left">
                <span className="submission-ref">{sub.ref}</span>
                <span className={`submission-type-badge type-${sub.type}`}>
                  {TYPE_LABELS[sub.type] || sub.type}
                </span>
              </div>
              <div className="submission-row-center">
                <span className="submission-email">{sub.customerEmail || '—'}</span>
                <span className="submission-date">{formatDate(sub.createdAt)}</span>
              </div>
              <div className="submission-row-right">
                <select
                  className={`submission-status-select status-${sub.workStatus}`}
                  value={sub.workStatus}
                  onChange={e => { e.stopPropagation(); handleStatusChange(sub.id, e.target.value); }}
                  onClick={e => e.stopPropagation()}
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <button className="submission-expand-btn" aria-label="Toggle details">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ transform: expandedId === sub.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
            </div>
            {expandedId === sub.id && (
              <div className="submission-row-detail">
                {sub.takenByUserId && (
                  <p className="submission-agent-note">Filed by agent (User ID: {sub.takenByUserId})</p>
                )}
                {renderDataFields(sub.data)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
