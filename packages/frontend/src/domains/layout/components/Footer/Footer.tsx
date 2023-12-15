const donateLink = "https://ko-fi.com/linuskarsai";
export const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <p>
          <span className="font-medium">Made by Linus Karsai</span>
          <br />
          Built in his spare time, mind the bugs!{" "}
        </p>
        <p className="max-w-sm">
          If you&apos;re interested in supporting the ShowPlanner, consider{" "}
          <a className="link" href={donateLink}>
            donating to its upkeep
          </a>
          .
        </p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <a
          className="link link-hover"
          href="https://github.com/showplanner/showplanner"
        >
          Github
        </a>
        <a
          className="link link-hover"
          href="https://wiki.communitycrewing.com/index.php/ShowPlanner"
        >
          Wiki
        </a>
        <a className="link link-hover" href="https://discord.gg/RGMdwDSXXn">
          Discord
        </a>
      </div>
      <div>
        <span className="footer-title">Funds</span>
        <a href={donateLink} target="_blank" rel="noreferrer">
          <img
            height="36"
            className="h-9 border-0"
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </footer>
  );
};
