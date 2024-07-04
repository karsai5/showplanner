import Image from "next/image";
import Link from "next/link";

import imageSrc from "./401.png";

const NotFoundPage = () => {
  return (
    <div className="prose">
      <h1>Not Authorised</h1>
      <p>You don&apos;t have permission to access that page</p>
      <Link href="https://q2qcomics.com/">
        <Image src={imageSrc} alt="Cartoon from q2q" />
      </Link>
    </div>
  );
};
export default NotFoundPage;
