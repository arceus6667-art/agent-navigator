import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroBg from "@/assets/bg6.jpg";
import g1 from "@/assets/gallery/1.jpg";
import g2 from "@/assets/gallery/2.jpg";
import g3 from "@/assets/gallery/3.jpg";
import g4 from "@/assets/gallery/4.jpg";
import g5 from "@/assets/gallery/5.jpg";
import g6 from "@/assets/gallery/6.jpg";
import g7 from "@/assets/gallery/7.jpg";
import g8 from "@/assets/gallery/8.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IEEE Student Branch | M.H. Saboo Siddik College Of Engineering" },
      {
        name: "description",
        content:
          "IEEE Student Branch at M.H. Saboo Siddik College of Engineering, Mumbai — about IEEE, committee members for the current year and event gallery.",
      },
      { property: "og:title", content: "IEEE Student Branch | M.H. Saboo Siddik College Of Engineering" },
      {
        property: "og:description",
        content:
          "About the IEEE Student Branch at MHSSCOE Mumbai, its committee and activity gallery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IeeePage,
});

const committee = [
  ["Muzzammil Amrelia", "Chairperson"],
  ["Mahek Mukadam", "Vice-Chairperson"],
  ["Samiya Qureshi", "Secretary"],
  ["Azzam Anas", "Joint Secretary"],
  ["Umme Hani Shaikh", "Treasurer"],
  ["Alkaseem Malik", "Joint Treasurer"],
  ["Khalid Saifullah", "Webmaster"],
  ["Mustafa Ansari", "Joint Webmaster"],
  ["Prof. Amar S Pawade", "Branch Counselor"],
];

const gallery = [
  { src: g1, title: "Blood donation drive organised by department of Electronics, IEEE-MHSSCOE on 19th March 2019." },
  { src: g2, title: "PCB designing workshop under IEEE-SKEP on 12th February, 2019 by Dr. Y. S. Rao, Vice principal, SPIT, Mumbai." },
  { src: g3, title: "FPGAs & Soft Processors workshop under IEEE-SKEP on 20th January, 2018 conducted by Mr. Mandar Saraf, Scientific Officer (D), and Colleagues TIFR, Mumbai." },
  { src: g4, title: "Seminar on “Programming and applications of Robotics” under IEEE-SKEP, on September 28, 2017 conducted by Mr. Quentin D’souza, CEO of Quantum Designs, Mumbai" },
  { src: g5, title: "Tech-fest 2018 - Technical paper presentation" },
  { src: g6, title: "Tech-fest 2018 - minute to win it" },
  { src: g7, title: "Tech-fest 2018 - LIVE CS" },
  { src: g8, title: "Tech-fest 2018" },
];

function IeeePage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-[14px] font-medium leading-[1.7] text-ink">
      <SiteHeader />

      <main>
        {/* Page title banner */}
        <section
          className="relative bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-white/80" />
          <div className="relative mx-auto max-w-[1170px] px-4 py-[100px] text-center">
            <h1 className="m-0 text-[36px] font-bold leading-tight text-heading">IEEE</h1>
          </div>
        </section>

        {/* Intro */}
        <section>
          <div className="mx-auto max-w-[1170px] px-4 pt-[25px] pb-[20px]">
            <p className="text-justify text-[15px] leading-[1.7]">
              IEEE - <b>Institute of Electrical and Electronics Engineers</b> - is the world’s largest technical
              professional organization dedicated to advancing technology for the benefit of humanity. The IEEE is a
              non-profit professional organization founded by a handful of engineers in 1884 for the purpose of
              consolidating ideas dealing with electro-technology. The IEEE plays a significant role in publishing
              technical works, sponsoring conferences and seminars, accreditation, and standards development. IEEE
              membership can help the students members and professional members to accelerate their career plans and
              help to grow as a technology professional as it offers access to technical innovation, cutting-edge
              information, networking opportunities, and exclusive member benefits. Members support IEEE&apos;s mission
              to advance technology for humanity and the profession, while memberships build a platform to introduce
              careers in technology around the world.
            </p>
          </div>
        </section>

        {/* Committee */}
        <section>
          <div className="mx-auto max-w-[1170px] px-4 pt-[55px]">
            <h2 className="line-bottom-edu mt-0 text-[24px] font-bold text-heading">Committee</h2>
            <div className="md:w-1/2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[14px]">
                  <tbody>
                    <tr className="bg-table-head">
                      <th className="w-1/2 border-b border-rule px-2 py-2 text-left font-bold">Name</th>
                      <th className="w-1/2 border-b border-rule px-2 py-2 text-left font-bold">Designation</th>
                    </tr>
                    {committee.map(([name, role], i) => (
                      <tr key={name} className={i % 2 === 1 ? "bg-table-head" : undefined}>
                        <td className="border-b border-rule px-2 py-2">{name}</td>
                        <td className="border-b border-rule px-2 py-2">{role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <div className="mx-auto max-w-[1170px] px-4 pt-[40px] pb-[50px]">
            <h2 className="line-bottom-edu mt-0 text-[24px] font-bold text-heading">Gallery</h2>
            <p className="mb-[20px] text-[14px] text-notice">Click on the photo for information.</p>
            <div className="columns-2 gap-[10px] sm:columns-3 lg:columns-4">
              {gallery.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(i)}
                  title={item.title}
                  className="mb-[10px] block w-full overflow-hidden"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="block h-auto w-full transition-opacity hover:opacity-85"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {active !== null && gallery[active] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="max-h-full w-full max-w-[900px] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[active]!.src} alt={gallery[active]!.title} className="mx-auto max-h-[75vh] w-auto max-w-full" />
            <p className="mt-3 text-center text-[13px] text-white">{gallery[active]!.title}</p>
          </div>
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 p-2 text-white"
          >
            <X className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
