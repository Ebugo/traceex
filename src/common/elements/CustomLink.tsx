import NextLink from 'next/link';
import { Link as MUILink, TypographyProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface CustomLinkProps {
  href: string;
  variant?: TypographyProps['variant'];
  underline?: 'none' | 'hover' | 'always';
  color?: TypographyProps['color'];
  children: ReactNode;
}

const CustomLink: FC<CustomLinkProps> = ({
  href = '',
  variant = 'body1',
  underline = 'none',
  color = 'dark',
  children,
}) => {
  return (
    <NextLink href={href} passHref>
      <MUILink variant={variant} underline={underline} color={color}>
        {children}
      </MUILink>
    </NextLink>
  );
};

export default CustomLink;
