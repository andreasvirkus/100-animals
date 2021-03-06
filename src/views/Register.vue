<template>
  <main class="reg">
    <p
      v-if="displayValidationError"
      class="error-message"
    >
      Fields with an <span class="color-red">*</span> are mandatory!
    </p>
    <p
      v-if="displayRoomError && accommodation"
      class="error-message"
    >
      We're sorry to inform you that the last <strong>{{ accommodation.name }}</strong> was just booked.
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
          for="country"
          class="mandatory"
        >Country</label>
        <multiselect
          key="key"
          v-model="country"
          :options="countries"
          :tabindex="0"
          label="label"
          name="country"
          :show-labels="false"
          placeolder="Select a country"
        >
          <span slot="noResult">No such country</span>
        </multiselect>
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
        <label
          class="mandatory"
          for="email"
        >E-mail</label>
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="john.smith@example.com"
          required
        >
      </div>

      <div class="form-control">
        <p class="mandatory">
          Gender
        </p>
        <label>
          <input
            v-model="gender"
            type="radio"
            name="gender"
            value="M"
          > Male</label>
        <label>
          <input
            v-model="gender"
            type="radio"
            name="gender"
            value="F"
          > Female</label>
      </div>

      <div
        v-if="false"
        class="form-control"
      >
        <label>Date of birth</label>
        <v-date-picker
          v-model="dob"
          mode="single"
          is-required
          :input-props="{
            placeholder: '25/12/1975',
            name: 'dob'
          }"
        />
      </div>

      <div class="form-control">
        <label class="mandatory">Age</label>
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

      <div
        v-if="applicableForProClass"
        class="form-control"
      >
        <label for="pro">Pro</label>
        <checkbox
          v-model="pro"
          name="pro"
        />
      </div>

      <div class="form-control">
        <label
          for="bow"
          class="mandatory"
        >Bow type</label>
        <multiselect
          v-model="bow"
          :options="filteredBowTypes"
          label="text"
          name="bow"
          :tabindex="0"
          track-by="text"
          :show-labels="false"
          placeolder="Your bow type"
        >
          <span slot="noResult">No such bow type</span>
        </multiselect>
      </div>

      <div class="form-control">
        <label for="accommodation">Accommodation</label>
        <checkbox
          v-model="wantsAccommodation"
          name="accommodation"
        />
      </div>

      <div
        v-if="wantsAccommodation"
        class="form-control"
      >
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
          placeolder="Room type"
        >
          <template
            slot="option"
            slot-scope="props"
          >
            <span v-if="props.option.$isLabel">{{ props.option.$groupLabel }}</span>
            <div
              v-else
              class="price-options"
            >
              <span>{{ (props.option || {}).name }}</span>
              <span>- {{ (props.option || {}).price }}&euro;</span>
            </div>
          </template>
        </multiselect>
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
        Register
      </button>
    </form>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect'

import { db } from '@/db'
import Checkbox from '@/components/Checkbox'
import {
  ageRanges,
  bowTypes,
  countries,
  roomTypes
} from '@/models'

const proBowClasses = bowTypes.filter(b => b.pro)
const proAgeClasses = ['A', 'S', 'V']
let roomQuantityMap = []

export default {
  name: 'Register',
  components: { Multiselect, Checkbox },
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
      accommodation: {},
      age: '',
      pro: false,
      dob: new Date('10-07-1985'),
      bow: '',
      payment: false,
      regCheck: 'must-reg',
      wantsAccommodation: false,
      displayRoomError: false,
      displayValidationError: false
    }
  },
  computed: {
    applicableForProClass () {
      return this.age && proAgeClasses.includes(this.age.symbol)
    },
    filteredBowTypes () {
      return this.pro ? proBowClasses : bowTypes
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
  created () {
    this.loadRoomQuantity()
  },
  methods: {
    async submit () {
      this.displayRoomError = false
      this.displayValidationError = false
      if (!this.validateFields()) return

      const ageGroupSymbol = this.pro ? 'P' : this.age.symbol
      const room = (this.wantsAccommodation && this.accommodation)
        ? `${this.accommodation.name} - ${this.accommodation.price}€`
        : ''

      // Check selected room availability
      if (room) {
        await this.loadRoomQuantity()
        console.log('quantityMap', roomQuantityMap)
        const selectedRoom = roomQuantityMap.find(r => r.code === this.accommodation.code)
        console.log('selected', selectedRoom)
        if (!selectedRoom || selectedRoom.quantity < 1) {
          this.displayRoomError = true
          return
        }
      }

      const data = {
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
        room,
        class: `${ageGroupSymbol}${this.gender}${this.bow.symbol}`
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
        if (room) this.reduceAvailability(this.accommodation.code, this.accommodation.quantity)
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
      if (!validForm) this.displayValidationError = true

      return validForm
    },
    async loadRoomQuantity () {
      const snapshot = await db.collection('rooms').get()
      snapshot.forEach(doc => this.mapAvailability(doc.data()))
    },
    mapAvailability (mapping) {
      this.roomTypes.forEach(building => {
        building.rooms = building.rooms
          .map(room => ({
            ...room,
            quantity: mapping[room.code]
          }))
          .filter(room => room.quantity > 0)
      })
      roomQuantityMap = roomTypes
        .map(building => building.rooms.map(room => ({
          ...room,
          quantity: mapping[room.code]
        }))).flat()
    },
    reduceAvailability (roomCode, quantity) {
      db.collection('rooms')
        .doc('availability-map')
        .update({ [roomCode]: --quantity })
        .then(() => {
          console.log('room updated!')
          this.loadRoomQuantity()
        })
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
