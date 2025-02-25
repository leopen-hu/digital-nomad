import { MenubarItem, MenubarTrigger } from "./menubar-config"

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
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          console.log('close', e, item)
        },
      },
    ],
  },
  {
    id: 'reference',
    label: 'Reference',
    disabled: false,
    children: [
      {
        id: 'github',
        label: 'Github',
        parentId: 'reference',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          console.log('close', e, item)
        },
      },
      {
        id: 'docs',
        label: 'Docs',
        parentId: 'reference',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          console.log('close', e, item)
        },
      },
      {
        separator: true,
      },
      {
        id: 'zhihu',
        label: 'Zhihu',
        parentId: 'reference',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          console.log('close', e, item)
        },
      },
      {
        id: 'blog',
        label: "Leopen's Blog",
        parentId: 'reference',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          console.log('close', e, item)
        },
      },
      {
        id: 'others',
        label: 'Others',
        parentId: 'reference',
        separator: false,
        disabled: false,
        click: (e: Event, item: MenubarItem) => {
          console.log('close', e, item)
        },
        children: [
          {
            id: 'others-1',
            label: 'Others-1',
            parentId: 'others',
            separator: false,
            disabled: false,
            click: (e: Event, item: MenubarItem) => {
              console.log('close', e, item)
            },
          },
          { separator: true },
          {
            id: 'others-2',
            label: 'Others-2',
            parentId: 'others',
            separator: false,
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    id: 'tools',
    label: 'Developer',
    disabled: false,
    click: (e: Event) => {
      console.log('edit', e)
    },
    children: [
      {
        id: 'devtools',
        label: 'DevTools',
        parentId: 'tools',
        separator: false,
        disabled: false,
        click: (e: Event) => {
          console.log('devtools', e)
        },
      },
      {
        id: 'reload',
        label: 'Reload',
        parentId: 'tools',
        separator: false,
        disabled: false,
        click: (e: Event) => {
          console.log('reload', e)
        },
      },
    ],
  },
]
