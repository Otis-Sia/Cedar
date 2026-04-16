import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cedar | Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-4">
        Legal
      </span>
      <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8">
        Terms & Conditions
      </h1>
      <div className="text-cedar-slate space-y-6 leading-relaxed">
        <p className="font-medium text-sm">
          Effective Date: April 9, 2026
          <br />
          Last Updated: April 9, 2026
        </p>
        <p>
          Welcome to Cedar (“we,” “us,” “our”). These Terms and Conditions
          (“Terms”) govern your access to and use of the Cedar website, platform,
          and services, including portfolio design, hosting, customization, and
          related digital services (collectively, the “Services”).
        </p>
        <p>
          By accessing or using Cedar, you agree to be bound by these Terms. If
          you do not agree, please do not use our Services.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          1. About Cedar
        </h2>
        <p>
          Cedar is a digital platform that helps users create, customize, publish,
          and host professional portfolio websites and related personal branding
          pages.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          2. Eligibility
        </h2>
        <p>To use Cedar, you must:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Be at least 18 years old, or</li>
          <li>
            Have the permission and supervision of a parent, guardian, school,
            or lawful representative if under 18.
          </li>
        </ul>
        <p>By using our Services, you confirm that you meet these requirements.</p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          3. User Accounts
        </h2>
        <p>To access certain features, you may need to create an account.</p>
        <p>You agree to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Provide accurate and complete information</li>
          <li>Keep your login credentials secure</li>
          <li>
            Notify us immediately of any unauthorized access or suspected
            security breach
          </li>
          <li>Be responsible for all activity under your account</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that contain false
          information or violate these Terms.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          4. Services Offered
        </h2>
        <p>Cedar may provide services including but not limited to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Portfolio website creation</li>
          <li>Website templates and customization tools</li>
          <li>Domain or subdomain assignment</li>
          <li>Hosting and deployment</li>
          <li>
            Content uploads (e.g., projects, CVs, images, contact forms)
          </li>
          <li>Premium design or maintenance services</li>
          <li>Business or professional profile tools</li>
        </ul>
        <p>
          We may update, improve, modify, suspend, or discontinue any part of the
          Services at any time.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          5. Payments and Billing
        </h2>
        <p>Some Services may be offered for a fee.</p>
        <p>By purchasing a paid plan or service, you agree that:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            All prices are listed in the applicable currency shown at checkout
          </li>
          <li>You will provide valid payment information</li>
          <li>You authorize us to charge the applicable fees</li>
          <li>
            Payments made are generally non-refundable, except where required by
            law or where we expressly state otherwise
          </li>
        </ul>
        <p>If Cedar offers subscriptions:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            Subscriptions may renew automatically unless canceled before the
            renewal date
          </li>
          <li>
            You are responsible for canceling before the next billing cycle if
            you do not wish to continue
          </li>
        </ul>
        <p>
          If a payment fails, we may suspend or restrict access to paid Services
          until payment is completed.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          6. Free Plans and Trial Services
        </h2>
        <p>If we offer free plans, demos, or trial periods:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>They may have limited features</li>
          <li>We may modify or discontinue them at any time</li>
          <li>
            We are not obligated to preserve trial content after the trial
            period ends unless otherwise stated
          </li>
        </ul>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          7. User Content
        </h2>
        <p>
          You retain ownership of the content you upload, submit, or publish
          using Cedar, including:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Text, Photos, Logos, Videos</li>
          <li>Portfolio items, Resumes / CVs, Contact details, Testimonials</li>
          <li>Any other materials (“User Content”)</li>
        </ul>
        <p>
          By uploading or publishing User Content, you grant Cedar a
          non-exclusive, worldwide, royalty-free license to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Host, Store, Display</li>
          <li>Reproduce, Format, Distribute</li>
        </ul>
        <p>…only to the extent necessary to provide the Services.</p>
        <p>You are solely responsible for your User Content.</p>
        <p>You confirm that:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>You own the content or have permission to use it</li>
          <li>
            It does not infringe any intellectual property or privacy rights
          </li>
          <li>It does not violate any law or these Terms</li>
        </ul>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          8. Prohibited Use
        </h2>
        <p>You agree not to use Cedar to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Break any law or regulation</li>
          <li>
            Upload false, misleading, defamatory, or fraudulent information
          </li>
          <li>
            Host hate speech, violent threats, harassment, or discriminatory
            content
          </li>
          <li>Upload malware, viruses, malicious code, or harmful scripts</li>
          <li>
            Attempt unauthorized access to Cedar systems or other user accounts
          </li>
          <li>
            Copy, scrape, reverse engineer, or exploit the platform unlawfully
          </li>
          <li>Upload pornographic, obscene, or otherwise unlawful content</li>
          <li>Impersonate another person or organization</li>
          <li>
            Use Cedar to send spam, phishing, or deceptive communications
          </li>
        </ul>
        <p>
          We reserve the right to remove content or suspend accounts that
          violate this section.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          9. Intellectual Property
        </h2>
        <p>
          All rights, title, and interest in Cedar’s platform, branding,
          software, designs, features, graphics, templates, and original
          materials remain the property of Cedar or its licensors.
        </p>
        <p>Unless expressly permitted, you may not:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Copy, Sell, Redistribute</li>
          <li>Modify, Reverse engineer</li>
          <li>License, Commercially exploit</li>
        </ul>
        <p>…any part of Cedar other than your own content.</p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          10. Template and Design Use
        </h2>
        <p>If Cedar provides templates, layouts, or design assets:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            You may use them only through Cedar or as otherwise permitted by
            your plan
          </li>
          <li>
            You may not resell or redistribute Cedar templates as standalone
            products
          </li>
          <li>
            Cedar may reuse general design structures or non-exclusive template
            frameworks for other users
          </li>
        </ul>
        <p>
          If you purchase a custom design package, ownership of final deliverables
          may be subject to the agreed project terms.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          11. Domains, Subdomains, and Hosting
        </h2>
        <p>If Cedar provides hosting, subdomains, or helps connect custom domains:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Availability may depend on third-party providers</li>
          <li>
            You are responsible for ensuring your domain registration information
            is accurate
          </li>
          <li>
            We are not liable for domain loss due to expiration, registrar
            issues, or third-party outages unless caused solely by our direct
            negligence
          </li>
        </ul>
        <p>
          We may suspend hosted content that violates these Terms or applicable
          law.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          12. Third-Party Services
        </h2>
        <p>
          Cedar may integrate with third-party tools or providers, such as:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Payment processors, Analytics services, Domain registrars</li>
          <li>Email tools, Cloud hosting services</li>
        </ul>
        <p>
          We are not responsible for the content, policies, availability, or
          practices of third-party services. Your use of such services may also
          be governed by their own terms and privacy policies.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          13. Availability and Technical Issues
        </h2>
        <p>
          We aim to provide reliable service, but we do not guarantee that Cedar
          will always be:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Available, Error-free, Secure, Uninterrupted</li>
        </ul>
        <p>
          We may perform maintenance, updates, or emergency changes without prior
          notice.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          14. Backups and Data Responsibility
        </h2>
        <p>
          While we may maintain backups for operational purposes, you are
          responsible for keeping copies of your important content and files.
        </p>
        <p>
          Cedar is not liable for data loss, corruption, or deletion except
          where required by law.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          15. Termination or Suspension
        </h2>
        <p>We may suspend or terminate your access if:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>You violate these Terms</li>
          <li>You misuse the platform</li>
          <li>Your payment remains overdue</li>
          <li>We are required to do so by law</li>
          <li>
            Continued access poses risk to Cedar, other users, or third parties
          </li>
        </ul>
        <p>
          You may stop using our Services at any time. Termination does not remove
          your obligation to pay any outstanding fees.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          16. Disclaimer of Warranties
        </h2>
        <p>
          To the fullest extent permitted by law, Cedar is provided “as is” and “as
          available.”
        </p>
        <p>We do not guarantee:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Specific business outcomes</li>
          <li>Job offers, clients, or portfolio visibility</li>
          <li>Uninterrupted uptime</li>
          <li>Error-free performance</li>
          <li>Compatibility with every device or browser</li>
        </ul>
        <p>Use of the Services is at your own risk.</p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          17. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, Cedar and its owners, officers,
          employees, contractors, and affiliates shall not be liable for any:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            Indirect damages, Loss of profits, Loss of business opportunities
          </li>
          <li>
            Loss of data, Reputation damage, Consequential or incidental damages
          </li>
        </ul>
        <p>…arising out of or related to your use of the Services.</p>
        <p>
          Where liability cannot legally be excluded, our total liability shall
          be limited to the amount you paid us in the 12 months preceding the
          claim, if any.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          18. Indemnity
        </h2>
        <p>
          You agree to indemnify and hold harmless Cedar from any claims, losses,
          liabilities, damages, or expenses arising from:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Your User Content</li>
          <li>Your misuse of the Services</li>
          <li>Your breach of these Terms</li>
          <li>Your violation of any law or third-party rights</li>
        </ul>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          19. Privacy
        </h2>
        <p>
          Your use of Cedar is also governed by our{" "}
          <a href="/privacy" className="text-cedar-forest underline">
            Privacy Policy
          </a>
          , which explains how we collect, use, and protect personal information.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          20. Changes to These Terms
        </h2>
        <p>We may update these Terms from time to time.</p>
        <p>
          If we make material changes, we may notify users through the website,
          email, dashboard notice, or other reasonable means.
        </p>
        <p>
          Your continued use of Cedar after updates take effect means you accept
          the revised Terms.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          21. Governing Law
        </h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with the
          laws of Kenya, unless otherwise required by applicable law.
        </p>
        <p>
          Any disputes arising from these Terms shall be subject to the
          jurisdiction of the competent courts of Kenya.
        </p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          22. Contact Us
        </h2>
        <p>If you have questions about these Terms, contact us at:</p>
        <ul className="list-none mt-2 space-y-1">
          <li>
            <strong>Cedar</strong>
          </li>
          <li>Email: legal@cedar.com</li>
          <li>Phone: +254 700 000000</li>
          <li>Address: Nairobi, Kenya</li>
        </ul>
      </div>
    </>
  );
}
