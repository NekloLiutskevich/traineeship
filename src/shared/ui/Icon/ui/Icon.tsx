import React from 'react'
import { ReactComponent as logoIcon } from 'shared/assets/icons/logo.svg'
import { ReactComponent as userIcon } from 'shared/assets/icons/user.svg'
import { ReactComponent as loadingIcon } from 'shared/assets/icons/loader.svg'

export enum IconName {
  logoIcon,
  userIcon,
  loadingIcon,
}

const iconsMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [IconName.logoIcon]: logoIcon,
  [IconName.userIcon]: userIcon,
  [IconName.loadingIcon]: loadingIcon,
}

type IconProps = {
  icon: IconName
  className?: string
  width?: string
  height?: string
  onClick?: () => void
}

export const Icon: React.FC<IconProps> = ({ icon, className, width, height, onClick }) => {
  const SvgIcon = iconsMap[icon]

  return (
    <SvgIcon
      width={width ?? '100%'}
      height={height}
      className={className}
      onClick={onClick}
      aria-hidden='true'
    />
  )
}
