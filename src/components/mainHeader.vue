<template>
  <div class="header header__container">
   <div class="header__content">
    <img class="header__image" src="../assets/img/book.png" alt="book">
    <ul>
      <li><router-link to="/">Main</router-link></li>
      <li><router-link to="/galleryPage">Gallery</router-link></li>
      <li><router-link to="/basketPage">Basket</router-link></li>
    </ul>
    <div class="field has-addons">
  <div class="control">
    <input class="input" type="text" placeholder="Find a book">
  </div>
  <div class="control">
    <button class="button is-info">
      Search
    </button>
  </div>
</div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
