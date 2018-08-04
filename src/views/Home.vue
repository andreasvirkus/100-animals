<template>
  <main class="home">
    <h1>100 Animals</h1>
    <h2>Archery Marathon</h2>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptate debitis, nostrum explicabo nulla quam aperiam quae eveniet, doloremque minus, nemo perspiciatis iste delectus est odit molestiae consequatur non. Illum!
    Ullam illum perferendis sequi? Ea, in beatae laboriosam quis fugiat provident ullam excepturi dignissimos ratione rerum illum repellat voluptate est neque accusantium! Placeat perferendis aspernatur, quod deleniti obcaecati veritatis commodi.
    Dicta, repudiandae possimus pariatur mollitia modi ducimus in fugiat aspernatur. Explicabo optio distinctio dolorem dicta debitis labore quos reprehenderit doloribus! Quia illo magnam explicabo blanditiis sequi aspernatur iure debitis eligendi.
    Mollitia laboriosam nemo obcaecati laudantium officia! Deserunt, dolor, blanditiis tenetur quisquam voluptates nam ipsam vel quae, optio maiores necessitatibus ratione atque cupiditate? Laboriosam sed reiciendis accusantium veniam voluptates eaque iusto.
    Quisquam fugit possimus nam voluptatem similique adipisci! Labore at culpa, eligendi laborum illo reprehenderit libero deleniti vero doloremque recusandae magni saepe natus ullam modi dolore omnis voluptates, reiciendis, eius iste.
    Facilis nihil repudiandae sunt iusto quibusdam eligendi fugiat, odit ducimus expedita rerum dicta facere alias omnis similique sint dolores vero a possimus perspiciatis deleniti voluptatem vel praesentium. Voluptatem, atque libero?
    Repudiandae magni error veniam totam ipsa laborum porro cumque praesentium earum facere nulla delectus, sequi nihil natus quod eligendi modi, cum at, eum consectetur molestiae quisquam doloribus impedit nemo! Blanditiis!
    Neque natus, assumenda fugit totam quo in quasi, vero a labore iure repellat adipisci officia possimus aliquid obcaecati! Optio ut nisi qui fugit eligendi, cupiditate veniam vero eius nulla quia.
    Enim laboriosam corrupti maiores! Eaque eum culpa aut ipsum labore natus, animi expedita facilis laborum eligendi assumenda blanditiis quas quod id omnis sequi, cumque totam sit dolore ab eos veritatis?
    Cumque repellendus rerum animi fugit rem veritatis libero autem distinctio, atque, exercitationem provident labore inventore corporis dolorum, illo debitis aut. Sunt ipsum vel hic error quasi architecto odit laborum eum?
    Doloribus placeat harum quod sunt impedit reiciendis, incidunt mollitia assumenda, sequi debitis labore vitae distinctio suscipit corporis aliquid, rerum totam ad. Ipsum inventore placeat velit, temporibus quia id delectus vel!
    Recusandae vitae, aut alias consequuntur doloribus sapiente molestias, in esse quisquam possimus assumenda ut iusto unde ipsam, optio quibusdam voluptatibus animi delectus. Molestias dignissimos placeat exercitationem cupiditate recusandae totam non?
    Minus quibusdam aperiam temporibus, atque id, veniam, quod non vero cum tenetur voluptates necessitatibus dolores deleniti quos quasi ullam excepturi facilis tempora doloribus. Veniam, odio. Quas accusamus voluptatum odit repudiandae.
    Corrupti maxime totam, porro perferendis qui consequatur neque eos voluptatem at, distinctio, ex magnam? Quaerat numquam officia nesciunt sunt corrupti repellendus ex saepe velit et fugiat, reiciendis ad iste natus.
    Ex iusto quae, officia pariatur qui itaque rerum, quisquam fuga asperiores, incidunt sequi vel ipsam sed similique! Voluptatibus fugiat, quidem sint velit minus, illo asperiores, voluptates numquam rerum nam ex!
    At, necessitatibus! Molestiae consectetur culpa sed doloribus recusandae, aliquid voluptatibus tempora impedit. In officia aperiam, facere at fuga incidunt ex eveniet asperiores cumque consequuntur provident, aspernatur harum error rem laborum!
    Eligendi itaque dolorum expedita eveniet sapiente aut quis doloribus placeat, adipisci, culpa dolorem minus quam libero odio similique illum consequatur odit ex sequi quas accusantium fuga cupiditate magni! Quis, architecto?
    Suscipit, sed quae corrupti voluptatum numquam dolore aperiam rem quas vero fuga, magnam impedit consequuntur voluptates quibusdam aspernatur debitis, a provident. Dolorem iusto aut maiores, totam commodi libero harum vel!
    Voluptate iste quis, facilis libero soluta eveniet perferendis neque blanditiis fuga? Adipisci quibusdam architecto, minus impedit atque repellat, natus placeat sunt animi corporis laborum? Quasi doloribus alias tempore hic consequuntur.
    Alias laborum esse optio, delectus velit ducimus ea commodi animi, obcaecati voluptatibus perferendis, repellendus cupiditate asperiores eligendi eaque repellat ipsa excepturi est ab numquam molestiae. Illo minus ut accusantium perspiciatis!</p>
  </main>
</template>

<script>
import { ageRanges, bowTypes, countries } from '@/models'
import Multiselect from 'vue-multiselect'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

// TODO: Submit via ajax, add class from age, gender, bow
export default {
  name: 'home'
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  main {
    max-width: 45rem;
    padding: 1rem;
    width: 90%;
    margin: 3rem auto;
  }

  h1 {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 2rem;
  }
</style>
