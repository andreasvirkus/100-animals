<template>
  <main class="home">
    <form name="reg" method="post" action="/submit">
      <input type="hidden" name="form-name" value="reg" />
      <p style="display:none;">
        <label>Leave this field empty <input name="bot-field"></label>
      </p>

      <div class="form-control">
        <label>Country</label>
        <select v-model="country" name="country">
          <option disabled selected value>Pick a country</option>
          <option v-for="country in countries" :key="country.name" :value="country.name">{{ country.name }}</option>
        </select>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label>Firstname</label>
          <input type="text" name="firstname" v-model="firstname" placeholder="John">
        </div>
        <div class="form-control">
          <label>Surname</label>
          <input type="text" name="surname" v-model="surname" placeholder="Smith">
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label>Gender</label>
          <input type="radio" name="gender" value="male"> Male
        </div>
        <div class="form-control">
          <label>Gender</label>
          <input type="radio" name="gender" value="female"> Female
        </div>
      </div>

      <div class="form-control">
        <label>Age</label>
        <select v-model="age" name="age">
          <option disabled selected value>Your age range</option>
          <option v-for="age in ageRanges" :key="age.symbol" :value="age.symbol">{{ age.text }}</option>
        </select>
      </div>

      <div class="form-control">
        <label>Bow type</label>
        <select v-model="bow" name="bow">
          <option disabled selected value>Your bow type</option>
          <option v-for="bow in bowTypes" :key="bow.symbol" :value="bow.symbol">{{ bow.text }}</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<script>
const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

// TODO: Submit via ajax, add class from age, gender, bow
export default {
  name: 'home',
  data () {
    return {
      countries: [],
      country: '',
      firstname: '',
      surname: '',
      gender: '',
      age: '',
      bow: '',
      ageRanges: [
        {
          symbol: 'J',
          text: '...12'
        },
        {
          symbol: 'Y',
          text: '13...16'
        },
        {
          symbol: 'A',
          text: '17...21'
        },
        {
          symbol: 'S',
          text: '21...'
        }
      ],
      bowTypes: [
        {
          symbol: 'LB',
          text: 'Longbow'
        },
        {
          symbol: 'BB',
          text: 'Block-bow'
        },
        {
          symbol: 'SLB',
          text: 'Some other Longbow'
        }
      ]
    }
  },
  methods: {
    submit (e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...this.data })
      }).then(() => alert('Success!'))
        .catch(error => alert(error))
    },
    getCountriesList () {
      fetch('https://restcountries.eu/rest/v1/all')
        .then(res => res.json())
        .then(res => {
          this.countries = res
        })
    }
  },
  created () {
    this.getCountriesList()
  }
}
</script>

<style>
  main {
    max-width: 30rem;
    padding: 1rem;
    width: 90%;
    margin: 0 auto;
  }

  form > * {
    margin-top: 3rem;
  }

  label {
    display: block;
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
    border: 1px solid #bdbdbd;
  }
</style>
