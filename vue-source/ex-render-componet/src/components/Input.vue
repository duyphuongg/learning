<template>
  <div>
    <label for="">{{ input.label }}</label>
    <input type="text" :name="input.name" :id="input.id" :placeholder="input.placeholder">
  </div>
</template>

<script>

export default {
  props : ['input']
}
</script>