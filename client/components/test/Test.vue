<style src="./Test.css"></style>
<template>
  <div class="test">
    Test Comoents
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Test page',
    meta: [
			{
      	name: 'keywords',
      	content: 'test'
			}
		]
  },
  mounted () {
    import(/* webpackChunkName: "lazy-test" */ './Test.js').then(function(res) {
      res.default();
    });
  }
}
</script>
