import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-stone-400 text-[15px] max-w-xl">
            How we collect, use, and protect your personal information.
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
              KMOPL is committed to protecting your privacy and ensuring that your personal information is handled safely and responsibly.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>

          <hr className="border-stone-100" />

          {/* Section 1 */}
          <Section number="1" title="Information We Collect">
            <p className="text-stone-500 text-[14px] mb-4">We may collect the following types of information:</p>
            <SubHeading>a. Personal Information</SubHeading>
            <BulletList items={["Name", "Phone number", "Email address", "Address (if provided for service inquiry)"]} />
            <SubHeading>b. Non-Personal Information</SubHeading>
            <BulletList items={["Browser type", "IP address", "Device information", "Website usage data (via cookies or analytics tools)"]} />
          </Section>

          {/* Section 2 */}
          <Section number="2" title="How We Use Your Information">
            <p className="text-stone-500 text-[14px] mb-3">We use the collected information to:</p>
            <BulletList items={[
              "Respond to your inquiries and service requests",
              "Provide quotations and project details",
              "Improve our website and services",
              "Communicate updates, offers, or service-related information",
              "Ensure website security and prevent fraud",
            ]} />
            <p className="text-stone-500 text-[14px] mt-3">We only collect data necessary for specific purposes, in line with privacy principles.</p>
          </Section>

          {/* Section 3 */}
          <Section number="3" title="Cookies & Tracking Technologies">
            <p className="text-stone-500 text-[14px] mb-3">Our website may use cookies to:</p>
            <BulletList items={[
              "Enhance user experience",
              "Analyze website traffic",
              "Remember user preferences",
            ]} />
            <p className="text-stone-500 text-[14px] mt-3">You can choose to disable cookies through your browser settings.</p>
          </Section>

          {/* Section 4 */}
          <Section number="4" title="Sharing of Information">
            <p className="text-stone-500 text-[14px] mb-3">We do not sell, trade, or rent your personal information.</p>
            <p className="text-stone-500 text-[14px] mb-3">We may share information only:</p>
            <BulletList items={[
              "With trusted service providers (if required for service delivery)",
              "When required by law or legal authorities",
              "To protect our rights, safety, or property",
            ]} />
          </Section>

          {/* Section 5 */}
          <Section number="5" title="Data Security">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              We implement reasonable security measures to protect your data from unauthorized access, misuse, or disclosure.
            </p>
            <p className="text-stone-500 text-[14px] leading-relaxed mt-2">
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          {/* Section 6 */}
          <Section number="6" title="Data Retention">
            <p className="text-stone-500 text-[14px] mb-3">We retain your personal information only for as long as necessary to:</p>
            <BulletList items={[
              "Fulfill service requests",
              "Comply with legal obligations",
              "Resolve disputes",
            ]} />
          </Section>

          {/* Section 7 */}
          <Section number="7" title="Your Rights">
            <p className="text-stone-500 text-[14px] mb-3">You have the right to:</p>
            <BulletList items={[
              "Access your personal data",
              "Request correction or deletion",
              "Withdraw consent for data usage",
            ]} />
            <p className="text-stone-500 text-[14px] mt-3">To exercise these rights, please contact us using the details below.</p>
          </Section>

          {/* Section 8 */}
          <Section number="8" title="Third-Party Links">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.
            </p>
          </Section>

          {/* Section 9 */}
          <Section number="9" title="Children's Privacy">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              Our services are not directed toward individuals under the age of 18. We do not knowingly collect personal data from children.
            </p>
          </Section>

          {/* Section 10 */}
          <Section number="10" title="Changes to This Privacy Policy">
            <p className="text-stone-500 text-[14px] leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </Section>

          {/* Section 11 */}
          <Section number="11" title="Legal Compliance">
            <p className="text-stone-500 text-[14px] mb-3">This Privacy Policy is designed in accordance with:</p>
            <BulletList items={[
              "Information Technology Act, 2000",
              "Applicable Indian data protection rules",
              "Digital Personal Data Protection principles",
            ]} />
          </Section>

          {/* Section 12 — Contact */}
          <Section number="12" title="Contact Us">
            <p className="text-stone-500 text-[14px] mb-5">
              If you have any questions about this Privacy Policy, please contact us:
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
              By using our website, you consent to the terms of this Privacy Policy.
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

// ── Helpers ────────────────────────────────────────────────────────────────────

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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-bold text-stone-700 uppercase tracking-wider mb-2 mt-4">{children}</p>
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
