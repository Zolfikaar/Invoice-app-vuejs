<script setup>
import { ref, onMounted } from 'vue';
import { useInvoiceStore } from '@/stores/invoiceStore';

const emit = defineEmits(['onDelete', 'close'])

let invoice = ref()
let toggleDeleteModal = ref()
onMounted(() => {
  // invoice.value = await props.editInvoice
  // console.log(invoice.value);
})

const onDelete = () => {
  emit('onDelete', invoice.value)
  // console.log('Confirm Delete');
}


const closeModal = () => {
  emit('close', toggleDeleteModal.value)
  // console.log('Close Delete Modal');
}
</script>

<template>
  <div class="delete_modal_overlay">

    <div class="delete_modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete invoice #? This action cannot be undone.</p>
      <div class="btns">
        <div class="edit-btn" @click="closeModal">Cancel</div>
        <div class="delete-btn" @click="onDelete">Delete</div>
      </div>
    </div>

  </div>
</template>

<style>
/* ========================= Delete Modal =================================== */
.delete_modal_overlay {
  position: absolute;
  z-index: 6;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  min-height: 100vh;
}

.delete_modal_overlay .delete_modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 480px;
  height: 250px;
  background-color: var(--ele-dark-clr);
  border-radius: 10px;
  padding: 30px;
}

.delete_modal_overlay .delete_modal h2 {
  color: var(--txt-clr);
  letter-spacing: -0.038em !important;
}

.delete_modal_overlay .delete_modal p {
  color: var(--txt-gray);
  margin: 20px 0;
}

.delete_modal_overlay .delete_modal .btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.delete_modal_overlay .delete_modal .btns .edit-btn {
  margin-right: 10px;
}
</style>