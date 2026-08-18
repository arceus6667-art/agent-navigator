import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, PhoneCall, X } from "lucide-react";
import logo from "@/assets/logo.png";

const BASE = "https://www.mhssce.ac.in/";
const url = (p: string) => BASE + p;

const topLinks = [
  { label: "Mandatory Disclosure", href: url("pdf/MandatoryDisclosure.pdf") },
  { label: "NIRF", href: url("pdf/nirf2026.pdf") },
  { label: "R&D", href: url("RandD.php") },
  { label: "IEEE", href: url("IEEE.php") },
  { label: "Library", href: "https://mhsscelibrary.remotexs.in/" },
  { label: "Gallery", href: url("Gallery.php") },
  { label: "Important Links", href: url("Important Links.php") },
  { label: "Contact Us", href: url("Contact Us.php") },
];

type Item = { label: string; href: string };
type Nav = { label: string; href: string; mega?: Item[][]; dropdown?: Item[] };

const nav: Nav[] = [
  { label: "Home", href: url("index.php") },
  {
    label: "Institution",
    href: "#",
    mega: [
      [
        { label: "Anjuman-I-Islam", href: url("Anjuman-I-Islam.php") },
        { label: "Administrative Committees", href: url("Administrative Committees.php") },
        { label: "From Chairman's Desk", href: url("From Chairmans Desk.php") },
        { label: "From Director’s Desk", href: url("From Directors Desk.php") },
        { label: "From Principal’s Desk", href: url("From Principals Desk.php") },
        { label: "AICTE Approval", href: url("AICTE Approval.php") },
      ],
      [
        { label: "NBA Accreditation", href: url("NBA Accreditation.php") },
        { label: "Infrastructure and Facilities", href: url("Infrastructure and Facilities.php") },
        { label: "Fee Proposal (UG)", href: url("pdf/2020-2021 Fee Structure SE TE BE.pdf") },
        { label: "Staff Working Committees", href: url("Staff Working Committees.php") },
        {
          label: "Mumbai University - Code of Conduct for University & College Teachers",
          href: url("pdf/university Circular-Code of Conduct- Teachers (1).pdf"),
        },
      ],
      [
        { label: "Code of Conduct and Ethics For Students", href: url("CCEFS.php") },
        { label: "Prohibition and Prevention For Ragging", href: url("pdf/DECIPLINE AND ANTI RAGGING.pdf") },
        { label: "Media", href: url("Media.php") },
        { label: "Achievements", href: url("pdf/All-Achievments.pdf") },
        { label: "Students Grievances Redressal Cell", href: "https://docs.google.com/forms/d/1IeikXjSmBjo6vSg5KcTRmKzPn2z5AqcVElHxwjmW_bQ/viewform" },
        { label: "Feedback Link for Students and Faculty on AICTE Portal", href: "https://www.aicte-india.org/feedback/" },
      ],
    ],
  },
  {
    label: "Admissions",
    href: "#",
    dropdown: [
      { label: "Documents required for Admission(26-27)", href: url("pdf/Admission/2026-2027/documentForAdmission.pdf") },
      { label: "Prospectus", href: url("Prospectus.php") },
      { label: "Intake Capacity", href: url("Intake Capacity.php") },
      { label: "Admission Notices", href: url("Admission Notices.php") },
      { label: "Online for FE", href: "https://forms.gle/vy5ctThkKNt6xz6v7" },
      { label: "Online for DSE", href: "https://forms.gle/pSKzXvYknpGmmpUn9" },
      { label: "FRA Computation 2026-27", href: url("pdf/FRA/FRA_2026-2027.pdf") },
      { label: "Contact Us", href: url("Admissions Contact.php") },
    ],
  },
  {
    label: "Examinations",
    href: "#",
    dropdown: [
      { label: "Exam Form", href: url("pdf/Examinations/Sem-I Exam Form.pdf") },
      { label: "D form for AY 2026-26", href: url("pdf/Dform 2025-26.pdf") },
      { label: "LC Form", href: url("pdf/LC FORM.pdf") },
      { label: "Timetable", href: url("Timetable.php") },
      { label: "Exams Results", href: url("Exams Results.php") },
      { label: "Exams Notices", href: url("Exams Notices.php") },
      { label: "Revaluation & Photocopy", href: url("Revaluation Photocopy.php") },
      { label: "Contact Us", href: url("Examinations Contact.php") },
    ],
  },
  {
    label: "Department",
    href: "#",
    mega: [
      [
        { label: "Computer Engineering", href: url("Computer.php") },
        { label: "Computer Science And Engineering (Artificial Intelligence and Machine Learning)", href: url("CSE-AIML.php") },
        { label: "Computer Science And Engineering(Internet of Things and Cyber Security including BlockChain Technology)", href: url("CSE-IOT.php") },
      ],
      [
        { label: "Mechanical Engineering Automobile", href: url("Automobile.php") },
        { label: "Civil Engineering", href: url("Civil.php") },
        { label: "Information Technology", href: url("Information Technology.php") },
        { label: "Mechanical Engineering", href: url("Mechanical.php") },
      ],
      [
        { label: "Electronics & Tele-Communication Engineering", href: url("Electronics TeleCommunication.php") },
        { label: "Humanities and Applied Sciences", href: url("Basic Science and Humanity.php") },
        { label: "M.E in Civil (Constructions Engineering & Managment)", href: BASE },
        { label: "M.E in Computer Science And Engineering (Artificial intelligence & Machine learning)", href: BASE },
      ],
    ],
  },
  {
    label: "Training & Placement",
    href: "#",
    mega: [
      [
        { label: "Message from T&P Head", href: url("Message TP Head.php") },
        { label: "List of Recruiters", href: url("TP-Recruiters.php") },
        { label: "List of Universities for Higher Studies (MS)", href: url("TP-Universities.php") },
      ],
      [
        { label: "Placement and Higher Study Records", href: url("Placement and Higher Study Records.php") },
        { label: "Activities", href: url("TP-Activities.php") },
        { label: "Recruiters Testimonial", href: url("TPO Recruiters Testimonial.php") },
      ],
      [
        { label: "Contact Details", href: url("Placement Contact.php") },
        { label: "Psychological Counsellor", href: url("Psychological Counsellor Contact.php") },
      ],
    ],
  },
  {
    label: "NAAC",
    href: url("NAAC.php"),
    dropdown: [
      { label: "IQAC", href: url("NAAC IQAC.php") },
      { label: "QIF", href: "#" },
      { label: "SSR", href: url("NAAC SSR.php") },
    ],
  },
  {
    label: "EDC",
    href: "#",
    mega: [
      [
        { label: "About Us", href: url("EDC About.php") },
        { label: "Our Flagship Event - IIGC", href: url("IIGC.php") },
        { label: "Our Team", href: url("EDC Team.php") },
      ],
      [
        { label: "Reports", href: url("EDC Reports.php") },
        { label: "Events", href: url("EDC Events.php") },
        { label: "Testimonials", href: url("EDC Testimonials.php") },
      ],
      [
        { label: "UnThink 2026", href: "https://mhssce.ac.in/UnThink/" },
        { label: "Contact Us", href: url("EDC Contact.php") },
      ],
    ],
  },
  {
    label: "Fee Payment",
    href: "#",
    dropdown: [
      { label: "Fee structure for AY 2026-27", href: url("pdf/FEE/fee structure 2026-27.pdf") },
      { label: "Online payment account details", href: url("pdf/FEE/OnlineFees.pdf") },
      { label: "QR code for fee payment", href: url("pdf/qr code for fee payment 19.10.22.jpeg") },
      { label: "Scholarship", href: "#" },
    ],
  },
  {
    label: "Life @MHSS",
    href: "#",
    dropdown: [
      { label: "SAE", href: url("SAE.php") },
      { label: "CES, ISSE", href: url("CES-ISSE.php") },
      { label: "CSI", href: url("CSI.php") },
      { label: "IETE", href: url("IETE.php") },
      { label: "ACM", href: url("ACM.php") },
      { label: "ISHRAE, MESA", href: url("Ishrae-MESA.php") },
      { label: "SACE", href: url("SACE.php") },
      { label: "MHSSCOE-AWS", href: url("MHSSCOE-AWS.php") },
      { label: "NSS", href: url("NSS.php") },
      { label: "PC", href: url("PC.php") },
    ],
  },
  {
    label: "Alumni",
    href: "#",
    mega: [
      [
        { label: "Objectives", href: url("Alumni Objectives.php") },
        { label: "Distinguished Alumni", href: url("Distinguished Alumni.php") },
        { label: "Transcripts", href: url("Alumni Transcripts.php") },
        { label: "Activities", href: url("Alumni Activities.php") },
      ],
      [
        { label: "Events", href: url("Alumni Events.php") },
        { label: "Testimonials from Alumni", href: url("Alumni Testimonials.php") },
        { label: "Enquiry Form", href: url("Alumni Enquiry.php") },
        { label: "Alumni Stakeholder Survey Form", href: url("pdf/alumni survey form.pdf") },
      ],
      [{ label: "Alumni Login", href: url("mhsadmin/admin.php") }],
    ],
  },
];

function MegaPanel({ columns }: { columns: Item[][] }) {
  return (
    <div className="invisible absolute inset-x-0 top-full z-40 border-t-2 border-topbar bg-white opacity-0 shadow-lg transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100">
      <div className="grid gap-x-8 px-4 py-6 lg:grid-cols-3">
        {columns.map((col, i) => (
          <ul key={i} className="space-y-1">
            {col.map((item) => (
              <li key={item.label} className="border-b border-dashed border-rule py-[6px] last:border-0">
                <a
                  href={item.href}
                  className="block text-[13px] leading-snug text-ink transition-colors hover:text-topbar"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Dropdown({ items }: { items: Item[] }) {
  return (
    <ul className="invisible absolute left-0 top-full z-40 w-[260px] translate-y-1 border-t-2 border-topbar bg-white py-1 opacity-0 shadow-lg transition-[opacity,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="block px-4 py-[7px] text-[13px] leading-snug text-ink transition-colors hover:bg-table-head hover:text-topbar"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="w-full">
      {/* Top utility bar */}
      <div className="bg-topbar">
        <div className="mx-auto max-w-[1170px] px-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 py-[7px] text-[13px] text-white md:justify-end">
            {topLinks.map((link, i) => (
              <li key={link.label} className="flex items-center gap-x-2">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/95 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </a>
                {i < topLinks.length - 1 && <span aria-hidden className="text-white/70">|</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logo + contact */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-[1170px] flex-col items-center gap-6 px-4 py-[10px] md:flex-row md:justify-between">
          <a href={url("index.php")} className="shrink-0">
            <img src={logo} alt="Anjuman-I-Islam's M. H. Saboo Siddik College of Engineering" className="h-[80px] w-auto" />
          </a>
          <div className="flex flex-col items-center gap-5 pt-2 sm:flex-row sm:items-start sm:gap-10">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-navy" strokeWidth={2.2} />
              <div className="leading-tight">
                <span className="block text-[13px] uppercase text-neutral-500">Mail Us</span>
                <a href="mailto:aimhssce@mhssce.ac.in" className="block text-[13px] font-bold text-ink hover:text-topbar">
                  aimhssce@mhssce.ac.in
                </a>
                <a href="mailto:mhssce@yahoo.in" className="block text-[13px] font-bold text-ink hover:text-topbar">
                  mhssce@yahoo.in
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneCall className="mt-1 h-6 w-6 shrink-0 text-navy" strokeWidth={2.2} />
              <div className="leading-tight">
                <span className="block text-[13px] uppercase text-neutral-500">Call us</span>
                <a href="tel:+912223012922" className="block text-[13px] font-bold text-ink hover:text-topbar">
                  +91 22 23012922
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote strip */}
      <div className="overflow-hidden bg-quote">
        <div className="mx-auto max-w-[1170px] px-4 py-[10px]">
          <p className="truncate text-center text-[16px] font-medium text-quote-text md:text-right">
            Rabbi Zidni &apos;Ilma. : ربِّ زِدْنِي عِلْماً - &quot;My lord, increase me in knowledge&quot; [20:119].
          </p>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-navy">
        <div className="mx-auto max-w-[1170px] px-4">
          <div className="flex items-center justify-between lg:hidden">
            <span className="py-3 text-[14px] font-semibold text-white">Menu</span>
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-3 text-white"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop */}
          <nav className="relative hidden lg:block">
            <ul className="flex flex-nowrap items-center">
              {nav.map((item) => (
                <li key={item.label} className={item.dropdown ? "group relative" : "group"}>
                  <a
                    href={item.href}
                    className="flex items-center gap-[3px] whitespace-nowrap px-[9px] py-[16px] text-[14px] font-semibold text-white transition-colors group-hover:text-quote"
                  >
                    {item.label}
                    {(item.mega || item.dropdown) && (
                      <ChevronDown className="h-[12px] w-[12px] shrink-0" strokeWidth={2.5} />
                    )}
                  </a>
                  {item.mega && <MegaPanel columns={item.mega} />}
                  {item.dropdown && <Dropdown items={item.dropdown} />}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile */}
        {open && (
          <nav className="max-h-[70vh] overflow-y-auto border-t border-white/15 lg:hidden">
            <ul>
              {nav.map((item) => {
                const children = item.mega ? item.mega.flat() : item.dropdown;
                const isOpen = expanded === item.label;
                return (
                  <li key={item.label} className="border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <a href={item.href} className="flex-1 px-4 py-3 text-[14px] font-semibold text-white">
                        {item.label}
                      </a>
                      {children && (
                        <button
                          type="button"
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                          aria-expanded={isOpen}
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          className="px-4 py-3 text-white"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {children && isOpen && (
                      <ul className="bg-footer-bottom pb-2">
                        {children.map((child) => (
                          <li key={child.label}>
                            <a href={child.href} className="block px-6 py-2 text-[13px] leading-snug text-white/85">
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}