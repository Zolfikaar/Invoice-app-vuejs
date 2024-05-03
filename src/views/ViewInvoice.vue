<script setup>
import {ref,onMounted} from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

onMounted(() => {

})
</script>
<template>
  <div class="invoice__content">
    <div class="invoice__header">
      <div class="left">
        <p>Status</p>
        <div class="invoice__status" :class="invoice.status + '-btn'">
          <div class="layer">
            <span></span>{{ invoice.status }}
          </div>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <div class="invoice__content"></div>
  </div>
</template>

<style scoped>
.invoice__content{
  margin: 50px auto;
  width: 60%;
  color: var(--txt-clr);
}
.invoice__content .invoice__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.invoice__content .invoice__header .left .invoice__status{
  width: 104px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: -.25px;
  position: relative;
}
.invoice__content .invoice__header .left .invoice__status .layer{
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: inherit;
}
.invoice__content .invoice__header .left .invoice__status .layer span{
  margin-right: 10px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}



.invoice__content .invoice__content{}
</style>