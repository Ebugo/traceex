import Image from 'next/image';

const LoadingImage = () => {
  return (
    <Image
      src="/assets/icons/app-loading.svg"
      alt="Loading image"
      width="60"
      height="100"
      priority
    />
  );
};

export default LoadingImage;
