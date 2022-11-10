import {
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import DynamicHeroIcon from '../../../../elements/icons/DynamicHeroIcon';

interface QuickTaskItemProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  isLast?: boolean;
}

const QuickTaskItem: FC<QuickTaskItemProps> = ({
  title,
  icon,
  isLast = false,
  onClick,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton>
          <DynamicHeroIcon icon="ChevronRightIcon" />
        </IconButton>
      }
      sx={{
        cursor: 'pointer',
        borderRadius: '8px',
        pb: 1,
        mt: 1,
        ...(!isLast && { mb: 1 }),
        backgroundColor: (theme) => theme.palette.background.default
      }}
      onClick={onClick.bind(null)}
    >
      <ListItemIcon>{icon}</ListItemIcon>

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          fontSize: '0.875rem',
          lineHeight: '24px',
        }}
      />
    </ListItem>
  );
};

export default QuickTaskItem;
