<template>
  <div class="loader">
    <div class="spinner" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  height: 4rem;
  position: relative;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 40px;
    width: 40px;
    margin: -20px 0 0 -20px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #56be8e;
    border-bottom-color: #56be8e;
    animation: spinner .8s ease infinite;
  }
  &.small {
    .spinner {
      height: 20px;
      width: 20px;
      margin: -10px 0 0 -10px;
    }
  }
}

@keyframes spinner {
  to { transform: rotate(180deg); }
}
</style>
