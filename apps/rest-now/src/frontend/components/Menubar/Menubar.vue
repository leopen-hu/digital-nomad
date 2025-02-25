<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/frontend/components/ui/menubar'
import { menubarConfig, MenubarItem as IMenubarItem } from './menubar-config'
import { ref } from 'vue'

const menubarTriggers = ref(menubarConfig)
const createClick = (e: Event, item: IMenubarItem) => {
  item.click?.(e, item)
}
</script>

<template>
  <Menubar class="border-0">
    <MenubarMenu v-for="trigger in menubarTriggers">
      <MenubarTrigger>{{ trigger.label }}</MenubarTrigger>
      <MenubarContent>
        <template v-for="child in trigger.children">
          <MenubarSeparator v-if="child.separator" />
          <MenubarSub v-else-if="child.children?.length">
            <MenubarSubTrigger>{{ child.label }}</MenubarSubTrigger>
            <MenubarSubContent>
              <template v-for="subChild in child.children">
                <MenubarSeparator v-if="subChild.separator" />
                <MenubarItem v-else @click="(e: Event) => createClick(e, subChild)">
                  {{ subChild.label }}
                  <MenubarShortcut>{{ subChild.shortCut }}</MenubarShortcut>
                </MenubarItem>
              </template>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem v-else @click="(e: Event) => createClick(e, child)">
            {{ child.label }}
            <MenubarShortcut>{{ child.shortCut }}</MenubarShortcut>
          </MenubarItem>
        </template>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
