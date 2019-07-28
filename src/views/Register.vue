<template>
  <main class="reg">
    <div class="error-message" v-show="displayErrors">
      <p>All fields are mandatory!</p>
    </div>

    <form name="reg" method="post" action="/submit" @submit.prevent="submit">
      <input type="hidden" name="important-name" v-model="regCheck" />
      <p style="display:none;">
        <label>Leave this field empty <input name="important-field"></label>
      </p>

      <div class="form-control">
        <label for="country">Country</label>
        <multiselect
          v-model="country"
          :options="countries"
          key="key"
          :tabindex="0"
          label="label"
          name="country"
          :show-labels="false"
          placeolder="Select a country">
          <span slot="noResult">No such country</span>
        </multiselect>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label>Firstname
          <input type="text"
            name="firstname"
            v-model="firstname"
            placeholder="John"
            required>
          </label>
        </div>
        <div class="form-control">
          <label>Surname
          <input type="text"
            name="surname"
            v-model="surname"
            placeholder="Smith"
            required>
          </label>
        </div>
      </div>

      <div class="form-control">
        <label>E-mail
        <input type="email"
          name="email"
          v-model="email"
          placeholder="john.smith@example.com"
          required>
        </label>
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
          :tabindex="0"
          track-by="symbol"
          :show-labels="false"
          placeolder="Your agerange">
          <span slot="noResult">No such age range</span>
        </multiselect>
      </div>

      <div class="form-control" v-if="applicableForProClass">
        <label for="pro">Pro</label>
        <checkbox v-model="pro" name="pro"/>
      </div>

      <div class="form-control">
        <label for="bow">Bow type</label>
        <multiselect
          v-model="bow"
          :options="filteredBowTypes"
          label="text"
          name="bow"
          :tabindex="0"
          track-by="text"
          :show-labels="false"
          placeolder="Your bow type">
          <span slot="noResult">No such bow type</span>
        </multiselect>
      </div>

      <div class="form-control">
        <label for="accommodation">Accommodation</label>
        <checkbox v-model="wantsAccommodation" name="accommodation"/>
      </div>

      <div class="form-control" v-if="wantsAccommodation">
        <label for="accomm">Room type</label>
        <multiselect
          v-model="accommodation"
          :options="roomTypes"
          label="name"
          name="accomm"
          :searchable="false"
          :tabindex="0"
          track-by="name"
          group-values="rooms"
          group-label="building"
          :group-select="false"
          :show-labels="false"
          placeolder="Room type">
          <template slot="option" slot-scope="props">
            <span v-if="props.option.$isLabel">{{ props.option.$groupLabel }}</span>
            <div v-else class="price-options">
              <span>{{ props.option.name }}</span>
              <span>- {{ props.option.price }}&euro;</span>
            </div>
          </template>
        </multiselect>
      </div>

      <div class="form-control">
        <label>Comment
          <textarea v-model="comment" class="textarea"></textarea>
        </label>
      </div>

      <button type="submit">Register</button>
    </form>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect'

import Checkbox from '@/components/Checkbox'
import {
  ageRanges,
  bowTypes,
  countries,
  roomTypes
} from '@/models'

const proBowClasses = bowTypes.filter(b => b.pro)
const proAgeClasses = ['A', 'S', 'V']

export default {
  name: 'register',
  data () {
    return {
      bowTypes,
      countries,
      ageRanges,
      roomTypes,
      country: '',
      comment: '',
      firstname: '',
      surname: '',
      email: '',
      gender: '',
      accommodation: null,
      age: '',
      pro: false,
      dob: new Date('10-07-1985'),
      bow: '',
      payment: false,
      regCheck: 'must-reg',
      wantsAccommodation: false,
      displayErrors: false
    }
  },
  components: { Multiselect, Checkbox },
  computed: {
    applicableForProClass () {
      return this.age && proAgeClasses.includes(this.age.symbol)
    },
    filteredBowTypes () {
      return this.pro ? proBowClasses : bowTypes
    }
  },
  methods: {
    submit (e) {
      this.displayErrors = false
      if (!this.validateFields()) return

      const ageGroupSymbol = this.pro ? 'P' : this.age.symbol
      const body = {
        formName: 'reg',
        check: this.regCheck,
        country: this.country.label,
        memberCode: this.country.key,
        firstname: this.firstname,
        surname: this.surname,
        email: this.email,
        gender: this.gender,
        age: this.age.label,
        bow: this.bow.text,
        // TODO: Add payment when Fienta succeeds
        payment: this.payment ? 'Yes' : 'No',
        comment: this.comment,
        room: `${this.accommodation.name} - ${this.accommodation.price}€`,
        class: `${ageGroupSymbol}${this.gender}${this.bow.symbol}`
      }
      console.log('Submitting:', body)

      const onLocalhost = window.location.hostname === 'localhost'
      const host = onLocalhost ? '' : '/.netlify/functions'
      fetch(`${host}/form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body
      }).then(() => {
        this.$router.push('/submit')
        console.log('Success!')
      }).catch(error => console.error(error))
    },
    validateFields () {
      const requiredFields = [
        this.country,
        this.firstname,
        this.surname,
        this.email,
        this.gender,
        this.age,
        this.bow
      ]
      const validForm = requiredFields
        .every(field => !!field || Object.keys(field || {}).length)
      if (!validForm) this.displayErrors = true

      return validForm
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
</style>
