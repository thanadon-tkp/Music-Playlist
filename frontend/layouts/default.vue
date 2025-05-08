<script setup></script>

<template>
  <div id="default-layout">
    <Navbar class="card-content" />
    <main class="card-content overflow-y-auto p-4">
      <slot />
    </main>
    <Footer class="col-span-2" />
  </div>
</template>

<style>
#default-layout {
  display: grid;
  width: 100%;
  height: 100dvb;
  padding: 8px;
  gap: 8px;
  grid-template-areas:
    "head head"
    "nav  main"
    ".  foot";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  --height-content: calc(100dvh - 88px);
}
.card-content {
  height: var(--height-content);
  border-radius: 8px;
  background-color: #121212;
}
</style>
