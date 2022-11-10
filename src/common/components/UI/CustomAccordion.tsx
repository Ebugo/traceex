import { Box, Fade, Grid, Typography } from '@mui/material';
import { useState, FC, ReactNode, CSSProperties } from 'react';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

interface CustomAccordionProps {
  isExpanded?: boolean;
  title: string | ReactNode;
  children?: ReactNode;
  noBorderRadius?: boolean;
  noInlineBorder?: boolean;
  noBlockBorder?: boolean;
  padding?: CSSProperties['padding'];
}

const CustomAccordion: FC<CustomAccordionProps> = ({
  isExpanded = true,
  title = '',
  children,
  noBorderRadius = false,
  noInlineBorder = false,
  noBlockBorder = false,
  padding = '18px',
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <Grid
      container
      sx={{
        ...(!noInlineBorder && { borderInline: '1px solid #D9DBE1' }),
        ...(!noBlockBorder && { borderBlock: '1px solid #D9DBE1' }),
        ...(!noBorderRadius && {
          borderRadius: (theme) => theme.custom.borderRadius,
        }),
        paddingBlock: 'unset',
        padding,
      }}
      mt={2}
    >
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        {typeof title === 'string' ? (
          <Typography variant="details">{title}</Typography>
        ) : (
          <>{title}</>
        )}

        <ExpandLessOutlinedIcon
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontSize: '18px',
            ...(!expanded && { transform: 'rotate(180deg)' }),
          }}
        />
      </Grid>

      {expanded && (
        <Fade in={expanded}>
          <Box sx={{ width: '100%' }}>{children}</Box>
        </Fade>
      )}
    </Grid>
  );
};

export default CustomAccordion;
