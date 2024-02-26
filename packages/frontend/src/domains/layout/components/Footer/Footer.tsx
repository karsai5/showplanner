const donateLink = 'https://ko-fi.com/linuskarsai';
export const Footer = () => {
  return (
    <footer className="footer p-6 bg-base-200 text-base-content">
      <div>
        <p>
          <span className="font-medium">Made by Linus Karsai</span>
          <br />
          Built in my spare time, mind the bugs!{' '}
        </p>
      </div>
      <div>
        <div>
          <p className="max-w-sm">
            If you&apos;re interested in supporting the ShowPlanner, consider{' '}
            <a className="link" href={donateLink}>
              donating to its upkeep
            </a>
            .
          </p>
        </div>
      </div>
      <div>
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
