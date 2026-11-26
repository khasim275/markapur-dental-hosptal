"use client";

import { FormEvent, useState } from "react";

type FieldErrors = Partial<Record<"name" | "phone" | "consent", string[]>>;

export default function HomePage() {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setErrors({});
    setNotice(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      preferredDate: String(form.get("preferredDate") ?? ""),
      preferredTime: String(form.get("preferredTime") ?? ""),
      consent: form.get("consent") === "on",
      companyWebsite: String(form.get("companyWebsite") ?? "")
    };

    try {
      const response = await fetch("/api/appointment-enquiries", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": crypto.randomUUID()
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fields) setErrors(result.fields);
        throw new Error(result.message ?? "We could not send your enquiry. Please try again.");
      }
      setNotice({
        kind: "success",
        text: `Your enquiry was received in this development environment. Reference: ${result.reference}. This is not a confirmed appointment.`
      });
      event.currentTarget.reset();
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Markapur Dental home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>MARKAPUR <strong>DENTAL</strong></span>
        </a>
        <span className="header-note">A thoughtful first step towards your dental care</span>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span /> APPOINTMENT ENQUIRY</p>
          <h1>A healthier smile<br /><em>starts with a hello.</em></h1>
          <p className="intro">
            Tell us how to reach you and when you would prefer to visit.
            The clinic can follow up to discuss the next step.
          </p>
          <div className="trust-note">
            <span className="trust-icon" aria-hidden="true">✳</span>
            <p><strong>Your details, treated with care.</strong><br />Only share the information requested in this form.</p>
          </div>
        </div>

        <div className="form-card" id="enquiry">
          <div className="form-heading">
            <div>
              <p className="eyebrow">LET’S CONNECT</p>
              <h2>Request a call back</h2>
            </div>
            <span className="step-number">01 <i>/ 01</i></span>
          </div>
          <p className="form-intro">A few details are all we need to get started.</p>

          {notice && (
            <div className={`notice ${notice.kind}`} role="status" aria-live="polite">
              {notice.text}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Your name <span>*</span></label>
              <input id="name" name="name" autoComplete="name" placeholder="Enter your full name" required maxLength={80} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name && <small className="field-error" id="name-error">{errors.name[0]}</small>}
            </div>
            <div className="field">
              <label htmlFor="phone">Mobile number <span>*</span></label>
              <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : "phone-help"} />
              {errors.phone ? <small className="field-error" id="phone-error">{errors.phone[0]}</small> : <small className="field-help" id="phone-help">Indian mobile number, with or without +91</small>}
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="preferredDate">Preferred date</label>
                <input id="preferredDate" name="preferredDate" type="date" min={new Date().toISOString().slice(0, 10)} />
              </div>
              <div className="field">
                <label htmlFor="preferredTime">Preferred time</label>
                <select id="preferredTime" name="preferredTime" defaultValue="">
                  <option value="">No preference</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="companyWebsite">Leave this field empty</label>
              <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>I agree that the clinic may use these details to respond to my enquiry. <b>*</b></span>
            </label>
            {errors.consent && <small className="field-error">{errors.consent[0]}</small>}
            <button className="submit-button" type="submit" disabled={pending}>
              {pending ? "Sending enquiry…" : "Send appointment enquiry"}
              <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p className="privacy-note">Submitting this form is an enquiry only. It does not book or confirm an appointment.</p>
        </div>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Markapur Dental</span>
        <span>Appointment enquiry prototype · Development only</span>
      </footer>
    </main>
  );
}