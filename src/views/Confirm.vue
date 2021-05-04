<template>
  <main class="reg">
    <p
      v-if="displayValidationError"
      class="error-message"
    >
      Fields with an <span class="color-red">*</span> are mandatory!
    </p>

    <form
      name="reg"
      method="post"
      action="/submit"
      @submit.prevent="submit"
    >
      <input
        v-model="regCheck"
        type="hidden"
        name="important-name"
      >
      <p style="display:none;">
        <label>Leave this field empty <input name="important-field"></label>
      </p>

      <div class="form-control">
        <label
          class="mandatory"
          for="regNumber"
        >Registration No.</label>
        <input
          v-model="regNumber"
          type="number"
          max="9999"
          min="1"
          step="1"
          name="regNumber"
          placeholder="####"
          required
        >
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label
            class="mandatory"
            for="firstname"
          >Firstname</label>
          <input
            v-model="firstname"
            type="text"
            name="firstname"
            placeholder="John"
            required
          >
        </div>
        <div class="form-control">
          <label
            class="mandatory"
            for="surname"
          >Surname</label>
          <input
            v-model="surname"
            type="text"
            name="surname"
            placeholder="Smith"
            required
          >
        </div>
      </div>

      <div class="form-control">
        <label class="mandatory">Age class on 5th of August 2022</label>
        <multiselect
          v-model="age"
          :options="ageRanges"
          label="label"
          name="age"
          :tabindex="0"
          track-by="symbol"
          :show-labels="false"
          placeolder="Your agerange"
        >
          <span slot="noResult">No such age range</span>
        </multiselect>
      </div>

      <div class="form-control">
        <label for="">WFAC participation on August 5-13, 2022</label>
        <label>
          <input
            v-model="participating"
            type="radio"
            name="participation"
            value="YES"
          > Yes
        </label>
        <label>
          <input
            v-model="participating"
            type="radio"
            name="participation"
            value="NO"
          > No
        </label>
      </div>

      <div class="form-control">
        <label>Comment
          <textarea
            v-model="comment"
            class="textarea"
          />
        </label>
      </div>

      <button type="submit">
        Confirm
      </button>
    </form>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { ageRanges } from '@/models'

export default {
  name: 'Confirm',
  components: { Multiselect },
  data () {
    return {
      ageRanges,
      comment: '',
      firstname: '',
      surname: '',
      age: '',
      regCheck: 'must-reg',
      regNumber: undefined,
      participating: false,
      displayValidationError: false
    }
  },
  watch: {
    displayValidationError (state) {
      if (state) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  },
  methods: {
    async submit () {
      this.displayValidationError = false
      if (!this.validateFields()) return

      const data = {
        renew: true,
        formName: 'confirm',
        check: this.regCheck,
        regNumber: this.regNumber,
        firstname: this.firstname,
        surname: this.surname,
        age: this.age.label,
        participation: this.participating,
        comment: this.comment,
      }
      const body = JSON.stringify(data)
      console.log('Submitting:', data, body)

      fetch(`/.netlify/functions/form`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body
      }).then(async () => {
        this.$router.push('/submit')
        console.log('Success!')
      }).catch(error => console.error(error))
    },
    validateFields () {
      const requiredFields = [
        this.regNumber,
        this.firstname,
        this.surname,
        this.age,
        this.participating,
      ]
      const validForm = requiredFields.every(Boolean)
      if (!validForm) this.displayValidationError = true

      return validForm
    },
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
main.reg {
  max-width: 30rem;
  margin: 1rem auto;
}

form > * {
  margin-top: 1.25rem;
}

label {
  display: block;
  flex-basis: 100%;
  cursor: pointer;

  + label {
    margin-top: 10px;
  }
}
.form-control-group {
  flex-wrap: wrap;
}
textarea {
  resize: vertical;
}

input[type="text"],
input[type="number"],
textarea {
  border-color: #e8e8e8;
}

input[type="text"],
input[type="email"],
input[type="number"] {
  display: block;
  appearance: none;
  width: 100%;
  padding: 10px;
  line-height: 20px;
  font-size: 16px;
  font-weight: inherit;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
}

.multiselect input[type="text"],
.multiselect input[type="text"]:focus {
  border: none;
  margin-bottom: 0;
  padding: 0 0 0 .5rem;
}

input[type="radio"] {
  appearance: none;
  margin: 0 .5rem;
  width: 1rem;
  height: 1rem;
  background: #eee;
  box-shadow: inset 0 0 0 .4em white,
    0 0 0 .2em #999;
  border-radius: 50%;
  transition: .2s;
  cursor: pointer;
  color: #363945;

  &:hover,
  &:checked {
    background: #999;
    box-shadow: inset 0 0 0 .5em white,
      0 0 0 .2em #999;
  }

  &:checked {
    background: #56be8e;
    box-shadow: inset 0 0 0 .4em white,
      0 0 0 .2em #56be8e;
  }

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 0.4em white,
      0 0 0 0.2em #4caf50;
  }
}

button[type="submit"] {
  &:focus {
    border-color: #4caf50;
  }
}

.price-options {
  display: flex;
  justify-content: space-between;
}
.textarea {
  resize: vertical;
  max-height: 10rem;
}
.color-red {
  color: red;
}
.mandatory {
  position: relative;

  &::after {
    content: '*';
    display: inline-block;
    padding-left: 2px;
    color: red;
  }
}
.error-message {
  background-color: #FFF6D9;
  color: rgba(0,0,0,0.6);
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1rem;
}
</style>
