import { useEffect, useState } from "react"

const LAST_UPDATED = "June 2, 2026"
const EFFECTIVE_DATE = "June 2, 2026"

export default function Privacy() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content')
    const prevCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')

    document.title = "Privacy Policy — DevCon1 Solutions"
    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) descTag.setAttribute('content', "Privacy Policy for DevCon1 Solutions LLC — how we collect, use, store, and protect your information across our website, apps, and services.")
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', "https://devcon1solutions.com/privacy")

    return () => {
      document.title = prevTitle
      if (descTag && prevDesc) descTag.setAttribute('content', prevDesc)
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical)
    }
  }, [])

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 fade-in-up font-medium">
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 fade-in-up fade-in-up-delay-1 gradient-text">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm fade-in-up fade-in-up-delay-2">
            Effective Date: {EFFECTIVE_DATE} &middot; Last Updated: {LAST_UPDATED}
          </p>
        </div>

        <article
          className="glass-card p-6 md:p-10 text-white/75 text-base leading-relaxed space-y-8"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <section>
            <p>
              This Privacy Policy ("Policy") describes how <strong>DevCon1 Solutions LLC</strong>
              {" "}("DevCon1," "we," "us," or "our") collects, uses, discloses, and safeguards
              information when you visit{" "}
              <a href="https://devcon1solutions.com" className="text-indigo-400 hover:text-indigo-300 underline">devcon1solutions.com</a>{" "}
              (the "Site"), interact with our applications, demos, or chat features
              (collectively, the "Services"), or otherwise communicate with us. By accessing or
              using the Services, you agree to the terms of this Policy. If you do not agree,
              please discontinue use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information in the following ways:</p>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">a. Information You Provide</h3>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Contact details you submit through forms (e.g., name, email, phone number).</li>
              <li>The contents of messages, inquiries, or chat conversations you send to us.</li>
              <li>Project, business, or technical details you share for the purpose of receiving services or a quote.</li>
              <li>Any other information you voluntarily provide.</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">b. Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Device and browser data (e.g., browser type, operating system, screen size, language).</li>
              <li>Usage data (e.g., pages viewed, time on page, navigation paths, referring URLs, interactions with demo apps).</li>
              <li>Approximate location derived from your IP address.</li>
              <li>Identifiers such as IP address, session identifiers, and anonymized analytics IDs.</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">c. Local Storage</h3>
            <p className="text-white/70">
              We may store small amounts of information in your browser's local storage to
              preserve your session preferences (for example, retaining a temporary user
              profile for our interactive demos). This data remains on your device and can
              be cleared at any time through your browser settings.
            </p>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">d. Cookies and Similar Technologies</h3>
            <p className="text-white/70">
              We and our service providers may use cookies, pixels, and similar technologies
              to operate the Services, remember preferences, measure performance, and gather
              analytics. You can disable cookies in your browser settings, though some parts
              of the Services may not function as intended.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">2. How We Use Information</h2>
            <p className="mb-3">We use the information we collect for legitimate business purposes, including to:</p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Provide, operate, maintain, and improve the Site and Services.</li>
              <li>Respond to inquiries, deliver requested information, and provide customer support.</li>
              <li>Develop, evaluate, and deliver software, IT consulting, and related services to clients.</li>
              <li>Personalize content and improve the user experience.</li>
              <li>Analyze usage and trends to enhance functionality, security, and performance.</li>
              <li>Communicate updates, technical notices, and service-related messages.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
              <li>Detect, prevent, and address fraud, abuse, or security issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">3. Legal Bases for Processing</h2>
            <p className="text-white/70">
              Where applicable law requires a legal basis for processing (such as the GDPR),
              we rely on one or more of the following: your consent; the necessity of
              processing to perform a contract with you or take steps at your request; our
              legitimate interests in operating and improving our business; and compliance
              with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">4. How We Share Information</h2>
            <p className="mb-3">
              We do not sell your personal information. We may share information in the
              following limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li><strong>Service Providers:</strong> trusted vendors who perform services on our behalf, including hosting, analytics (e.g., Google Analytics/Firebase), email delivery, and cloud infrastructure.</li>
              <li><strong>Professional Advisors:</strong> attorneys, accountants, and insurers, where reasonably necessary.</li>
              <li><strong>Legal &amp; Safety:</strong> when required by law, subpoena, or government request, or to protect the rights, property, or safety of DevCon1, our users, or others.</li>
              <li><strong>Business Transfers:</strong> in connection with a merger, acquisition, financing, reorganization, or sale of assets, subject to standard confidentiality protections.</li>
              <li><strong>With Your Consent:</strong> in other cases where you have authorized us to share your information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="text-white/70">
              The Services may rely on or link to third-party platforms (such as Google
              Firebase, analytics providers, hosting providers, AI/LLM providers that
              power our chat assistant, and external repositories or profiles). Their
              collection and use of information is governed by their own privacy
              policies, which we encourage you to review. Where reasonably available,
              we configure these providers so that conversation content and other
              customer data are not used to train their public models. DevCon1 is not
              responsible for the practices of third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p className="text-white/70">
              We retain personal information for as long as reasonably necessary to fulfill
              the purposes outlined in this Policy, to comply with legal, accounting, or
              reporting obligations, to resolve disputes, and to enforce our agreements.
              Retention periods vary based on the nature and sensitivity of the data.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">7. Security</h2>
            <p className="text-white/70">
              We implement reasonable administrative, technical, and physical safeguards
              designed to protect information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission over the
              Internet or method of electronic storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">8. Your Rights and Choices</h2>
            <p className="mb-3 text-white/70">
              Depending on your jurisdiction, you may have rights regarding your personal
              information, including the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Access, correct, or request a copy of your personal information.</li>
              <li>Request deletion or restriction of processing.</li>
              <li>Object to processing or withdraw consent where applicable.</li>
              <li>Opt out of certain marketing communications.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p className="mt-3 text-white/70">
              To exercise these rights, contact us using the information in Section 14. We
              may need to verify your identity before responding.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">9. U.S. State Privacy Rights</h2>
            <p className="text-white/70">
              Residents of certain U.S. states (including but not limited to
              California, Colorado, Connecticut, Florida, Oregon, Texas, Utah, and
              Virginia) may have additional rights under applicable state privacy
              laws, including the right to know, access, correct, delete, and opt
              out of certain processing of personal information.{" "}
              <strong>DevCon1 does not sell personal information</strong> and does not
              share personal information for cross-context behavioral advertising as
              those terms are defined under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">10. Children's Privacy</h2>
            <p className="text-white/70">
              The Services are not directed to children under the age of 13 (or the
              equivalent minimum age in your jurisdiction), and we do not knowingly collect
              personal information from them. If you believe a child has provided us with
              personal information, please contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">11. International Users</h2>
            <p className="text-white/70">
              DevCon1 Solutions LLC is based in the United States. If you access the
              Services from outside the U.S., your information may be transferred to,
              stored, and processed in the U.S. or other jurisdictions whose data protection
              laws may differ from those in your country. By using the Services, you consent
              to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">12. Do Not Track</h2>
            <p className="text-white/70">
              Some browsers transmit "Do Not Track" signals. Because no consistent industry
              standard for responding to these signals has been established, the Services do
              not currently respond to them.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">13. Changes to This Policy</h2>
            <p className="text-white/70">
              We may update this Policy from time to time. When we do, we will revise the
              "Last Updated" date at the top of this page. Material changes will be
              communicated through the Site or by other reasonable means. Your continued use
              of the Services after changes become effective constitutes acceptance of the
              updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">14. Contact Us</h2>
            <p className="text-white/70 mb-2">
              For questions, concerns, or requests regarding this Policy or our privacy
              practices, please contact:
            </p>
            <p className="text-white/80">
              <strong>DevCon1 Solutions LLC</strong><br />
              7860 W Commercial Blvd, #707<br />
              Lauderhill, FL 33351<br />
              United States<br />
              Email:{" "}
              <a href="mailto:daniel@devcon1solutions.com" className="text-indigo-400 hover:text-indigo-300 underline">
                daniel@devcon1solutions.com
              </a><br />
              Phone:{" "}
              <a href="tel:+19545806829" className="text-indigo-400 hover:text-indigo-300 underline">
                (954) 580-6829
              </a><br />
              Contact Form:{" "}
              <a href="/contact" className="text-indigo-400 hover:text-indigo-300 underline">
                devcon1solutions.com/contact
              </a>
            </p>
          </section>

          <section>
            <p className="text-white/50 text-sm italic">
              This Privacy Policy is provided for general informational purposes and does
              not constitute legal advice. For tailored guidance regarding your rights or
              obligations, please consult a qualified attorney.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
