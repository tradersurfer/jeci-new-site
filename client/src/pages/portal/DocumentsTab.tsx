import { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, FileText, File, Image, Table, Trash2, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { portalFetch } from '@/components/portal/PortalAuthContext';
import PortalLayout from '@/components/portal/PortalLayout';

const CATEGORIES = ['W-2s & Income', '1099 Forms', 'Business Expenses', 'Crypto Records', 'Other Documents'];
const ACCEPTED_TYPES = '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx,.csv';

function getFileIcon(type: string) {
  if (type.includes('pdf')) return <FileText className="text-red-500" size={20} />;
  if (type.includes('image') || type.includes('jpg') || type.includes('png') || type.includes('jpeg')) return <Image className="text-blue-500" size={20} />;
  if (type.includes('sheet') || type.includes('xlsx') || type.includes('csv')) return <Table className="text-green-500" size={20} />;
  return <File className="text-slate-500" size={20} />;
}

function statusColor(status: string) {
  switch (status) {
    case 'draft': return 'bg-slate-100 text-slate-700';
    case 'submitted': return 'bg-amber-100 text-amber-700';
    case 'reviewed': return 'bg-green-100 text-green-700';
    default: return 'bg-slate-100 text-slate-600';
  }
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

interface DocItem {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: string;
  status: string;
  uploadDate: string;
}

export default function DocumentsTab() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [category, setCategory] = useState('Other Documents');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocs = useCallback(async () => {
    try {
      const res = await portalFetch('/api/portal/documents');
      if (res.ok) {
        const data = await res.json();
        setDocs(data);
      }
    } catch {}
  }, []);

  useEffect(() => { fetchDocs(); }, [fetchDocs]);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const interval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 10, 90));
    }, 200);

    try {
      const token = localStorage.getItem('portal_token');
      const res = await fetch('/api/portal/documents', {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });
      clearInterval(interval);
      setUploadProgress(100);
      if (res.ok) {
        await fetchDocs();
      }
    } catch {
      clearInterval(interval);
    }
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 500);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    uploadFile(files[0]);
  };

  const handleDelete = async (id: string) => {
    try {
      await portalFetch(`/api/portal/documents/${id}`, { method: 'DELETE' });
      await fetchDocs();
    } catch {}
  };

  const handleSubmitAll = async () => {
    try {
      await portalFetch('/api/portal/documents/submit-all', { method: 'POST', body: '{}' });
      await fetchDocs();
    } catch {}
  };

  const draftDocs = docs.filter((d) => d.status === 'draft');

  return (
    <PortalLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-[#0f172a]" data-testid="documents-title">Document Upload Center</h1>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 rounded-md border border-slate-300 px-3 text-sm bg-white"
            data-testid="select-category"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            dragOver ? 'border-amber-500 bg-amber-50' : 'border-slate-300 bg-white'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          data-testid="upload-zone"
        >
          <Upload className="mx-auto text-slate-400 mb-3" size={36} />
          <p className="text-slate-600 font-medium">Drag & drop files here</p>
          <p className="text-slate-400 text-sm mt-1">or tap to browse</p>
          <p className="text-slate-400 text-xs mt-2">PDF, JPG, PNG, DOC, DOCX, XLSX, CSV</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            data-testid="input-file"
          />
        </div>

        {uploading && (
          <div className="space-y-1">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} data-testid="upload-progress" />
            </div>
            <p className="text-xs text-slate-500 text-center">Uploading... {uploadProgress}%</p>
          </div>
        )}

        {draftDocs.length > 0 && (
          <Button onClick={handleSubmitAll} className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white" data-testid="button-submit-all">
            <Send size={16} className="mr-2" /> Submit All Documents ({draftDocs.length})
          </Button>
        )}

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-800">Your Documents</h2>
          {docs.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-8 text-center">
                <FileText className="mx-auto text-slate-300 mb-2" size={40} />
                <p className="text-slate-500">No documents uploaded yet</p>
              </CardContent>
            </Card>
          ) : (
            docs.map((doc) => (
              <Card key={doc.id} className="border-0 shadow-sm" data-testid={`doc-item-${doc.id}`}>
                <CardContent className="p-3 flex items-center gap-3">
                  {getFileIcon(doc.fileType)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{doc.fileName}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge className="text-[10px] bg-slate-100 text-slate-600 border-0">{doc.category}</Badge>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColor(doc.status)}`}>{doc.status}</span>
                      <span className="text-[10px] text-slate-400">{formatSize(doc.fileSize)}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{new Date(doc.uploadDate).toLocaleDateString()}</p>
                  </div>
                  {doc.status === 'draft' && (
                    <button onClick={() => handleDelete(doc.id)} className="p-2 text-red-400 hover:text-red-600 min-w-[44px] min-h-[44px] flex items-center justify-center" data-testid={`delete-doc-${doc.id}`}>
                      <Trash2 size={18} />
                    </button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
