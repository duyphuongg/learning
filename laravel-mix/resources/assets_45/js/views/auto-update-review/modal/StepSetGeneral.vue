<template>
  <div class="step-set-general">
    <setting-import
      :is_show_modal="true"
    />
  </div>
</template>

<script>
import SettingImport from './../setting-import-review';

export default {
  components: {
    'setting-import': SettingImport
  }
}
</script>

<style>

</style>