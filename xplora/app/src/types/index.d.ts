export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
  }

export type MainNavItem = NavItem

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}
