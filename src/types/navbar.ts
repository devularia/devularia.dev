export interface NavItemProps {
  to: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}