import { OutboundLink } from "core/components/links";
import Image from "next/image";

const donateLink = "https://ko-fi.com/linuskarsai";

export const Footer = () => {
  return (
    <footer className="footer p-6 bg-base-200 text-base-content sticky left-0">
      <div>
        <p>
          <span className="font-medium">Made by Linus Karsai</span>
          <br />
          Built in my spare time, mind the bugs! <br />
          If you do find a{" "}
          <OutboundLink href="https://forum.showplanner.io/c/bugs/5">
            bug
          </OutboundLink>{" "}
          or have an{" "}
          <OutboundLink href="https://forum.showplanner.io/c/feature-ideas/6">
            idea
          </OutboundLink>{" "}
          a feature, make a post about it on the{" "}
          <OutboundLink href="https://forum.showplanner.io/">
            forum
          </OutboundLink>
        </p>
      </div>
      <div>
        <div>
          <p className="max-w-sm">
            If you&apos;re interested in supporting the ShowPlanner, consider{" "}
            <OutboundLink href={donateLink}>
              donating to its upkeep
            </OutboundLink>
            . The server this site runs on costs $28 a month.
          </p>
        </div>
      </div>
      <div>
        <a href={donateLink} target="_blank" rel="noreferrer">
          <Image
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
            height="36"
            width="141"
          />
        </a>
      </div>
    </footer>
  );
};
