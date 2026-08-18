import { Facebook, Globe, Instagram, Mail, Phone, Twitter, Youtube } from "lucide-react";
import footerLogo from "@/assets/footer-logo.png";

const loginLinks = ["Faculty", "Admin", "Dean Academics", "NAAC", "Alumni"];

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="mx-auto max-w-[1170px] px-4 pt-[30px] pb-[10px]">
        <div className="grid gap-8 border-b border-black/25 pb-6 md:grid-cols-3">
          <div>
            <img src={footerLogo} alt="M. H. Saboo Siddik College of Engineering" className="mt-[10px] mb-[20px] h-auto w-[220px] max-w-full" />
            <p className="text-[14px] leading-[1.7]">
              8, Saboo Siddik Polytechnic Road, Byculla, Mumbai, Maharashtra 400008
            </p>
            <ul className="mt-[5px] space-y-1 text-[14px]">
              <li className="flex items-center gap-2">
                <Phone className="h-[14px] w-[14px] shrink-0" />
                <a href="tel:+912223012922" className="hover:text-white">(022) 23012922</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-[14px] w-[14px] shrink-0" />
                <a href="mailto:mhssce@yahoo.in" className="hover:text-white">mhssce@yahoo.in</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-[14px] w-[14px] shrink-0" />
                <a href="https://www.mhssce.ac.in" className="hover:text-white">www.mhssce.ac.in</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[20px] text-[18px] font-semibold text-white">Google Map</h4>
            <iframe
              title="M.H. Saboo Siddik College of Engineering location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.160671485052!2d72.82883621489951!3d18.968510287149652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce40ffcfcacd%3A0x5d71ff22760f8e77!2sM.H.+Saboo+Siddik+College+of+Engineering!5e0!3m2!1sen!2sin!4v1564735028613!5m2!1sen!2sin"
              className="h-[200px] w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div>
            <h4 className="mb-[20px] text-[18px] font-semibold text-white">Login</h4>
            <ul className="text-[14px]">
              {loginLinks.map((label) => (
                <li key={label} className="border-b border-dashed border-white/25 py-[7px] last:border-0">
                  <a
                    href="https://www.mhssce.ac.in/mhsadmin/admin.php"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-footer-bottom">
        <div className="mx-auto flex max-w-[1170px] flex-col items-center gap-3 px-4 py-[10px] md:flex-row md:justify-between">
          <p className="m-0 text-center text-[13px] md:text-left">
            Copyright ©2020 M.H. Saboo Siddik College Of Engineering. All Rights Reserved | Website design by{" "}
            <a href="http://www.hitechadvt.com/" target="_blank" rel="noreferrer" className="hover:text-white">
              Hitech Advertising
            </a>
          </p>
          <ul className="flex items-center gap-2">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/Aimhssce", label: "Facebook" },
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Youtube, href: "#", label: "YouTube" },
              { Icon: Instagram, href: "#", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
                >
                  <Icon className="h-[14px] w-[14px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}