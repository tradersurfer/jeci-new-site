import { useState, useEffect, useRef, useCallback } from 'react';
import { PenTool, Download, Check, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { portalFetch } from '@/components/portal/PortalAuthContext';
import PortalLayout from '@/components/portal/PortalLayout';

interface TaxReturn {
  id: string;
  fileName: string;
  taxYear: string;
  status: string;
  filePath: string;
  uploadDate: string;
}

interface Signature {
  id: string;
  returnId: string;
  taxpayerName: string;
  signedAt: string;
}

function statusColor(status: string) {
  switch (status) {
    case 'pending_signature': return 'bg-amber-100 text-amber-700';
    case 'signed': return 'bg-green-100 text-green-700';
    case 'filed': return 'bg-blue-100 text-blue-700';
    default: return 'bg-slate-100 text-slate-600';
  }
}

export default function SignTab() {
  const [returns, setReturns] = useState<TaxReturn[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [signingReturn, setSigningReturn] = useState<TaxReturn | null>(null);
  const [typedName, setTypedName] = useState('');
  const [checks, setChecks] = useState({ reviewed: false, accurate: false, binding: false });
  const [submitting, setSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const [retRes, sigRes] = await Promise.all([
        portalFetch('/api/portal/returns'),
        portalFetch('/api/portal/signatures'),
      ]);
      if (retRes.ok) setReturns(await retRes.json());
      if (sigRes.ok) setSignatures(await sigRes.json());
    } catch {}
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
  }, []);

  useEffect(() => {
    if (signingReturn) {
      setTimeout(initCanvas, 100);
    }
  }, [signingReturn, initCanvas]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => { isDrawing.current = false; };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = async () => {
    if (!signingReturn || !canvasRef.current) return;
    setSubmitting(true);
    try {
      const signatureData = canvasRef.current.toDataURL();
      await portalFetch('/api/portal/signatures', {
        method: 'POST',
        body: JSON.stringify({
          returnId: signingReturn.id,
          signatureData,
          taxpayerName: typedName,
        }),
      });
      setSigningReturn(null);
      setTypedName('');
      setChecks({ reviewed: false, accurate: false, binding: false });
      await fetchData();
    } catch {}
    setSubmitting(false);
  };

  const allChecked = checks.reviewed && checks.accurate && checks.binding && typedName.trim().length > 0;

  return (
    <PortalLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-[#0f172a]" data-testid="sign-title">Sign Tax Returns</h1>

        {signingReturn ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Signing: {signingReturn.fileName}</h2>
              <button onClick={() => setSigningReturn(null)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" data-testid="close-signing">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-4">
                <p className="text-sm font-medium text-slate-700">Draw your signature below:</p>
                <div className="border-2 border-slate-200 rounded-lg overflow-hidden bg-white">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-[150px] touch-none"
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={stopDraw}
                    onMouseLeave={stopDraw}
                    onTouchStart={startDraw}
                    onTouchMove={draw}
                    onTouchEnd={stopDraw}
                    data-testid="signature-canvas"
                  />
                </div>
                <Button variant="outline" onClick={clearCanvas} className="text-sm" data-testid="button-clear-signature">
                  Clear Signature
                </Button>

                <div>
                  <label className="text-sm font-medium text-slate-700">Type your full name</label>
                  <Input
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Full legal name"
                    className="mt-1 h-11"
                    data-testid="input-typed-name"
                  />
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'reviewed', label: 'I have reviewed my return' },
                    { key: 'accurate', label: 'The information is accurate and complete' },
                    { key: 'binding', label: 'I understand this is a legally binding signature' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-start gap-3 cursor-pointer min-h-[44px]">
                      <input
                        type="checkbox"
                        checked={checks[item.key as keyof typeof checks]}
                        onChange={(e) => setChecks({ ...checks, [item.key]: e.target.checked })}
                        className="mt-0.5 w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                        data-testid={`check-${item.key}`}
                      />
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <Button
                  onClick={handleSign}
                  disabled={!allChecked || submitting}
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white"
                  data-testid="button-sign-submit"
                >
                  <PenTool size={16} className="mr-2" />
                  {submitting ? 'Submitting...' : 'Sign & Submit'}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {returns.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-12 text-center">
                  <FileText className="mx-auto text-slate-300 mb-3" size={48} />
                  <p className="text-slate-500 font-medium">No tax returns ready yet</p>
                  <p className="text-slate-400 text-sm mt-1">Your tax professional will upload returns when they're ready for review.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {returns.map((ret) => (
                  <Card key={ret.id} className="border-0 shadow-sm" data-testid={`return-item-${ret.id}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="text-slate-400 shrink-0" size={24} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{ret.fileName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">Tax Year {ret.taxYear}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColor(ret.status)}`}>
                              {ret.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <a
                            href={ret.filePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-500 hover:text-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            data-testid={`download-return-${ret.id}`}
                          >
                            <Download size={18} />
                          </a>
                          {ret.status === 'pending_signature' && (
                            <Button
                              onClick={() => setSigningReturn(ret)}
                              className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-9"
                              data-testid={`sign-return-${ret.id}`}
                            >
                              <PenTool size={14} className="mr-1" /> Review & Sign
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {signatures.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Signature History</h2>
                <div className="space-y-2">
                  {signatures.map((sig) => (
                    <Card key={sig.id} className="border-0 shadow-sm" data-testid={`signature-item-${sig.id}`}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <Check className="text-green-500 shrink-0" size={20} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{sig.taxpayerName}</p>
                          <p className="text-xs text-slate-500">Signed on {new Date(sig.signedAt).toLocaleDateString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PortalLayout>
  );
}
