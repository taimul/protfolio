// Print styles for /resume and /cv. They override the site's dark theme for these two pages only.
const base = `
html { background:#fff !important; color-scheme:light !important; }
html body { background:#fff !important; color:#1a1d23; font-family:"Segoe UI", Calibri, Arial, sans-serif; margin:0; display:block; }
html body::after { display:none; }
.doc, .doc * { box-sizing:border-box; }
.doc { --ink:#1a1d23; --muted:#5b6270; --accent:#1f4fd8; --rule:#d9dde5; --tint:#f3f6fd; color:var(--ink); }
.doc a { color:inherit; text-decoration:none; }
.doc a.lnk { color:var(--accent); font-weight:600; text-decoration:underline; }
.doc p { margin:0 0 3px; }
.doc ul { list-style:disc; margin:2px 0 0; padding-left:15px; }
.doc li { margin-bottom:1.5px; }
.doc h1, .doc h2 { font-weight:700; }
.doc .row { display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
.doc .role { font-weight:700; }
.doc .org { font-weight:600; color:var(--muted); }
.doc .date { color:var(--muted); white-space:nowrap; }
.doc .tech { color:var(--muted); }
.doc dl, .doc dd { margin:0; }
`;

export const resumeCss = `
@page { size: A4; margin: 0; }
${base}
.doc { font-size:9pt; line-height:1.3; width:210mm; padding:9mm 14mm 6mm; }
.doc header { border-bottom:2px solid var(--accent); padding-bottom:6px; margin-bottom:8px; }
.doc h1 { margin:0; font-size:22pt; letter-spacing:.3px; line-height:1.1; }
.doc .title { color:var(--accent); font-weight:600; font-size:11pt; margin-top:2px; }
.doc .contact { margin-top:5px; color:var(--muted); font-size:9pt; }
.doc .contact span + span::before { content:"|"; margin:0 7px; color:var(--rule); }
.doc h2 { font-size:9.5pt; letter-spacing:1.4px; text-transform:uppercase; color:var(--accent); margin:7px 0 3px; padding-bottom:1px; border-bottom:1px solid var(--rule); }
.doc .job { margin-bottom:6px; }
.doc .date { font-size:9pt; }
.doc .skills p { margin-bottom:2px; }
.doc .skills b { display:inline-block; min-width:104px; }
.doc .tech { font-size:8.8pt; }
`;

export const cvCss = `
@page { size: A4; margin: 13mm 15mm 13mm; }
${base}
.doc { font-size:9.6pt; line-height:1.36; }
.doc header { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; border-bottom:2.5px solid var(--accent); padding-bottom:9px; margin-bottom:4px; }
.doc h1 { margin:0; font-size:25pt; line-height:1.05; letter-spacing:.3px; }
.doc .title { color:var(--accent); font-weight:600; font-size:12pt; margin-top:4px; }
.doc .contact { text-align:right; font-size:9.3pt; color:var(--muted); line-height:1.55; }
.doc h2 { font-size:10pt; letter-spacing:1.6px; text-transform:uppercase; color:var(--accent); margin:11px 0 5px; padding-bottom:2px; border-bottom:1px solid var(--rule); break-after:avoid; }
.doc p { margin:0 0 5px; }
.doc .job, .doc .proj { margin-bottom:7px; break-inside:avoid; }
.doc .role { font-size:10.5pt; }
.doc .date { font-size:9.3pt; }
.doc ul { margin:3px 0 0; padding-left:17px; }
.doc li { margin-bottom:2px; }
.doc .tech { font-size:9.2pt; margin-top:2px; }
.doc .tech b { color:var(--ink); font-weight:600; }
.doc .skills { display:grid; grid-template-columns:118px 1fr; row-gap:4px; column-gap:8px; }
.doc .skills dt { font-weight:700; }
.doc table { width:100%; border-collapse:collapse; font-size:9.6pt; }
.doc th { text-align:left; background:var(--tint); color:var(--accent); font-weight:600; padding:5px 7px; border-bottom:1px solid var(--rule); }
.doc td { padding:5px 7px; border-bottom:1px solid var(--rule); vertical-align:top; }
.doc .personal { display:grid; grid-template-columns:140px 1fr; row-gap:3px; column-gap:8px; }
.doc .personal dt { font-weight:700; }
.doc .keep { break-inside:avoid; }
`;
