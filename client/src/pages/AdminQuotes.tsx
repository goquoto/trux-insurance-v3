import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

export default function AdminQuotes() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Redirect if not admin
  React.useEffect(() => {
    if (user && user.role !== 'admin') {
      setLocation('/');
    }
  }, [user, setLocation]);

  const { data: quotes = [], isLoading } = trpc.quotes.getAll.useQuery();
  const updateStatusMutation = trpc.quotes.updateStatus.useMutation({
    onSuccess: () => {
      setSelectedQuoteId(null);
    },
  });

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredQuotes = statusFilter === 'all' 
    ? quotes 
    : quotes.filter(q => q.status === statusFilter);

  const selectedQuote = selectedQuoteId ? quotes.find(q => q.id === selectedQuoteId) : null;

  const handleStatusUpdate = (newStatus: string) => {
    if (selectedQuote) {
      updateStatusMutation.mutate({
        id: selectedQuote.id,
        status: newStatus as any,
        notes: selectedQuote.notes || undefined,
      });
    }
  };

  return (
    <Layout>
      <SEO
        title="Admin - Manage Quotes"
        description="Manage incoming trucking insurance quotes"
        canonical="/admin/quotes"
      />

      <div className="section container">
        <div className="mb-12">
          <h1 className="mb-4">Quote Management</h1>
          <p className="text-muted">Total Quotes: {quotes.length}</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* Quote List */}
          <div className="col-span-2">
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-purple text-white'
                    : 'bg-hair text-muted hover:bg-hair/80'
                }`}
              >
                All ({quotes.length})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'pending'
                    ? 'bg-purple text-white'
                    : 'bg-hair text-muted hover:bg-hair/80'
                }`}
              >
                Pending ({quotes.filter(q => q.status === 'pending').length})
              </button>
              <button
                onClick={() => setStatusFilter('under_review')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'under_review'
                    ? 'bg-purple text-white'
                    : 'bg-hair text-muted hover:bg-hair/80'
                }`}
              >
                Under Review ({quotes.filter(q => q.status === 'under_review').length})
              </button>
              <button
                onClick={() => setStatusFilter('approved')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'approved'
                    ? 'bg-purple text-white'
                    : 'bg-hair text-muted hover:bg-hair/80'
                }`}
              >
                Approved ({quotes.filter(q => q.status === 'approved').length})
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-hair border-t-purple rounded-full animate-spin mx-auto" />
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-12 text-muted">
                No quotes found with this status.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredQuotes.map(quote => (
                  <button
                    key={quote.id}
                    onClick={() => setSelectedQuoteId(quote.id)}
                    className={`w-full text-left p-4 rounded border transition-all ${
                      selectedQuoteId === quote.id
                        ? 'border-purple bg-purple/5'
                        : 'border-hair hover:border-purple/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{quote.businessName}</p>
                        <p className="text-sm text-muted">{quote.contactEmail}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        quote.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                        quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                        quote.status === 'issued' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quote.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-muted">
                      {new Date(quote.createdAt).toLocaleDateString()} • {quote.policyState}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quote Details */}
          <div className="col-span-1">
            {selectedQuote ? (
              <div className="border border-hair rounded p-6 sticky top-24">
                <h3 className="font-serif text-lg mb-4">Quote #{selectedQuote.id}</h3>

                <div className="space-y-4 text-sm mb-6">
                  <div>
                    <p className="text-muted mb-1">Business</p>
                    <p className="font-medium">{selectedQuote.businessName}</p>
                  </div>

                  <div>
                    <p className="text-muted mb-1">Contact</p>
                    <p className="font-medium">{selectedQuote.contactFirstName} {selectedQuote.contactLastName}</p>
                    <p className="text-xs text-muted">{selectedQuote.contactEmail}</p>
                    <p className="text-xs text-muted">{selectedQuote.contactPhone}</p>
                  </div>

                  <div>
                    <p className="text-muted mb-1">State</p>
                    <p className="font-medium">{selectedQuote.policyState}</p>
                  </div>

                  <div>
                    <p className="text-muted mb-1">Submitted</p>
                    <p className="font-medium">{new Date(selectedQuote.createdAt).toLocaleDateString()}</p>
                  </div>

                  {selectedQuote.dotNumber && (
                    <div>
                      <p className="text-muted mb-1">DOT #</p>
                      <p className="font-medium">{selectedQuote.dotNumber}</p>
                    </div>
                  )}

                  {selectedQuote.mcNumber && (
                    <div>
                      <p className="text-muted mb-1">MC #</p>
                      <p className="font-medium">{selectedQuote.mcNumber}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-muted mb-1">Coverages</p>
                    <div className="flex flex-wrap gap-1">
                      {(selectedQuote.selectedCoverages as any || []).map((cov: string) => (
                        <span key={cov} className="text-xs bg-sand px-2 py-1 rounded">
                          {cov}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-hair pt-4">
                  <p className="text-muted text-xs mb-3">Update Status</p>
                  <div className="space-y-2">
                    {['pending', 'under_review', 'approved', 'issued', 'rejected'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        disabled={updateStatusMutation.isPending}
                        className={`w-full px-3 py-2 text-xs rounded border transition-all ${
                          selectedQuote.status === status
                            ? 'bg-purple text-white border-purple'
                            : 'border-hair text-muted hover:border-purple'
                        } disabled:opacity-50`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={`/quote-confirmation/${selectedQuote.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center text-xs text-purple hover:underline"
                >
                  View Quote Page →
                </a>
              </div>
            ) : (
              <div className="border border-hair rounded p-6 text-center text-muted">
                <p className="text-sm">Select a quote to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
