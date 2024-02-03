import Image from "next/image";
import Link from "next/link";

import imageSrc from "./404.jpg";

const NotFoundPage = () => {
  return (
    <div className="prose">
      <h1>Page not found</h1>
      <p>
        Do you ever get the feeling you&apos;re not standing in your light? Well
        this is one of those moments! Unfortunately this page doesn&apos;t
        exist, but I&apos;m sure if you keep searching you&apos;ll find what
        you&apos;re looking for.
      </p>
      <Link href="https://q2qcomics.com/">
        <Image src={imageSrc} alt="Cartoon from q2q" />
      </Link>
    </div>
  );
};
export default NotFoundPage;
