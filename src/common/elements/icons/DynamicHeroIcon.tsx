import * as HeroIcons from '@heroicons/react/solid';
import * as HeroIconsOutline from '@heroicons/react/outline';

type IconName = keyof typeof HeroIcons;
interface IconProps {
  icon: IconName;
  solid?: boolean;
}

export const DynamicHeroIcon = ({ icon, solid = false }: IconProps) => {
  const SingleIcon = HeroIcons[icon];
  const SingleOutlineIcon = HeroIconsOutline[icon];

  if (solid) {
    return (
      <SingleIcon
        height={18}
        width={18}
        style={{ fill: 'rgba(0, 0, 0, 0.8' }}
      />
    );
  }

  return (
    <SingleOutlineIcon
      height={18}
      width={18}
      style={{ stroke: 'rgba(0, 0, 0, 0.8' }}
    />
  );
};

export default DynamicHeroIcon;
