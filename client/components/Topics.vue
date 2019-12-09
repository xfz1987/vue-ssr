<template>
  <div>
      <div v-for="topic in topics">
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
    title: 'Test page',
    meta: [
			{
      	name: 'keyWords',
      	content: 'test'
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
    console.log('123123213')
    fetchInitialData({ store: this.$store, route: this.$route })
  }
}
</script>
<style>
  .f-0{
    color: yellowgreen;
  }
</style>
