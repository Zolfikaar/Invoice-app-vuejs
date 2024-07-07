<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['onDelete', 'close'])

const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
})

let invoice = ref({ ...props.invoice })
let toggleDeleteModal = ref()

onMounted(() => { })

const onDelete = () => {
  emit('onDelete', invoice.value)
}


const closeModal = () => {
  emit('close', toggleDeleteModal.value)
}
</script>

<template>
  <div class="delete_modal_overlay" @click.self="closeModal">

    <div class="delete_modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete invoice #{{ invoice.id }}? This action cannot be undone.</p>
      <div class="btns">
        <div class="edit-btn" @click="closeModal">Cancel</div>
        <div class="delete-btn" @click="onDelete">Delete</div>
      </div>
    </div>

  </div>
</template>

<style>
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

@media screen and (min-width: 320px) and (max-width: 678px) {
  .delete_modal_overlay .delete_modal {
    width: 90%;
  }
}
</style>