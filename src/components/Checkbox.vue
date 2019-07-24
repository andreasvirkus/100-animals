<template>
  <label
    class="checkbox__label"
    :class="{ 'checkbox__label--disabled': disabled }">
    <input type="checkbox"
      :id="id"
      :name="name"
      :required="required"
      class="checkbox hidden-visually"
      v-model="val"
      :disabled="disabled">
    <svg
      class="checkbox__svg"
      width="18px"
      height="18px"
      viewBox="0 0 18 18">
      <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
      <polyline points="1 9 7 14 15 4"></polyline>
    </svg>
  </label>
</template>

<script>
export default {
  name: 'checkbox',
  data () {
    return {
      val: this.value
    }
  },
  props: {
    id: String,
    name: String,
    value: Boolean,
    required: Boolean,
    disabled: Boolean
  },
  watch: {
    val () {
      this.$emit('input', this.val)
    },
    value () {
      if (this.val !== this.value) {
        this.val = this.value
      }
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  &__label {
    display: inline-block;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 25%;
      background: rgba(34,50,84,0.03);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &--disabled {
      cursor: not-allowed;
    }

    &:not(.checkbox__label--disabled):hover,
    &:focus-within {
      &::before {
        opacity: 1;
      }
      .checkbox__svg {
        stroke: #56be8e;
      }
    }
  }
  &__svg {
    position: relative;
    z-index: 1;
    margin: .5rem;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #c8ccd4;
    stroke-width: 1.5;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;

    path {
      stroke-dasharray: 60;
      stroke-dashoffset: 0;
      transition: all 0.3s linear;
    }
    polyline {
      stroke-dasharray: 22;
      stroke-dashoffset: 66;
      transition: all 0.2s linear;
    }
  }
  &:checked {
    + .checkbox__svg {
      stroke: #56be8e;

      path {
        stroke-dashoffset: 60;
      }
      polyline {
        stroke-dashoffset: 42;
        transition-delay: 0.15s;
      }
    }
  }
}
</style>
