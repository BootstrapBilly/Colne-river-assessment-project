import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/solid';
import { Section } from '../../components/layout/section';

export const Contact = () => {
  return (
    <Section className="mx-4 mt-4 flex flex-col p-4 sm:mx-0">
      <h1 className="text-4xl font-bold">Get in touch</h1>
      <div className="mt-8 space-y-4 lg:flex lg:gap-4 lg:space-y-0">
        <ContactItem
          Icon={EnvelopeIcon}
          label="Email Address"
          link={{
            href: 'mailto:rmwfer@essex.ac.uk',
            text: 'rmwfer@essex.ac.uk',
          }}
        />
        <ContactItem
          Icon={UserIcon}
          label="About Rob"
          link={{
            href: 'https://www.essex.ac.uk/people/FERGU10501/Robert-Ferguson',
            text: 'View university profile',
          }}
        />
      </div>
      <img
        className="mt-8 hidden h-[30rem] object-cover lg:flex 2xl:h-[50rem]"
        src={'wivenhoe.jpg'}
        alt="Wivenhoe river colne"
      />
    </Section>
  );
};

interface ContactItemProps {
  link: {
    href: string;
    text: string;
  };
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const ContactItem = ({ link, Icon, label }: ContactItemProps) => {
  return (
    <div className="bg-gray-100/50 p-6 lg:flex lg:items-center lg:gap-x-6">
      <div className="flex items-center gap-x-2 text-xl font-bold">
        <Icon className="h-5 lg:h-6" />
        <p>{label}</p>
      </div>
      <div className="mt-2 lg:mt-0">
        <a className="text-gray-400 hover:underline" href={link.href}>
          {link.text}
        </a>
      </div>
    </div>
  );
};
