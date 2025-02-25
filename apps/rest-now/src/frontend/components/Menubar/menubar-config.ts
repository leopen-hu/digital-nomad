export interface MenubarSeparator {
  separator: true
}

export interface MenubarItem {
  id: string
  label: string
  shortCut?: string
  parentId: string
  disabled?: boolean
  icon?: string
  click?: (e: Event, item: MenubarItem) => void
  children?: (MenubarItem | MenubarSeparator)[]
  separator: false
}

export interface MenubarTrigger {
  id: string
  label: string
  disabled?: boolean
  click?: (e: Event, item: MenubarItem) => void
  children?: (MenubarItem | MenubarSeparator)[]
}

export const menubarConfig: MenubarTrigger[] = [
  {
    id: 'action',
    label: 'Action',
    disabled: false,
    children: [
      {
        id: 'exit',
        label: 'Exit',
        parentId: 'action',
        separator: false,
        shortCut: 'ALT+F4',
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          window.menuApi.closeApp()
        },
      },
    ],
  },
  {
    id: 'tools',
    label: 'Dev',
    disabled: false,
    children: [
      {
        id: 'devtools',
        label: 'DevTools',
        parentId: 'tools',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          window.menuApi.toggleDevTools()
        },
      },
      {
        id: 'reload',
        label: 'Reload',
        parentId: 'tools',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          window.menuApi.reload()
        },
      },
      {
        id: 'force-reload',
        label: 'Force Reload',
        parentId: 'tools',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          window.menuApi.forceReload()
        },
      },
    ],
  },
]
