import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./EducationCertifications.module.css";

export function EducationCertifications() {
  return (
    <section
      className={styles.section}
      id="education"
      aria-labelledby="education-title"
    >
      <div className={styles.heading}>
        <SectionLabel number="05" label="Education & Certifications" />
        <h2 className={styles.title} id="education-title">
          Learning,
          <br />
          built in.
        </h2>
      </div>

      <div className={styles.columns}>
        <article className={styles.education}>
          <div className={styles.columnHeading}>
            <GraduationCap size={22} aria-hidden="true" />
            <h3>Education</h3>
          </div>
          <div className={styles.educationCard}>
            <span className={`${styles.dates} eyebrow`}>
              {profile.education.dates}
            </span>
            <h4>{profile.education.qualification}</h4>
            <p className={styles.institution}>{profile.education.institution}</p>
            <p className={`${styles.subheading} eyebrow`}>Coursework</p>
            <ul className={styles.coursework}>
              {profile.education.coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className={styles.certifications}>
          <div className={styles.columnHeading}>
            <Award size={22} aria-hidden="true" />
            <h3>Certifications</h3>
          </div>
          <ul className={styles.certificationList}>
            {certifications.map((certification) => (
              <li className={styles.certification} key={certification.number}>
                <span className={`${styles.number} eyebrow`}>
                  <span>{certification.number}</span>
                </span>
                <div className={styles.certificationContent}>
                  <a
                    className={styles.certificationLink}
                    href={certification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.certificationTitle}>
                      {certification.title}
                    </span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  <p className={styles.certificationMeta}>
                    {certification.issuer} <span aria-hidden="true">·</span>{" "}
                    {certification.date}
                  </p>
                  <span className={`${styles.badge} eyebrow`}>
                    {certification.badge}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
