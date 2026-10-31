import { education, experience } from "@/lib/content";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-16 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionTitle kanji="道" label="Where I have worked" title="Experience" />

        <ol id="experience-list" className="relative mt-16 space-y-12 pl-8 md:pl-14">
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[11px]">
            <div
              data-blade-line
              className="h-full w-full bg-gradient-to-b from-crimson via-ember to-crimson shadow-[0_0_14px_2px_rgb(230_46_58/0.7)]"
            />
          </div>
          {experience.map((job) => (
            <li key={job.period + job.role} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-2 h-3.5 w-3.5 rotate-45 border border-crimson bg-night shadow-[0_0_10px_rgb(230_46_58/0.8)] md:-left-[57px] md:h-4 md:w-4"
              />
              <div
                data-slash
                className="rounded-xl border border-line bg-panel/80 p-6 backdrop-blur-sm transition-colors hover:border-crimson/60 md:p-8"
              >
                <p className="mono-label">{job.period}</p>
                <h3 className="display mt-3 text-2xl md:text-4xl">{job.role}</h3>
                <p className="mt-2 text-crimson">{job.org}</p>
                <ul className="mt-5 space-y-2 text-bone/80">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="star mt-[0.45em] shrink-0 text-steel/60" style={{ width: "0.55em", height: "0.55em" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-16 grid gap-6 rounded-xl border border-line bg-panel/80 p-6 backdrop-blur-sm md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            <p className="mono-label">Education</p>
            <p className="display mt-3 text-xl md:text-3xl">{education.degree}</p>
            <p className="mt-2 text-steel">
              {education.school}, {education.period}
            </p>
            <p className="mt-1 text-steel">{education.result}</p>
          </div>
          <div>
            <p className="mono-label">Languages</p>
            <p className="mt-3 text-bone/90">{education.languages}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
