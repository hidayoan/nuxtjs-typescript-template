<template>
  <div>
    <a-config-provider :theme="config">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </a-config-provider>
  </div>
</template>

<script setup>
import config from '@/helpers/ant-theme-config'
</script>