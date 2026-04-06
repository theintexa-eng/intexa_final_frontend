import React from 'react';
import PageHero from '../components/shared/PageHero';

export default function TermsOfService() {
  return (
    <>
      <PageHero title="Terms of Service" subtitle="Please read these terms carefully before using our services." />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 2026</p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. About INTEXA</h2>
              <p>INTEXA is an independent project advisory and brand-matching service. We are not a design studio, contractor, or construction firm. We provide consultancy and referral services to help clients identify and connect with suitable design brands for their projects.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Services We Offer</h2>
              <p>Our services include:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li><strong>Brand Matching Consultation</strong> — A structured session to understand your project and match you with vetted design brands.</li>
                <li><strong>BOQ Audit</strong> — A review of your bill of quantities to verify pricing and material fairness.</li>
                <li><strong>Project Management Support</strong> — Advisory and coordination support during project execution.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Payment Terms</h2>
              <p>Fees for our services are as listed on our Pricing page. Payments are due at the time of booking or as otherwise agreed. All prices include applicable GST. Fees are non-refundable once a session has been conducted or a service has been delivered.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Our Role & Limitations</h2>
              <p>INTEXA acts as an independent advisor. We:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Do not guarantee the outcome of any design project</li>
                <li>Are not responsible for the work quality or conduct of brands we refer</li>
                <li>Do not enter into contracts on your behalf with any design brand</li>
                <li>Do not accept referral fees, placement fees, or any payments from brands in our network</li>
              </ul>
              <p className="mt-3">Our recommendations are based on our best professional judgment and the information you provide. Final decisions remain yours.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Client Responsibilities</h2>
              <p>By using our services, you agree to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Provide accurate and complete information about your project</li>
                <li>Attend scheduled consultations at the agreed time</li>
                <li>Use our referrals and advice for personal or business project purposes only</li>
                <li>Not share confidential brand shortlist information with competitors</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Intellectual Property</h2>
              <p>All content on this website — including text, images, graphics, and branding — is the property of INTEXA and may not be reproduced or reused without written permission.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, INTEXA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or reliance on our advice. Our total liability in any matter is limited to the fees paid for the specific service in question.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact</h2>
              <p>For questions about these terms, contact us at:</p>
              <div className="mt-3 space-y-1">
                <p>Email: <a href="mailto:team@intexa.in" className="text-accent underline">team@intexa.in</a></p>
                <p>Phone: <a href="tel:+919217919111" className="text-accent underline">+91 9217 919 111</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}