<script setup>
import {ref, onMounted} from 'vue'
const props = defineProps(['editInvoice','showEditModal'])

let invoice = ref(props.editInvoice)
onMounted( () => {
  // invoice.value = await props.editInvoice
  // console.log(invoice.value);
})


</script>

<template>
  <div class="edit_modal_overlay" v-if="toggleEditModal">

    <div class="edit_modal">
      <h2>Edit <span>#</span>{{ invoice.id }}</h2>
  
    

      <div class="btns">
          <div class="edit-btn" @click="toggleEditModal = !toggleEditModal">Cancel</div>
          <div class="primary-btn" >Save Changes</div>
      </div>

    </div>

  </div>
</template>


<style scoped>
.edit_modal_overlay{
  position: absolute;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, .8);
  width: calc(100% - 103px);
  min-height: 100vh;
}
.edit_modal_overlay .edit_modal{
  z-index: 10;
  width: 616px;
  height: 250px;
  background-color: var(--ele-dark-clr);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 30px;
}
.edit_modal_overlay .edit_modal h2{color: var(--txt-clr);letter-spacing: -0.038em !important;}
.edit_modal_overlay .edit_modal h2 span{color: #888EB0;}
.edit_modal_overlay .edit_modal .btns{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>