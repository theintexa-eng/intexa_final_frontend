import React from 'react';
import PageHero from '../components/shared/PageHero';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your information." />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 2026</p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Who We Are</h2>
              <p>INTEXA is an independent project advisory service based in Delhi NCR, India. We help homeowners and businesses plan interior, architectural, and design projects and connect them with verified design brands. Our website is <a href="https://intexa.in" className="text-accent underline">intexa.in</a>.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p>When you use our website or submit an inquiry, we may collect:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Your name, email address, and phone number</li>
                <li>Your city and property type</li>
                <li>Project budget and timeline details</li>
                <li>Any messages or notes you provide in forms</li>
                <li>Basic usage data (pages visited, browser type) via analytics tools</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Respond to your inquiry and schedule consultations</li>
                <li>Match you with suitable design brands</li>
                <li>Send follow-up communications related to your project</li>
                <li>Improve our services and website experience</li>
              </ul>
              <p className="mt-3">We do <strong>not</strong> sell your personal information to third parties.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Sharing</h2>
              <p>We may share your information only in the following cases:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>With vetted design brands in our network — only after your explicit consent during a consultation</li>
                <li>With service providers who help us operate our platform (e.g. email tools, analytics)</li>
                <li>If required by law or a valid legal process</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Retention</h2>
              <p>We retain your data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. You may request deletion of your data at any time by contacting us.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:team@intexa.in" className="text-accent underline">team@intexa.in</a>.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies</h2>
              <p>Our website may use cookies to improve your browsing experience and analyse usage patterns. You can disable cookies in your browser settings, though this may affect some features of the website.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to This Policy</h2>
              <p>We may update this policy from time to time. We will notify you of significant changes by updating the date at the top of this page.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please reach out:</p>
              <div className="mt-3 space-y-1">
                <p>Email: <a href="mailto:team@intexa.in" className="text-accent underline">team@intexa.in</a></p>
                <p>Phone: <a href="tel:+919217919111" className="text-accent underline">+91 9217 919 111</a></p>
                <p>Location: Delhi NCR, India</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}