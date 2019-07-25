<template>
  <main class="reg">
    <!-- <h1>Register</h1> -->
    <form name="reg" method="post" action="/submit" @submit.prevent="submit">
      <input type="hidden" name="form-name" value="reg" />
      <p style="display:none;">
        <label>Leave this field empty <input name="bot-field"></label>
      </p>

      <div class="form-control">
        <label>Country
        <multiselect
          v-model="country"
          :options="countries"
          key="key"
          label="label"
          name="country"
          :closeOnSelect="true"
          placeolder="Select a country">
          <span slot="noResult">No such country</span>
        </multiselect>
        </label>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label>Firstname
          <input type="text" name="firstname" v-model="firstname" placeholder="John">
          </label>
        </div>
        <div class="form-control">
          <label>Surname
          <input type="text" name="surname" v-model="surname" placeholder="Smith">
          </label>
        </div>
      </div>

      <div class="form-control">
        <p>Gender</p>
        <label>
          <input type="radio"
            v-model="gender"
            name="gender"
            value="M"> Male</label>
        <label>
          <input type="radio"
            v-model="gender"
            name="gender"
            value="F"> Female</label>
      </div>

      <div class="form-control" v-if="false">
        <label>Date of birth</label>
        <v-date-picker v-model="dob"
          mode="single"
          is-required
          :input-props="{
            placeholder: '25/12/1975',
            name: 'dob'
          }"/>
      </div>

      <div class="form-control">
        <label>Age</label>
        <multiselect
          v-model="age"
          :options="ageRanges"
          label="label"
          name="age"
          track-by="symbol"
          placeolder="Your agerange">
          <span slot="noResult">No such age range</span>
        </multiselect>
      </div>

      <div class="form-control" v-if="applicableForProClass">
        <label for="checkbox">Pro</label>
        <checkbox v-model="pro" id="checkbox" name="checkbox"/>
      </div>

      <div class="form-control">
        <label>Bow type
        <multiselect
          v-model="bow"
          :options="bowTypes"
          label="text"
          name="bow"
          track-by="text"
          :closeOnSelect="true"
          placeolder="Your bow type">
          <span slot="noResult">No such bow type</span>
        </multiselect>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect'

import Checkbox from '@/components/Checkbox'
import { ageRanges, bowTypes, countries } from '@/models'

const proAgeClasses = ['A', 'S', 'V']
const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default {
  name: 'register',
  data () {
    return {
      bowTypes,
      countries,
      ageRanges,
      country: '',
      firstname: '',
      surname: '',
      gender: '',
      age: '',
      pro: false,
      dob: new Date('10-07-1985'),
      bow: '',
      payment: false
    }
  },
  components: { Multiselect, Checkbox },
  computed: {
    applicableForProClass () {
      return this.age && proAgeClasses.includes(this.age.symbol)
    }
  },
  methods: {
    submit (e) {
      const ageGroupSymbol = this.pro ? 'P' : this.age.symbol
      const data = {
        'form-name': 'reg',
        country: this.country.key,
        firstname: this.firstname,
        surname: this.surname,
        gender: this.gender,
        age: this.age.label,
        bow: this.bow.text,
        payment: this.payment ? 'Yes' : 'No',
        class: `${ageGroupSymbol}${this.gender}${this.bow.symbol}`
      }
      console.log('Submitting:', data)
      fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      }).then(() => {
        this.$router.push('/submit')
        console.log('Success!')
      }).catch(error => console.error(error))
    }
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
    margin-bottom: 1rem;
    cursor: pointer;
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
  input[type="number"], {
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

    &:focus { outline: 0; }
  }
</style>
