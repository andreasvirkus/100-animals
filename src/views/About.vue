<template>
  <main class="about">
    <h1>Current availability of rooms for
      <a href="https://www.wfac2020.org"
        target="_blank"
        rel="noopener noreferrer">WFAC 2020</a></h1>
    <div>
      <hr>
      <button type="button" @click="loadRoomQuantity">Refresh 👇</button>
    </div>
    <div v-if="loading" class="row">
      <spinner class="col col-sm-2"/>
    </div>
    <ul v-else class="booking-list">
      <li v-for="room in roomMapping" :key="room.code">
        <strong>{{ room.quantity }}</strong> room{{ room.quantity === 1 ? '' : 's' }} left for
        <strong>{{ room.name }}</strong>
      </li>
    </ul>
  </main>
</template>

<script>
import { db } from '@/db'
import Spinner from '@/components/Spinner'
import { roomTypes } from '@/models'

export default {
  name: 'about',
  data () {
    return {
      loading: true,
      roomMapping: []
    }
  },
  components: { Spinner },
  created () {
    this.loadRoomQuantity()
  },
  methods: {
    async loadRoomQuantity () {
      this.loading = true
      const snapshot = await db.collection('rooms').get()
      snapshot.forEach(doc => {
        this.mapAvailability(doc.data())
        this.loading = false
      })
    },
    mapAvailability (mapping) {
      this.roomMapping = roomTypes.map(building => building.rooms.map(room => ({
        ...room,
        quantity: mapping[room.code]
      }))).flat()
    }
  }
}
</script>

<style>
.about {
  margin: 2rem;
}
.about hr {
  margin-top: 1.5rem;
  margin-bottom: .75rem;
}
.booking-list {
  font-family: monospace;
}
</style>
