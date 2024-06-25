import Image from "next/image";
import Link from "next/link";

import imageSrc from "./500.png";

const NotFoundPage = () => {
  return (
    <div className="prose">
      <h1>Internal Server Error</h1>
      <p>
        Something went wrong, but we&apos;re not sure what. Please try again
        later.
      </p>
      <Link href="https://q2qcomics.com/">
        <Image src={imageSrc} alt="Cartoon from q2q" />
      </Link>
    </div>
  );
};
export default NotFoundPage;
