import type { Metadata } from "next";
import Rich from "@/components/Rich";
import { doc, docOrg, docPeriod, experience, education, jobBullets, live, profile, projectDocs, stack } from "@/lib/documents";
import { resumeCss } from "@/lib/doc-css";

export const metadata: Metadata = {
  title: { absolute: "Taimul Haque Pathan - Resume" },
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: resumeCss }} />
      <div className="doc">
        <header>
          <h1>{profile.name}</h1>
          <div className="title">{doc.title}</div>
          <div className="contact">
            <span>{profile.email}</span>
            <span>{doc.phone}</span>
            <span>{doc.city}</span>
            <span>
              <a className="lnk" href={profile.github}>GitHub</a>
            </span>
            <span>
              <a className="lnk" href={profile.linkedin}>LinkedIn</a>
            </span>
            <span>
              <a className="lnk" href={profile.site}>Portfolio</a>
            </span>
          </div>
        </header>

        <h2>Summary</h2>
        <p>
          {doc.summary}
          {doc.resumeSummaryEnd}
        </p>

        <h2>Skills</h2>
        <div className="skills">
          {stack.map((g) => (
            <p key={g.label}>
              <b>{g.label}</b>
              {g.items.join(", ")}
            </p>
          ))}
        </div>

        <h2>Experience</h2>
        {experience.map((job, i) => (
          <div className="job" key={job.period + job.role}>
            <div className="row">
              <span>
                <span className="role">{job.role}</span> &middot; <span className="org">{docOrg(job.org)}</span>
              </span>
              <span className="date">{docPeriod(job.period)}</span>
            </div>
            <ul>
              {jobBullets[i].resume.map((b) => (
                <li key={b}>
                  <Rich text={b} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Selected Projects</h2>
        {live.map((p) => {
          const d = projectDocs[p.name];
          return (
            <div className="job" key={p.name}>
              <div className="row">
                <span className="role">
                  {p.name} &mdash; {d.title}
                </span>
                <a className="lnk date" href={p.href}>Live Link</a>
              </div>
              <ul>
                {d.resume.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="tech">{d.tech}</p>
            </div>
          );
        })}

        <h2>Education</h2>
        <div className="row">
          <span>
            <span className="role">{education.degree}</span> &middot; <span className="org">{education.school}</span>
          </span>
          <span className="date">
            {education.period.replace(" to ", " – ")} &middot; {education.result}
          </span>
        </div>

        <h2>Languages</h2>
        <p>{education.languages}</p>
      </div>
    </>
  );
}
