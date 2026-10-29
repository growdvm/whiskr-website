"use client";

import { useMemo, useState } from "react";
import { Clock, DollarSign, CalendarDays, Sparkles } from "lucide-react";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";

const MINUTES_SAVED_PER_APPT = 8;

/**
 * ROI / Time-Saved Calculator
 * Inputs: appointments per day, minutes saved per appointment, working days/week, hourly value
 * Outputs: hours saved per week, hours saved per month, dollar value per month
 */
const ROICalculator = () => {
  const [appointments, setAppointments] = useState(20);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [hourlyValue, setHourlyValue] = useState(150);

  const { hoursPerWeek, hoursPerMonth, dollarsPerMonth } = useMemo(() => {
    const minutesPerWeek = appointments * MINUTES_SAVED_PER_APPT * daysPerWeek;
    const hpw = minutesPerWeek / 60;
    const hpm = hpw * 4.33;
    const dpm = hpm * hourlyValue;
    return {
      hoursPerWeek: Math.round(hpw * 10) / 10,
      hoursPerMonth: Math.round(hpm),
      dollarsPerMonth: Math.round(dpm / 10) * 10,
    };
  }, [appointments, daysPerWeek, hourlyValue]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <section
      id="roi-calculator"
      className="py-16 md:py-20"
      style={{ background: "linear-gradient(180deg,#fff,#f8fafc)" }}
      aria-labelledby="roi-heading"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-10">
          <p className="inline-block px-4 py-1.5 rounded-full bg-[#1ce881]/10 border border-[#1ce881]/30 text-xs font-semibold text-[#1ce881] uppercase tracking-wider mb-4">
            ROI Calculator
          </p>
          <h2 id="roi-heading" className="text-4xl md:text-5xl font-extrabold text-[#101235] mb-3">
            See how much time and money you'll save
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            whiskr.ai saves vets ~8 minutes per visit. See what that adds up to for your practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Inputs */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm">
            <h3 className="text-lg font-bold text-[#101235] mb-6">Your practice</h3>

            <div className="space-y-6">
              <SliderField
                label="Appointments per day"
                value={appointments}
                min={1}
                max={60}
                step={1}
                onChange={setAppointments}
                display={appointments.toString()}
              />
              <SliderField
                label="Working days per week"
                value={daysPerWeek}
                min={1}
                max={7}
                step={1}
                onChange={setDaysPerWeek}
                display={daysPerWeek.toString()}
              />
              <SliderField
                label="Your hourly value"
                value={hourlyValue}
                min={50}
                max={500}
                step={10}
                onChange={setHourlyValue}
                display={formatCurrency(hourlyValue)}
              />

              <div className="rounded-xl p-4 bg-[#1ce881]/10 border border-[#1ce881]/30">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1ce881]/20 text-[#101235] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-2xl font-extrabold text-[#101235] leading-none">8 min</span>
                      <span className="text-xs font-semibold text-[#1ce881] uppercase tracking-wider">Product fact</span>
                    </div>
                    <p className="text-sm font-medium text-[#101235] leading-snug">
                      Average time whiskr.ai saves per appointment on SOAP notes
                    </p>
                    <p className="text-xs text-[#475569] mt-1">
                      Based on usage across veterinary practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#101235,#1a1d3a)" }}
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "#1ce881" }}
              aria-hidden
            />
            <h3 className="text-lg font-bold mb-6 relative">Your savings with whiskr.ai</h3>

            <div className="space-y-5 relative">
              <ResultRow
                icon={<Clock className="w-5 h-5" />}
                label="Hours saved per week"
                value={`${hoursPerWeek} hrs`}
              />
              <ResultRow
                icon={<CalendarDays className="w-5 h-5" />}
                label="Hours saved per month"
                value={`${hoursPerMonth} hrs`}
              />
              <div className="pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <DollarSign className="w-4 h-4" />
                  Estimated value per month
                </div>
                <div className="text-5xl md:text-6xl font-extrabold text-[#1ce881] tracking-tight">
                  {formatCurrency(dollarsPerMonth)}
                </div>
                <p className="text-white/60 text-sm mt-2">
                  That's {formatCurrency(dollarsPerMonth * 12)} reclaimed every year.
                </p>
              </div>

              <a
                href={TRIAL_CTA_URL}
                className="mt-6 inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl bg-[#1ce881] text-[#101235] font-bold hover:bg-[#1ce881]/90 transition-colors no-underline"
              >
                {TRIAL_CTA_LABEL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

const SliderField = ({ label, value, min, max, step, display, onChange }: SliderFieldProps) => (
  <div>
    <div className="flex items-baseline justify-between mb-2">
      <label className="text-sm font-medium text-[#475569]">{label}</label>
      <span className="text-base font-bold text-[#101235]">{display}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full bg-[#e2e8f0] appearance-none cursor-pointer accent-[#1ce881]"
      aria-label={label}
    />
  </div>
);

const ResultRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-white/70 text-sm">
      {icon}
      {label}
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default ROICalculator;
