"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./Contact.module.css";

const projectTypes = ["Web app", "API / backend", "Real-time product", "Other"];

export function Contact() {
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const projectType = String(formData.get("projectType") ?? "Not specified");
    const budget = String(formData.get("budget") ?? "Not specified");
    const message = String(formData.get("message") ?? "");
    const subject = `Portfolio enquiry — ${projectType}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      `Budget: ${budget}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the message ready to send.");
  };

  return (
    <section
      className={styles.section}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={styles.heading}>
        <SectionLabel number="07" label="Contact" />
        <h2 className={styles.title} id="contact-title">
          Let&apos;s build
          <br />
          something.
        </h2>
        <p className={styles.invitation}>
          Have an idea that needs thoughtful engineering? Tell me what you have
          in mind.
        </p>
        <a className={styles.email} href={`mailto:${profile.email}`}>
          <Mail size={18} aria-hidden="true" />
          <span>{profile.email}</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className="eyebrow">
            Your name
          </label>
          <input id="contact-name" name="name" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email" className="eyebrow">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <fieldset className={styles.choices}>
          <legend className="eyebrow">Project type</legend>
          <div className={styles.chips}>
            {projectTypes.map((type) => (
              <label className={styles.chip} key={type}>
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  required
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={styles.field}>
          <label htmlFor="contact-budget" className="eyebrow">
            Budget range
          </label>
          <select id="contact-budget" name="budget" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            <option value="Under ₹2,00,000">Under ₹2,00,000</option>
            <option value="₹2,00,000–₹5,00,000">₹2,00,000–₹5,00,000</option>
            <option value="₹5,00,000–₹10,00,000">₹5,00,000–₹10,00,000</option>
            <option value="₹10,00,000+">₹10,00,000+</option>
            <option value="To discuss">To discuss</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-message" className="eyebrow">
            A little about the project
          </label>
          <textarea id="contact-message" name="message" rows={4} required />
        </div>
        <div className={styles.submitRow}>
          <button className="editorial-button" type="submit">
            <span>Prepare email</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <p className={`${styles.status} eyebrow`} role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </form>
    </section>
  );
}
