import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero */}
      <section className="relative bg-stone-900 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(circle at 70% 50%, #f59e0b 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-amber-500/20 text-amber-400 border border-amber-500/20">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-stone-400 text-[15px] max-w-xl">
            Please read these terms carefully before using our website or services.
          </p>
          <p className="mt-3 text-stone-500 text-[13px]">Effective Date: June 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-8 sm:p-12 space-y-10">

          {/* Intro */}
          <div>
            <p className="text-[15px] text-stone-600 leading-relaxed">
              Welcome to <strong className="text-stone-900">KMOPL</strong>. By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our website.
            </p>
          </div>

          <hr className="border-stone-100" />

          <Section number="1" title="Introduction">
            <p className="text-stone-500 text-[14px] leading-relaxed mb-3">
              These Terms &amp; Conditions govern your use of our website and the services offered by <strong className="text-stone-700">KMOPL</strong>, including Metal Coating, Wood Coating, Glass Coating, and related services.
            </p>
            <p className="text-stone-500 text-[14px] leading-relaxed">
              By accessing this website, you agree to accept all terms stated here. If you do not agree, please do not use our website or services.
            </p>
          </Section>

          <Section number="2" title="Services">
            <p className="text-stone-500 text-[14px] leading-relaxed mb-3">
              <strong className="text-stone-700">KMOPL</strong> provides professional coating services for residential, commercial, and industrial spaces.
            </p>
            <p className="text-stone-500 text-[14px] mb-3">We reserve the right to:</p>
            <BulletList items={[
              "Modify or discontinue services without prior notice",
              "Refuse service to anyone at our discretion",
              "Update pricing and service details at any time",
            ]} />
          </Section>

          <Section number="3" title="User Responsibilities">
            <p className="text-stone-500 text-[14px] mb-3">By using our website, you agree:</p>
            <BulletList items={[
              "To provide accurate and complete information when contacting us",
              "Not to misuse the website for unlawful or harmful activities",
              "Not to attempt unauthorized access to our systems",
            ]} />
          </Section>

          <Section number="4" title="Quotes & Payments">
            <BulletList items={[
              "All quotations provided are subject to site inspection and final confirmation",
              "Prices may vary based on surface condition, material requirements, and scope of work",
              "Payment terms will be agreed upon before project initiation",
              "Delayed payments may result in project delays or service suspension",
            ]} />
          </Section>

          <Section number="5" title="Project Execution">
            <BulletList items={[
              "Timelines provided are estimates and may vary due to weather, site conditions, or unforeseen factors",
              "Clients must ensure site readiness before work begins",
              "Any additional work requested during execution may incur extra charges",
            ]} />
          </Section>

          <Section number="6" title="Intellectual Property">
            <p className="text-stone-500 text-[14px] mb-3">All content on this website, including:</p>
            <BulletList items={["Images", "Designs", "Text", "Graphics"]} />
            <p className="text-stone-500 text-[14px] mt-3">
              is the property of <strong className="text-stone-700">KMOPL</strong> and is protected under applicable copyright laws. Unauthorized use or reproduction is strictly prohibited.
            </p>
          </Section>

          <Section number="7" title="Limitation of Liability">
            <p className="text-stone-500 text-[14px] mb-3">
              <strong className="text-stone-700">KMOPL</strong> shall not be held liable for:
            </p>
            <BulletList items={[
              "Indirect or incidental damages",
              "Delays caused by external factors",
              "Minor variations in color or finish due to material differences",
            ]} />
            <p className="text-stone-500 text-[14px] mt-3">
              Our total liability is limited to the amount paid for the specific service.
            </p>
          </Section>

          <Section number="8" title="Warranty & Quality">
            <BulletList items={[
              "We strive to deliver high-quality workmanship",
              "Any warranty (if applicable) will be clearly communicated at the time of agreement",
              "Warranty does not cover damage caused by misuse, natural wear, or external factors",
            ]} />
          </Section>

          <Section number="9" title="Third-Party Links">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for their content, policies, or practices.
            </p>
          </Section>

          <Section number="10" title="Cancellation & Refund Policy">
            <BulletList items={[
              "Orders may be cancelled before work begins",
              "Once work has started, cancellation charges may apply",
              "Refunds (if applicable) will be processed based on work completed",
            ]} />
          </Section>

          <Section number="11" title="Privacy">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              Your use of our website is also governed by our{" "}
              <Link href="/privacy-policy" className="text-amber-600 hover:text-amber-700 font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>. We are committed to protecting your personal information.
            </p>
          </Section>

          <Section number="12" title="Changes to Terms">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              We reserve the right to update or modify these Terms at any time without prior notice. Continued use of the website means you accept the updated Terms.
            </p>
          </Section>

          <Section number="13" title="Governing Law">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              These Terms &amp; Conditions shall be governed by and interpreted in accordance with the laws of India.
            </p>
          </Section>

          <Section number="14" title="Contact Information">
            <p className="text-stone-500 text-[14px] mb-5">
              For any questions regarding these Terms &amp; Conditions, please contact us:
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="font-bold text-stone-900 text-[15px]">KMOPL</p>
              {[
                { icon: "✉️", label: "Email", value: "sales@krishna-chemicals.com", href: "mailto:sales@krishna-chemicals.com" },
                { icon: "📞", label: "Phone", value: "+91 85888 30308", href: "tel:+918588830308" },
                { icon: "📍", label: "Address", value: "B-169 & B-170, Industrial Area Phase-II, Noida, G.B. Nagar, U.P.-201305", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{item.label}: </span>
                    {item.href ? (
                      <a href={item.href} className="text-[14px] text-amber-600 hover:text-amber-700 font-medium transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[14px] text-stone-600">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <hr className="border-stone-100" />

          {/* Consent notice */}
          <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5">
            <p className="text-[14px] text-amber-800 font-medium text-center leading-relaxed">
              By using our website, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.
            </p>
          </div>

          {/* Back link */}
          <div className="text-center pt-2">
            <Link href="/"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-stone-500 hover:text-amber-600 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-xl bg-amber-500 text-white text-[12px] font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h2 className="text-[18px] font-bold text-stone-900"
          style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
          {title}
        </h2>
      </div>
      <div className="pl-11">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] text-stone-500">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
          {item}
        </li>
      ))}
    </ul>
  );
}
