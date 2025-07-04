import React from 'react'
import { ReactComponent as LogoIcon } from 'shared/assets/icons/logo.svg'
import { ReactComponent as userIcon } from 'shared/assets/icons/user.svg'

export enum IconName {
  LogoIcon,
  userIcon,
}

const iconsMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [IconName.LogoIcon]: LogoIcon,
  [IconName.userIcon]: userIcon,
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
