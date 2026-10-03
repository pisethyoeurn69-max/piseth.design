import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  QrCode, 
  ArrowRight, 
  Copy, 
  Check, 
  Smartphone, 
  CreditCard, 
  Sparkles,
  Lock,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Course, PaymentMethod } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  studentName: string;
  studentEmail: string;
  onPaymentSuccess: (courseId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  course,
  studentName,
  studentEmail,
  onPaymentSuccess,
}) => {
  // Steps: 'checkout' -> 'payment' -> 'confirmation'
  const [step, setStep] = useState<'checkout' | 'payment' | 'confirmation'>('checkout');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('KHQR');
  const [timeLeft, setTimeLeft] = useState<number>(899); // 14 mins 59 secs
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const exchangeRate = 4100; // 1 USD = 4,100 KHR
  const amountKHR = course.price * exchangeRate;
  const transactionRef = `KHQR-${Date.now().toString().slice(-8)}`;

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setTimeLeft(899);
      setIsProcessing(false);
    }
  }, [isOpen, course]);

  // Countdown timer for QR code validity
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && step === 'payment' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, step, timeLeft]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(transactionRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-[#222936]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4DA3FF]">
              Cambodia Payment Gateway
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-khmer">ទូទាត់ប្រាក់សុវត្ថិភាព</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CHECKOUT OVERVIEW */}
        {step === 'checkout' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Course Summary Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-200/80 dark:border-[#222936] space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#4DA3FF] uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#4DA3FF] font-khmer">{course.titleKh}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums block">
                    ${course.price}
                  </span>
                  <span className="text-xs text-slate-400 font-mono tabular-nums block">
                    ≈ {amountKHR.toLocaleString()} ៛
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-[#222936] text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>Instructor: <strong>{course.instructor.name}</strong></span>
                <span>{course.duration} · 42 Lessons</span>
              </div>
            </div>

            {/* Student Info */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
                Enrolling Student:
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936]">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">{studentName}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{studentEmail}</span>
                </div>
                <span className="text-[11px] text-emerald-500 font-medium">Verified Account</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA3FF]" />
                <span>Lifetime access to 45 hours of video lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA3FF]" />
                <span>Teacher Piseth direct feedback on 3 portfolio assignments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA3FF]" />
                <span>Verified Certificate of Completion upon defense</span>
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <div className="pt-2">
              <button
                onClick={() => setStep('payment')}
                className="w-full py-3 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-sm transition-all shadow-md shadow-[#4DA3FF]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select Payment Method · បន្តទៅការទូទាត់</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD & CAMBODIA KHQR */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Payment Method Selector Tabs: KHQR, Bakong, ABA, ACLEDA */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block mb-2">
                Select Cambodian Payment Method:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'KHQR', name: 'KHQR', badge: 'Any Bank' },
                  { id: 'Bakong', name: 'Bakong', badge: 'NBC' },
                  { id: 'ABA', name: 'ABA', badge: 'PayWay' },
                  { id: 'ACLEDA', name: 'ACLEDA', badge: 'ToanChet' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMethod(item.id as PaymentMethod)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedMethod === item.id
                        ? 'border-[#4DA3FF] bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] font-bold shadow-sm'
                        : 'border-slate-200 dark:border-[#222936] text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.name}</span>
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{item.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Official KHQR Display Card */}
            <div className="p-5 rounded-2xl bg-[#D61B23]/5 dark:bg-[#D61B23]/10 border border-[#D61B23]/30 text-center space-y-4">
              
              {/* KHQR Header Banner */}
              <div className="flex items-center justify-between text-xs font-bold text-[#D61B23] border-b border-[#D61B23]/20 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#D61B23] text-white px-2 py-0.5 rounded font-black text-[11px] tracking-wider">
                    KHQR
                  </span>
                  <span>Bakong National Payment</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-[#D61B23]" />
                  <span>Expires in: <strong>{formatTimer(timeLeft)}</strong></span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="py-2 flex flex-col items-center justify-center">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md inline-block">
                  <svg viewBox="0 0 100 100" className="w-44 h-44 text-slate-900" fill="currentColor">
                    {/* KHQR QR matrix pattern placeholder */}
                    <rect x="5" y="5" width="25" height="25" fill="currentColor" rx="2" />
                    <rect x="9" y="9" width="17" height="17" fill="white" />
                    <rect x="13" y="13" width="9" height="9" fill="currentColor" />

                    <rect x="70" y="5" width="25" height="25" fill="currentColor" rx="2" />
                    <rect x="74" y="9" width="17" height="17" fill="white" />
                    <rect x="78" y="13" width="9" height="9" fill="currentColor" />

                    <rect x="5" y="70" width="25" height="25" fill="currentColor" rx="2" />
                    <rect x="9" y="74" width="17" height="17" fill="white" />
                    <rect x="13" y="78" width="9" height="9" fill="currentColor" />

                    {/* Data dots matrix */}
                    <rect x="35" y="10" width="8" height="8" />
                    <rect x="48" y="12" width="6" height="6" />
                    <rect x="58" y="8" width="8" height="8" />
                    <rect x="35" y="35" width="8" height="8" />
                    <rect x="47" y="47" width="8" height="8" fill="#D61B23" />
                    <rect x="58" y="35" width="8" height="8" />
                    <rect x="10" y="40" width="8" height="8" />
                    <rect x="22" y="48" width="8" height="8" />
                    <rect x="70" y="40" width="8" height="8" />
                    <rect x="82" y="48" width="8" height="8" />
                    <rect x="38" y="70" width="8" height="8" />
                    <rect x="50" y="78" width="8" height="8" />
                    <rect x="70" y="70" width="8" height="8" />
                    <rect x="82" y="78" width="8" height="8" />
                  </svg>
                </div>

                <div className="mt-3 text-center space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-sans">
                    PISETH.DESIGN / YOEURN PISETH
                  </span>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white font-mono text-base">
                      ${course.price}.00 USD
                    </span>
                    <span className="text-slate-400 font-mono">
                      ({amountKHR.toLocaleString()} KHR)
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Ref Pill */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                  <span>Ref:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{transactionRef}</strong>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="text-[#4DA3FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copiedRef ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedRef ? 'Copied' : 'Copy Ref'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 font-khmer">
                សូមបើកកម្មវិធីធនាគារ (ABA, Bakong, ACLEDA, Wing) ដើម្បី Scan ទូទាត់។
              </p>
            </div>

            {/* Simulation Action: Simulate Payment Complete */}
            <div className="space-y-2 pt-1">
              <button
                disabled={isProcessing}
                onClick={handleSimulatePayment}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Banking Webhook...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Payment Complete (សាកល្បងជោគជ័យ)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                ← Back to Course Summary
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT CONFIRMATION & COURSE ACCESS */}
        {step === 'confirmation' && (
          <div className="p-6 sm:p-8 text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-500/10 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold">
                Payment Confirmed · ការទូទាត់ជោគជ័យ
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome to {course.title}!
              </h2>
              <p className="text-xs text-slate-500 font-khmer">
                អ្នកបានចុះឈ្មោះដោយជោគជ័យ។ ឥឡូវនេះអ្នកអាចចាប់ផ្តើមរៀនបានភ្លាមៗ!
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-200/80 dark:border-[#222936] text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Transaction Ref:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Payment Method:</span>
                <span className="font-semibold text-[#4DA3FF]">{selectedMethod} Gateway</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Amount Paid:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  ${course.price}.00 USD ({amountKHR.toLocaleString()} ៛)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Student Account:</span>
                <span className="text-slate-700 dark:text-slate-300">{studentEmail}</span>
              </div>
            </div>

            {/* Final Action: Course Access */}
            <button
              onClick={() => {
                onPaymentSuccess(course.id);
                onClose();
              }}
              className="w-full py-3 px-6 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-xs transition-all shadow-md shadow-[#4DA3FF]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access Classroom Now · ចូលរៀនឥឡូវនេះ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
