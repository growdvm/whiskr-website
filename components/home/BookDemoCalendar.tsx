import Script from "next/script";
import { BOOK_DEMO_IFRAME_ID, BOOK_DEMO_IFRAME_SRC } from "@/lib/cta";

type BookDemoCalendarProps = {
  className?: string;
};

export function BookDemoCalendar({ className }: BookDemoCalendarProps) {
  return (
    <>
      <div
        className={
          className ??
          "rounded-[24px] border border-[#e2e8f0] bg-white shadow-[0_12px_40px_rgba(16,18,53,0.06)] overflow-hidden min-h-[720px]"
        }
      >
        <iframe
          src={BOOK_DEMO_IFRAME_SRC}
          id={BOOK_DEMO_IFRAME_ID}
          title="Book a whiskr.ai demo"
          className="w-full min-h-[720px] border-0"
          scrolling="no"
        />
      </div>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
