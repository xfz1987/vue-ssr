<template>
  <div>
      <div :key="topic.id" v-for="topic in topics">
        <p class="f-0">{{topic.title}}</p>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fetchInitialData = ({ store, route }) => {
  console.log('获取的路由数据', route.params.id);
  return store.dispatch(`getTopics`)
}

export default {
  metaInfo: {
    title: 'Topics page',
    meta: [
			{
      	name: 'keywords',
      	content: 'topics'
			}
		]
  },
  asyncData: fetchInitialData,
  computed: {
    ...mapGetters({
      topics: 'getTopics'
    })
  },
  mounted () {
    console.log(process.env.VUE_ENV)
    if (this.topics.length) return false
    fetchInitialData({ store: this.$store, route: this.$route })
  }
}
</script>
<style>
  .f-0{
    color: yellowgreen;
  }
</style>
