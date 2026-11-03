import type { Metadata } from "next";
import Rich from "@/components/Rich";
import {
  cvEducation,
  cvExtraSkills,
  doc,
  docOrg,
  docPeriod,
  earlier,
  earlierDocs,
  experience,
  jobBullets,
  live,
  otherWork,
  otherWorkNote,
  personal,
  profile,
  projectDocs,
  stack,
} from "@/lib/documents";
import { cvCss } from "@/lib/doc-css";

export const metadata: Metadata = {
  title: { absolute: "Taimul Haque Pathan - Curriculum Vitae" },
  alternates: { canonical: "/cv" },
  robots: { index: false, follow: false },
};

export default function CvPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cvCss }} />
      <div className="doc">
        <header>
          <div>
            <h1>{profile.name}</h1>
            <div className="title">{doc.title}</div>
          </div>
          <div className="contact">
            {profile.email}
            <br />
            {doc.phone}
            <br />
            <a className="lnk" href={profile.github}>GitHub</a> &nbsp;&middot;&nbsp;{" "}
            <a className="lnk" href={profile.linkedin}>LinkedIn</a> &nbsp;&middot;&nbsp;{" "}
            <a className="lnk" href={profile.site}>Portfolio</a>
          </div>
        </header>

        <h2>Profile</h2>
        <p>
          {doc.summary}
          {doc.cvSummaryEnd}
        </p>

        <h2>Skills</h2>
        <dl className="skills">
          {stack.map((g) => (
            <div key={g.label} style={{ display: "contents" }}>
              <dt>{g.label}</dt>
              <dd>{[...g.items, ...(cvExtraSkills[g.label] ?? [])].join(", ")}</dd>
            </div>
          ))}
        </dl>

        <h2>Work Experience</h2>
        {experience.map((job, i) => (
          <div className="job" key={job.period + job.role}>
            <div className="row">
              <span>
                <span className="role">{job.role}</span> &middot; <span className="org">{docOrg(job.org)}</span>
              </span>
              <span className="date">{docPeriod(job.period)}</span>
            </div>
            <ul>
              {jobBullets[i].cv.map((b) => (
                <li key={b}>
                  <Rich text={b} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Projects</h2>
        {live.map((p) => {
          const d = projectDocs[p.name];
          return (
            <div className="proj" key={p.name}>
              <div className="row">
                <span className="role">
                  {p.name} &mdash; {d.title}
                </span>
                <a className="lnk date" href={p.href}>Live Link</a>
              </div>
              <ul>
                {d.cv.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tech">
                <b>Tech:</b> {d.tech}
              </div>
            </div>
          );
        })}
        {earlier.map((e) => {
          const d = earlierDocs[e.name];
          return (
            <div className="proj" key={e.name}>
              <div className="row">
                <span className="role">
                  {e.name} &mdash; {d.title}
                </span>
                <span className="date">{d.dates}</span>
              </div>
              <ul>
                {d.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tech">
                <b>Tech:</b> {d.tech}
              </div>
            </div>
          );
        })}
        <div className="proj keep">
          <div className="row">
            <span className="role">Other client and product work</span>
          </div>
          <p style={{ marginTop: 3 }}>
            {otherWork.slice(0, -1).join(", ")} and {otherWork[otherWork.length - 1]}: {otherWorkNote}
          </p>
        </div>

        <div className="keep">
          <h2>Education</h2>
          <table>
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institute</th>
                <th>Group</th>
                <th>Year</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {cvEducation.map((e) => (
                <tr key={e.degree}>
                  <td>{e.degree}</td>
                  <td>{e.institute}</td>
                  <td>{e.group}</td>
                  <td>{e.year}</td>
                  <td>{e.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="keep">
          <h2>Personal Information</h2>
          <dl className="personal">
            {personal.map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="keep">
          <h2>References</h2>
          <p>Available upon request.</p>
        </div>
      </div>
    </>
  );
}
