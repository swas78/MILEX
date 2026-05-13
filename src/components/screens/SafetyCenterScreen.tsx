"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ShieldAlert, PhoneCall, Share2, AlertTriangle,
  Eye, Moon, Activity, Navigation2, MapPin, Mic, MicOff,
  Battery, BatteryLow, Power, Flag, MessageSquare,
  ShieldCheck, CheckCircle, AlertCircle, Zap, X
} from 'lucide-react';

/* ── Reusable Toggle ─────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${on ? 'bg-brand-cyan' : 'bg-white/10'}`}>
      <motion.div layout transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-0.5 bottom-0.5 aspect-square rounded-full bg-white shadow-md"
        style={{ left: on ? 'calc(100% - 22px)' : 2 }} />
    </button>
  );
}

/* ── Feature Card ────────────────────────────────── */
function FeatureCard({ icon, title, desc, color, active, children }: {
  icon: React.ReactNode; title: string; desc: string;
  color: string; active?: boolean; children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border p-4 transition-all ${active
      ? `bg-${color}/8 border-${color}/30`
      : 'bg-white/[0.04] border-white/[0.07]'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${color}/15 text-${color}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

/* ── Main Screen ─────────────────────────────────── */
export function SafetyCenterScreen({ onBack }: { onBack: () => void }) {
  const [womenMode, setWomenMode] = useState(true);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [lowBatteryAlert, setLowBatteryAlert] = useState(true);
  const [shutdownAlert, setShutdownAlert] = useState(true);
  const [driverReportOpen, setDriverReportOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const [batteryPct] = useState(18); // simulate low battery
  const voiceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sosRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // SOS countdown
  useEffect(() => {
    if (sosActive) {
      setSosCountdown(5);
      sosRef.current = setInterval(() => {
        setSosCountdown(prev => {
          if (prev <= 1) { clearInterval(sosRef.current!); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (sosRef.current) clearInterval(sosRef.current);
      setSosCountdown(5);
    }
    return () => { if (sosRef.current) clearInterval(sosRef.current); };
  }, [sosActive]);

  // Voice timer
  useEffect(() => {
    if (voiceRecording) {
      voiceRef.current = setInterval(() => setVoiceTimer(t => t + 1), 1000);
    } else {
      if (voiceRef.current) clearInterval(voiceRef.current);
      setVoiceTimer(0);
    }
    return () => { if (voiceRef.current) clearInterval(voiceRef.current); };
  }, [voiceRecording]);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const reportTypes = ['Uncomfortable behaviour', 'Route deviation', 'Verbal abuse', 'Unsafe driving', 'Other'];

  return (
    <div className="absolute inset-0 bg-[#07070a] flex flex-col overflow-hidden">
      {/* Background glow */}
      <div className={`absolute top-0 inset-x-0 h-72 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none transition-colors duration-1000 ${womenMode ? 'bg-brand-purple/25' : 'bg-red-500/15'}`} />
      <div className="absolute inset-0 border-[3px] border-brand-purple/15 rounded-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 px-5 pt-14 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={19} className="text-white" />
        </button>
        <div className="flex items-center gap-2 bg-brand-purple/15 px-3 py-1.5 rounded-full border border-brand-purple/30">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
          <span className="text-xs font-bold text-brand-purple">Night Safety Active</span>
        </div>
        {/* Low battery warning */}
        {batteryPct < 20 && (
          <div className="flex items-center gap-1.5 bg-orange-500/15 px-2.5 py-1.5 rounded-full border border-orange-500/30">
            <BatteryLow size={12} className="text-orange-400" />
            <span className="text-[10px] font-bold text-orange-400">{batteryPct}%</span>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="relative z-10 px-5 pb-3">
        <h1 className="text-2xl font-display font-black text-white">Safety Center</h1>
        <p className="text-white/40 text-xs mt-0.5">24/7 monitoring · AI-powered protection</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8 flex flex-col gap-3 relative z-10">

        {/* ── Women Safety Mode ── */}
        <div className={`rounded-2xl border p-4 transition-all duration-500 ${womenMode ? 'bg-brand-purple/10 border-brand-purple/40' : 'bg-white/[0.04] border-white/[0.07]'}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-0.5">
                <ShieldCheck size={16} className={womenMode ? 'text-brand-purple' : 'text-white/40'} />
                <span className="text-sm font-bold text-white">Women Safety Mode</span>
                {womenMode && <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />}
              </div>
              <p className="text-xs text-white/40">Female-preferred drivers · Enhanced monitoring · Auto contact sharing</p>
            </div>
            <Toggle on={womenMode} onChange={() => setWomenMode(!womenMode)} />
          </div>
        </div>

        {/* ── Low Battery Alert ── */}
        {batteryPct < 20 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-orange-500/40 bg-orange-500/8 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                <BatteryLow size={18} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-orange-400 mb-0.5">⚠️ Low Battery — {batteryPct}%</p>
                <p className="text-xs text-white/40 mb-3 leading-relaxed">Battery critically low. Your ride details & live location will be auto-shared with emergency contacts.</p>
                <div className="flex items-center gap-2">
                  <Toggle on={lowBatteryAlert} onChange={() => setLowBatteryAlert(!lowBatteryAlert)} />
                  <span className="text-xs text-white/50">Auto-alert {lowBatteryAlert ? 'ON' : 'OFF'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SOS Button ── */}
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full ${sosActive ? 'animate-ping bg-red-500/40' : 'animate-pulse bg-red-500/20'}`} />
            <div className="absolute inset-3 rounded-full animate-ping bg-red-500/20" style={{ animationDelay: '0.5s' }} />
            <button
              onPointerDown={() => setSosActive(true)}
              onPointerUp={() => { if (sosCountdown > 0) setSosActive(false); }}
              className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_40px_rgba(239,68,68,0.5)] flex flex-col items-center justify-center gap-1 border-[5px] border-black active:scale-95 transition-transform"
            >
              {sosActive ? (
                <>
                  <span className="text-5xl font-black text-white leading-none">{sosCountdown}</span>
                  <span className="text-[10px] font-bold text-white/70 uppercase">Hold to SOS</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={28} className="text-white" />
                  <span className="text-2xl font-black text-white tracking-widest">SOS</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-white/30 mt-3 text-center">Hold for 5 sec to alert police + emergency contacts</p>
        </div>

        {/* ── Quick Actions ── */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <PhoneCall size={18} />, label: 'Call Police', sub: '112 / 100', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { icon: <Share2 size={18} />, label: 'Share Ride', sub: 'Live location link', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
            { icon: <MessageSquare size={18} />, label: 'Silent Alert', sub: 'Discreet SMS to contacts', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10 border-brand-cyan/20' },
            { icon: <Navigation2 size={18} />, label: 'Safe Pickup', sub: 'AI-suggested spot', color: 'text-brand-purple', bg: 'text-brand-purple/10 border-brand-purple/20' },
          ].map(a => (
            <button key={a.label} className={`rounded-2xl border p-3.5 flex flex-col items-center gap-2 hover:opacity-80 transition ${a.bg}`}>
              <div className={a.color}>{a.icon}</div>
              <div className="text-center">
                <div className="text-xs font-bold text-white">{a.label}</div>
                <div className="text-[9px] text-white/40 mt-0.5">{a.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* ── SOS Voice Recording ── */}
        <FeatureCard
          icon={voiceRecording ? <MicOff size={18} /> : <Mic size={18} />}
          title="Emergency Voice Evidence Capture"
          desc="Auto-starts encrypted audio recording when SOS is triggered. Stored securely as legal evidence."
          color="brand-red"
          active={voiceRecording}
        >
          <div className="flex items-center justify-between">
            {voiceRecording && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} className="w-0.5 bg-red-400 rounded-full"
                      animate={{ height: [6, 14, 6] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} />
                  ))}
                </div>
                <span className="text-xs font-bold text-red-400 tabular-nums">{fmtTime(voiceTimer)}</span>
                <span className="text-[10px] text-white/30 uppercase tracking-wider">REC</span>
              </div>
            )}
            <button
              onClick={() => setVoiceRecording(!voiceRecording)}
              className={`ml-auto px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${voiceRecording ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
            >
              {voiceRecording ? '⏹ Stop Recording' : '🎙 Start Recording'}
            </button>
          </div>
        </FeatureCard>

        {/* ── Auto Shutdown Alert ── */}
        <FeatureCard
          icon={<Power size={18} />}
          title="Auto Alert on Device Shutdown"
          desc="If your phone suddenly powers off during an active ride, your last GPS location is instantly shared with emergency contacts."
          color="brand-cyan"
          active={shutdownAlert}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs text-brand-cyan/60 flex items-center gap-1.5">
              <CheckCircle size={11} className="text-brand-cyan" />
              Last location saved • Contacts will be notified
            </div>
            <Toggle on={shutdownAlert} onChange={() => setShutdownAlert(!shutdownAlert)} />
          </div>
        </FeatureCard>

        {/* ── Suspicious Driver Report ── */}
        <FeatureCard
          icon={<Flag size={18} />}
          title="Suspicious Driver Detection"
          desc="Discreetly flag unsafe driver behaviour. Our AI monitors route deviation, abnormal stops, and speed."
          color="yellow-400"
          active={driverReportOpen}
        >
          <AnimatePresence>
            {driverReportOpen && !reportSent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden">
                <div className="flex flex-wrap gap-2 mb-3 pt-1">
                  {reportTypes.map(r => (
                    <button key={r} onClick={() => setReportType(r)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${reportType === r ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}>
                      {r}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { if (reportType) setReportSent(true); }}
                  disabled={!reportType}
                  className="w-full py-2.5 bg-yellow-400/15 border border-yellow-400/30 rounded-xl text-xs font-bold text-yellow-400 disabled:opacity-40 hover:bg-yellow-400/25 transition">
                  🚨 Send Discreet Alert to Safety Team
                </button>
              </motion.div>
            )}
            {reportSent && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-2 py-2">
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-xs text-green-400 font-medium">Report sent. Safety team alerted discreetly.</span>
              </motion.div>
            )}
          </AnimatePresence>
          {!reportSent && (
            <button onClick={() => setDriverReportOpen(!driverReportOpen)}
              className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all mt-1 ${driverReportOpen ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
              {driverReportOpen ? 'Cancel' : '⚠️ Report Unsafe Behaviour'}
            </button>
          )}
        </FeatureCard>

        {/* ── Active Protections ── */}
        <div>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2.5 px-1">Active Protections</p>
          <div className="flex flex-col gap-2">
            {[
              { icon: <Eye size={14} />, label: 'Route Deviation Alert', sub: 'Triggers if off-route by 300m', ok: true },
              { icon: <Activity size={14} />, label: 'AI Behaviour Monitoring', sub: 'Speed, stops & pattern analysis', ok: true },
              { icon: <Zap size={14} />, label: 'Instant Night Ride Priority', sub: 'Active after 10 PM', ok: true },
              { icon: <MapPin size={14} />, label: 'Safe Pickup Guidance', sub: 'AI-suggested well-lit zones', ok: true },
            ].map(p => (
              <div key={p.label} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-3">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">{p.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white">{p.label}</div>
                  <div className="text-[10px] text-white/30">{p.sub}</div>
                </div>
                <CheckCircle size={13} className="text-green-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* ── AI Logs ── */}
        <div>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2.5 px-1">AI Safety Log</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3 bg-white/[0.03] border border-green-500/20 rounded-xl px-3 py-3 border-l-2 border-l-green-500">
              <Activity size={13} className="text-green-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-medium text-white">Route progressing normally</div>
                <div className="text-[10px] text-white/30 mt-0.5">12:04 AM</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-3 border-l-2 border-l-red-500">
              <AlertCircle size={13} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-bold text-red-400">Abnormal Stop Detected</div>
                <div className="text-[10px] text-white/50 mt-0.5">Vehicle stationary 3 min. Driver pinged & responded.</div>
                <div className="text-[10px] text-red-400/40 mt-0.5">11:58 PM</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
