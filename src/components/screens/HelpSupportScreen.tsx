"use client";
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, MessageSquare, Flag, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from '@/components/ui/NeonButton';

const faqs = [
  { q: 'How do I cancel a ride?', a: 'Go to your active ride screen and tap "Cancel Ride". Free cancellation within 2 minutes of booking.' },
  { q: 'What is the refund policy?', a: 'Refunds for cancelled rides are processed to your MileX Wallet within 24 hours, or to source within 5–7 days.' },
  { q: 'How does the OTP system work?', a: 'A 4-digit OTP is shown on your screen. Share it with your driver only when you board to start the ride.' },
  { q: 'Can I schedule a ride in advance?', a: 'Yes! Use the Schedule Ride feature from the home screen to book up to 7 days in advance.' },
  { q: 'How do emergency SOS alerts work?', a: 'Tap the SOS button during a ride to alert our safety team, your emergency contacts, and nearby authorities.' },
];

const issueTypes = ['Payment Issue', 'Driver Behaviour', 'Route Problem', 'App Crash', 'Other'];

export function HelpSupportScreen({ onBack }: { onBack: () => void }) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [issueType, setIssueType] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="absolute inset-0 bg-brand-dark flex flex-col overflow-hidden">
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-display font-bold text-white">Help & Support</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 flex flex-col gap-5 relative z-10">
        {/* Live Chat CTA */}
        <div className="bg-gradient-to-r from-brand-blue/20 to-brand-cyan/10 border border-brand-cyan/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center">
            <MessageSquare size={22} className="text-brand-cyan" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-white">Live Chat</div>
            <div className="text-xs text-white/50">Avg response: under 2 min</div>
          </div>
          <button className="px-4 py-2 bg-brand-cyan text-black text-xs font-bold rounded-full hover:bg-brand-cyan/90 transition">
            Chat Now
          </button>
        </div>

        {/* FAQ */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
          </div>
          <div className="divide-y divide-white/5">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-white/5 transition"
                >
                  <span className="text-sm font-medium text-white pr-3">{faq.q}</span>
                  {expandedFaq === i ? <ChevronUp size={14} className="text-white/30 shrink-0" /> : <ChevronDown size={14} className="text-white/30 shrink-0" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Report Issue */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flag size={14} className="text-red-400" />
            <h3 className="text-sm font-bold text-white">Report an Issue</h3>
          </div>
          {submitted ? (
            <div className="flex flex-col items-center py-4 text-center">
              <RefreshCw size={24} className="text-green-400 mb-2" />
              <div className="text-sm font-bold text-white">Issue Reported</div>
              <div className="text-xs text-white/50 mt-1">We'll get back to you within 24 hours.</div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-3">
                {issueTypes.map((type) => (
                  <button key={type} onClick={() => setIssueType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${issueType === type ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                    {type}
                  </button>
                ))}
              </div>
              <textarea value={issueDesc} onChange={(e) => setIssueDesc(e.target.value)}
                placeholder="Describe your issue..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-cyan/50 resize-none mb-3"
                rows={3} />
              <NeonButton variant="secondary" fullWidth onClick={() => setSubmitted(true)}>
                Submit Report
              </NeonButton>
            </>
          )}
        </div>

        {/* Refund Request */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-white mb-2">Refund Request</h3>
          <p className="text-xs text-white/50 mb-3">If you were overcharged or had a cancelled ride, request a refund here.</p>
          <button className="w-full py-2.5 border border-dashed border-white/20 rounded-xl text-xs text-white/40 hover:border-brand-cyan/30 hover:text-brand-cyan transition font-medium">
            + Submit Refund Request
          </button>
        </div>
      </div>
    </div>
  );
}
