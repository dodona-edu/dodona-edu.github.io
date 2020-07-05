<template>
  <div>
    <h1>{{ title }} <small>{{ formatDate(date) }}</small></h1>
  </div>
</template>

<script>
  export default {
    props: [
      'title',
      'date'
    ],
    methods: {
      formatDate(date) {
        const postedOn = this.lang === "en" ? "posted on " : "gepost op ";
        return postedOn + new Intl.DateTimeFormat(this.lang).format(Date.parse(date));
      }
    }
  }
</script>

<style scoped>
  small {
    float: right;
    margin-top: 25px;
    font-size: 30%;
    color: gray;
  }
</style>