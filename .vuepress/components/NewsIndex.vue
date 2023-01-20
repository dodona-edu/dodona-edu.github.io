<template>
  <ul class='news-overview'>
    <li v-for="post in posts">
      <article>
        <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        <time :datetime="post.frontmatter.date">{{ formatDate(post.frontmatter.date) }}</time>
      </article>
    </li>
  </ul>
</template>

<script>
  export default {
    props: [
      'limit',
      'lang'
    ],
    methods: {
      formatDate(date) {
          return new Intl.DateTimeFormat(this.lang).format(Date.parse(date));
      }
    },
    computed: {
      posts() {
        let posts = this.$site.pages
          .filter(post => post.path !== `/${this.lang}/news/`)
          .filter(post => post.path.startsWith(`/${this.lang}/news/`))
          .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
        if (this.limit > 0) {
          posts = posts.slice(0, this.limit);
        }
        return posts;
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    padding-left: 0;
  }
  time {
    float: right;
    color: #959396;
  }
</style>
