import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page} id="main">
      <span className="eyebrow">404 — Page not found</span>
      <h1>
        This page
        <br />
        isn&apos;t here.
      </h1>
      <p>The address may have changed, or the page may have moved on.</p>
      <Link href="/">
        <span>Return to the folio</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </main>
  );
}
