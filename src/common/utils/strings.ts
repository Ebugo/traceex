export const copyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  }

  return document.execCommand('copy', true, text);
};

export const getSocialMediaUserName = (url: string) => {
  return url ? url.split('/').at(-1) : '';
};

export const removeProtocol = (url: string) => {
  if (!url) {
    return '';
  }
  return url.split('https://')[1];
};

export const createSocialMediaUrl = (
  username: string,
  socialMedia: 'twitter' | 'instagram' | 'facebook'
) => {
  const trimmedUsername = username?.trim();

  if (!trimmedUsername) {
    return '';
  }

  switch (socialMedia) {
    case 'twitter':
      return `https://twitter.com/${trimmedUsername}`;

    case 'instagram':
      return `https://instagram.com/${trimmedUsername}`;

    case 'facebook':
      return `https://facebook.com/${trimmedUsername}`;

    default:
      return '';
  }
};

export const joinStrings = (...args: string[]) => {
  return args
    .filter((item) => item)
    .join(' ')
    .trim();
};

export const getFileTypeFromMime = (
  mime: string
): 'img' | 'pdf' | undefined => {
  const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png'];
  const FORMAT_PDF = ['pdf'];

  if (!mime) {
    return undefined;
  }
  // TODO: Add more mimes when needed
  const type: string = mime.split('/').pop() ?? '';

  if (FORMAT_IMG.includes(type)) {
    return 'img';
  } else if (FORMAT_PDF.includes(type)) {
    return 'pdf';
  }
};

export const trimmedFileName = (fileName: string) => {
  if (!fileName) {
    return '';
  }

  if (fileName.length > 30) {
    return '...' + fileName.slice(-30);
  }

  return fileName;
};

export const sentenceCase = (sentence: string) => {
  if (!sentence) {
    return '';
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
};

export const formatAsMoney = (value: number, hideCurrency = false) => {
  return new Intl.NumberFormat('en-GB', {
    ...(!hideCurrency && {
      style: 'currency',
      currency: 'NGN',
    }),
    minimumSignificantDigits: value > 0 ? 2 : 1,
  }).format(value);
};

export const removeEmptyString = <T>(values: T) => {
  const parsedObject: T = {} as T;

  for (const [key, value] of Object.entries(values)) {
    if ([''].includes(value)) {
      continue;
    }

    parsedObject[key as keyof T] = value;
  }

  return parsedObject;
};

export const titleCase = (sentence: string, removeUnderscores = false) => {
  if (!sentence) {
    return '';
  }

  const transformedSentence = removeUnderscores
    ? sentence.replaceAll('_', ' ')
    : sentence;

  return transformedSentence
    .split(' ')
    .map((word) => sentenceCase(word))
    .join(' ');
};
