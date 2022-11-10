import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/assets/logo.svg"
      alt="Ricive Logo"
      width="153"
      height="40"
      priority
    />
  );
};

export default Logo;
