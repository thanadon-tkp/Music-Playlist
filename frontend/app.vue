<script setup>
const colorMode = useColorMode();
colorMode.preference = "dark";
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
