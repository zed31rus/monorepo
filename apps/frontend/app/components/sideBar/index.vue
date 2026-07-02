<script setup lang="ts">
import type { SideBarPages } from '~/types/sideBar';

    const pages: SideBarPages[] = [
        { id: 1, name: "Home", path: "/", ico: "material-symbols:home-rounded", position: "top" },
        //{ id: 2, name: "Soundpad", path: "/soundpad", ico: "material-symbols:library-music", position: "top" },
        //{ id: 3, name: "Account", path: "/auth", ico: "mdi:account", position: "bottom" }
    ];

</script>

<template>
    <SideBarVariantsMobile :pages="pages" v-if="$device.isMobile"/>
    <SideBarVariantsDesktop :pages="pages" v-else/>
</template>