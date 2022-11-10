import {
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { FC } from 'react';
import DynamicHeroIcon from '../../../../elements/icons/DynamicHeroIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface OnboardingStepsItemProps {
  title: string;
  subtitle: string;
  completed?: boolean;
  fetchingBusinessMetrics?: boolean;
  onClick: () => void;
}

const OnboardingStepsItem: FC<OnboardingStepsItemProps> = ({
  title,
  subtitle,
  completed = false,
  fetchingBusinessMetrics = false,
  onClick,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton>
          <DynamicHeroIcon icon="XIcon" />
        </IconButton>
      }
      sx={{
        cursor: 'pointer',
        pb: 1,
        mb: 1,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '8px',
        pointerEvents: completed || fetchingBusinessMetrics ? 'none' : 'all',
      }}
      onClick={onClick.bind(null)}
    >
      {/* <ListItemIcon>
        {fetchingBusinessMetrics ? (
          <CircularProgress size={24} />
        ) : (
          <>
            {completed ? (
              <CheckCircleIcon
                sx={{
                  color: '#F9A31B',
                  pointerEvents: 'none',
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                sx={{
                  color: '#D9DBE1',
                  pointerEvents: 'none',
                }}
              />
            )}
          </>
        )}
      </ListItemIcon> */}

      <ListItemText
        primary={title}
        secondary={subtitle}
        primaryTypographyProps={{
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: '24px',
          pb: 1,
          color: (theme)=>theme.palette.success.light
        }}
        secondaryTypographyProps={{
          fontSize: '0.75rem',
          lineHeight: '24px',
          fontWeight: 400,
        }}
      />
    </ListItem>
  );
};

export default OnboardingStepsItem;
