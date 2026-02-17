import { useState, useEffect } from 'react';
import { Download, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/portal/AdminLayout';
import { portalFetch } from '@/components/portal/PortalAuthContext';

interface Document {
  id: string;
  fileName: string;
  clientName?: string;
  userId?: string;
  category?: string;
  status: string;
  uploadDate?: string;
  createdAt?: string;
  adminNotes?: string;
}

const statusTabs = ['All', 'Submitted', 'Reviewed', 'Draft'];

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'reviewed': return 'bg-green-100 text-green-700';
    case 'submitted': return 'bg-blue-100 text-blue-700';
    case 'needs revision': return 'bg-red-100 text-red-700';
    case 'draft': return 'bg-slate-100 text-slate-600';
    default: return 'bg-slate-100 text-slate-600';
  }
}

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [actionDocId, setActionDocId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [noteDocId, setNoteDocId] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      const res = await portalFetch('/api/portal/admin/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchDocuments(); }, []);

  const updateStatus = async (docId: string, newStatus: string) => {
    try {
      await portalFetch(`/api/portal/admin/documents/${docId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchDocuments();
    } catch {}
    setActionDocId(null);
  };

  const addNote = async (docId: string) => {
    if (!noteInput.trim()) return;
    try {
      await portalFetch(`/api/portal/admin/documents/${docId}`, {
        method: 'PATCH',
        body: JSON.stringify({ adminNotes: noteInput }),
      });
      fetchDocuments();
    } catch {}
    setNoteDocId(null);
    setNoteInput('');
  };

  const handleDownload = (doc: Document) => {
    window.open(`/api/portal/documents/${doc.id}/download`, '_blank');
  };

  const filtered = activeTab === 'All'
    ? documents
    : documents.filter((d) => d.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <AdminLayout title="Documents">
      <div className="flex gap-2 mb-4 flex-wrap" data-testid="status-tabs">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-testid={`tab-${tab.toLowerCase()}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-[#0f172a] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="documents-table">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">File Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Client</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Upload Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">No documents found</td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-slate-50" data-testid={`doc-row-${doc.id}`}>
                    <td className="px-4 py-3 font-medium text-slate-800 max-w-[200px] truncate">{doc.fileName}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{doc.clientName || '—'}</td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{doc.category || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(doc.status)}`} data-testid={`status-badge-${doc.id}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                      {(doc.uploadDate || doc.createdAt) ? new Date(doc.uploadDate || doc.createdAt!).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 relative">
                        <button
                          onClick={() => handleDownload(doc)}
                          data-testid={`download-doc-${doc.id}`}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => setActionDocId(actionDocId === doc.id ? null : doc.id)}
                          data-testid={`actions-doc-${doc.id}`}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {actionDocId === doc.id && (
                          <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 py-1 min-w-[160px]" data-testid={`action-menu-${doc.id}`}>
                            <button
                              onClick={() => updateStatus(doc.id, 'reviewed')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                              data-testid={`mark-reviewed-${doc.id}`}
                            >
                              Mark Reviewed
                            </button>
                            <button
                              onClick={() => updateStatus(doc.id, 'needs revision')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                              data-testid={`mark-revision-${doc.id}`}
                            >
                              Needs Revision
                            </button>
                            <button
                              onClick={() => { setNoteDocId(doc.id); setActionDocId(null); }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                              data-testid={`add-note-${doc.id}`}
                            >
                              Add Note
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {noteDocId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setNoteDocId(null)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()} data-testid="note-modal">
            <h3 className="text-lg font-semibold mb-3">Add Admin Note</h3>
            <Input
              placeholder="Enter note..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              data-testid="note-input"
            />
            <div className="flex gap-2 mt-4 justify-end">
              <Button variant="outline" onClick={() => setNoteDocId(null)} data-testid="cancel-note">Cancel</Button>
              <Button onClick={() => addNote(noteDocId)} data-testid="save-note" className="bg-amber-600 text-white hover:bg-amber-700">Save</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
