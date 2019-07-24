<template>
  <div class="app-container">
    <!-- <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reg">Register</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #223;
}
.nav {
  padding: 30px;
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  width: 25rem;
  max-width: 95%;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.hidden-visually {
  pointer-events: none;
  position: fixed;
  opacity: 0;
  top: -10vh;
}
.f-center {
  display: flex;
  align-items: center;
}
</style>
