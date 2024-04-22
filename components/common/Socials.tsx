import { Button, Image, Link } from "@nextui-org/react";
import { MailIcon } from "lucide-react";
import React from "react";

interface SocialsInterface {
  instagram: string;
  facebook: string;
  twitter: string;
  mail?: string;
  whatsapp?: string;
}

const Socials: React.FC<SocialsInterface> = ({
  instagram,
  facebook,
  twitter,
  mail,
  whatsapp,
}) => {
  return (
    <div className="space-x-4">
      {instagram && (
        <Button
          size="sm"
          variant="light"
          isIconOnly
          as={Link}
          href={instagram}
          target="_blank"
        >
          <Image width={24} src="/socials/instagram.svg" />
        </Button>
      )}
      {facebook && (
        <Button
          size="sm"
          variant="light"
          isIconOnly
          as={Link}
          href={facebook}
          target="_blank"
        >
          <Image width={24} src="/socials/facebook.svg" />
        </Button>
      )}
      {twitter && (
        <Button
          size="sm"
          variant="light"
          isIconOnly
          as={Link}
          href={twitter}
          target="_blank"
        >
          <Image width={24} src="/socials/twitter.svg" />
        </Button>
      )}
      {whatsapp && (
        <Button
          size="sm"
          variant="light"
          isIconOnly
          as={Link}
          href={whatsapp}
          target="_blank"
        >
          <Image width={24} src="/socials/whatsapp.svg" />
        </Button>
      )}
      {mail && (
        <Button isIconOnly variant="light" as={Link} href={`mailto:${mail}`}>
          <MailIcon size={24} />
        </Button>
      )}
    </div>
  );
};

export default Socials;
