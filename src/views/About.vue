<template>
  <main class="about">
    <h1>Current availability of rooms for
      <a href="https://www.wfac2020.org"
        target="_blank"
        rel="noopener noreferrer">WFAC 2020</a></h1>

    <ul class="booking-list">
      <li v-for="room in roomMapping" :key="room.code">
        <strong>{{ room.quantity }}</strong> room{{ room.quantity === 1 ? '' : 's' }} left for
        <strong>{{ room.name }}</strong>
      </li>
    </ul>
  </main>
</template>

<script>
import { db } from '@/db'
import { roomTypes } from '@/models'

export default {
  data () {
    return {
      roomMapping: []
    }
  },
  async created () {
    const snapshot = await db.collection('rooms').get()
    snapshot.forEach(doc => this.mapAvailability(doc.data()))
  },
  methods: {
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
.booking-list {
  font-family: monospace;
}
</style>
