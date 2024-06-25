import {
  ArrowTopRightOnSquareIcon,
  BugAntIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";
import { getFeedback } from "@sentry/browser";
import { OutboundLink } from "core/components/links";

const donateLink = "https://ko-fi.com/linuskarsai";

export const Footer = () => {
  return (
    <footer className="footer p-6 bg-base-200 text-base-content sticky left-0">
      <div>
        <p>
          <span className="font-medium">Made by Linus Karsai</span>
          <br />
          Built in my spare time, mind the bugs!
        </p>
        <FeedbackButton />
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
      <div></div>
    </footer>
  );
};

const FeedbackButton: React.FC = () => {
  const feedback = getFeedback();
  if (!feedback) {
    return null;
  }
  return (
    <button
      className="btn bg-slate-300 cursor-pointer"
      onClick={async () => {
        const form = await feedback.createForm();
        form.appendToDom();
        form.open();
      }}
    >
      <BugAntIcon className="w-6 h-6 " />
      Report a bug
    </button>
  );
};

export const DonateButton: React.FC = () => {
  return (
    <a
      className="btn bg-slate-300"
      href={donateLink}
      target="_blank"
      rel="noreferrer"
    >
      <CakeIcon className="w-6 h-6" />
      Buy me a coffee
      <ArrowTopRightOnSquareIcon className="w-3 h-3" />
    </a>
  );
};
