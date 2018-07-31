<template>
  <main class="home">
    <form name="reg" method="post" action="/submit">
      <input type="hidden" name="form-name" value="reg" />
      <p style="display:none;">
        <label>Leave this field empty <input name="bot-field"></label>
      </p>

      <div class="form-control">
        <label>Name</label>
        <input type="text" name="name" placeholder="John Smith">
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label>Class</label>
          <input type="text" name="class" placeholder="Junior/Adult">
        </div>

        <div class="form-control grow-2x">
          <label>E-mail</label>
          <input type="email" name="email" placeholder="mail@domain.com">
        </div>
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

export default {
  name: 'home',
  methods: {
    submit (e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...this.data })
      }).then(() => alert('Success!'))
        .catch(error => alert(error))
    }
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

  input {
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
