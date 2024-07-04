<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInvoiceStore } from '@/stores/invoiceStore'

import arrowLeft from '@/components/icons/IconArrowLeft.vue'

import StatusModal from '@/components/StatusModal.vue'
import EditModal from '@/components/EditModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

let invoice = ref()
let invoices = JSON.parse(localStorage.getItem('invoices'))
let currentInvoice = invoices.filter((item) => item.id == props.id)[0]

onMounted(() => {
  invoice.value = useInvoiceStore().getInvoice(props.id)[0]
})

/* ================================  Delete Modal  ============================================== */

let showDeleteModal = ref(false)
const toggleDeleteModal = () => {
  showDeleteModal.value = !showDeleteModal.value

}

const confirmDelete = () => {
  toggleDeleteModal()
  deleteInvoice()
  // after Deleting and closeing the modal, a notification should appear now

  // redirect to home page
  router.push({ name: 'home' })
}

const deleteInvoice = () => {

  // delete the current feedback with old data
  let index = invoices.indexOf(currentInvoice)

  if (index > -1) { // only splice array when item is found
    invoices.splice(index, 1) // 2nd parameter means remove one item only
  }

  // Save the updated invoices array back to local storage
  localStorage.setItem('invoices', JSON.stringify(invoices));

}

/* ================================  Edit Modal  ============================================== */

let showEditModal = ref(false)
const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value
  // console.log(invoice.value.senderAddress.street);
}


/* ================================  Status Modal  ============================================== */

let showStatusModal = ref(false)

const toggleStatusModal = () => {
  showStatusModal.value = !showStatusModal.value
}

const changeStatus = () => {
  toggleStatusModal()
  changeInvoiceStatus()
  // after changing and closeing the modal, a notification should appear now
}

const changeInvoiceStatus = () => {

  // Check if the invoice exists
  if (currentInvoice) {
    // Update the status of the found invoice
    currentInvoice.status = 'paid';

    // Save the updated invoices array back to localStorage
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // update status value in v-dom for immediate effect
    invoice.value.status = 'paid'
  } else {
    // console.error('Invoice not found');
  }

}

const rerenderInvoice = (updateTrigger) => {

  if (updateTrigger) {
    invoice.value = currentInvoice;
  }

  // call showNotification()
}
</script>
<template>


  <EditModal v-if="showEditModal" :invoice="invoice" @toggleEditModal="toggleEditModal"
    @update-invoice="rerenderInvoice" />

  <DeleteModal v-if="showDeleteModal" :invoice="invoice" @onDelete="confirmDelete" @close="toggleDeleteModal" />

  <StatusModal v-if="showStatusModal" :invoice="invoice" @onChange="changeStatus" @close="toggleStatusModal" />


  <div class="invoice__content" v-if="invoice">
    <router-link class="back_btn" to="/">
      <arrowLeft />
      <p>Go back</p>
    </router-link>
    <div class="invoice__header">
      <div class="left">
        <p>Status</p>
        <div class="invoice__status" :class="invoice.status + '-btn'">
          <div class="layer">
            <span></span>
            {{ invoice.status }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="edit-btn" @click="toggleEditModal">Edit</div>
        <div class="delete-btn" @click="toggleDeleteModal">Delete</div>
        <div class="primary-btn" @click="toggleStatusModal" v-if="invoice.status === 'pending'">Mark as Paid</div>
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="left">
          <h3 class="invoice-id"><span>#</span>{{ invoice.id }}</h3>
          <p>{{ invoice.description }}</p>
        </div>
        <div class="right">
          <p>{{ invoice.senderAddress.street }}</p>
          <p>{{ invoice.senderAddress.city }}</p>
          <p>{{ invoice.senderAddress.postCode }}</p>
          <p>{{ invoice.senderAddress.country }}</p>
        </div>
      </div>
      <div class="middle">
        <div class="details">
          <div class="dates">
            <div class="details__group invoice_date">
              <p>Invoice Date</p>
              <h3>{{ invoice.createdAt }}</h3>
            </div>
            <div class="details__group payment_due">
              <p>Payment Due</p>
              <h3>{{ invoice.paymentDue }}</h3>
            </div>
          </div>

          <div class="bill_info">
            <div class="details__group client_name">
              <p>Bill to</p>
              <h3>{{ invoice.clientName }}</h3>
            </div>
            <div class="details__group client_address">
              <p>{{ invoice.clientAddress.street }}</p>
              <p>{{ invoice.clientAddress.city }}</p>
              <p>{{ invoice.clientAddress.postCode }}</p>
              <p>{{ invoice.clientAddress.country }}</p>
            </div>
          </div>

          <div class="details__group client_email">
            <p>Client Email</p>
            <h3>{{ invoice.clientEmail }}</h3>
          </div>
        </div>

        <div class="sm details__group client_email">
          <p>Client Email</p>
          <h3>{{ invoice.clientEmail }}</h3>
        </div>
      </div>

      <div class="bottom">
        <div class="items_table">

          <div class="table_header">
            <p>Item Name</p>
            <p>QTY.</p>
            <p>Price</p>
            <p>Total</p>
          </div>

          <div class="table_body">
            <div class="item_row" v-for="item in invoice.items">

              <div class="name_and_qty_and_price">

                <div class="name">
                  <h4>{{ item.name }}</h4>
                </div>

                <div class="qty_and_price">
                  <h4>{{ item.quantity }}</h4>
                  <h4>$ {{ item.price }}</h4>
                </div>

              </div>

              <div class="total">
                <h4>$ {{ item.total }}</h4>
              </div>

            </div>
          </div>

          <div class="table_footer">
            <p>Amount Due</p>
            <h2><span>$</span>{{ invoice.total }}</h2>
          </div>

        </div>
      </div>

    </div>
    <div class="invoice_footer">
      <div class="edit-btn" @click="toggleEditModal">Edit</div>
      <div class="delete-btn" @click="toggleDeleteModal">Delete</div>
      <div class="primary-btn" @click="toggleStatusModal" v-if="invoice.status === 'pending'">Mark as Paid</div>
    </div>
  </div>
</template>

<style scoped>
/* ================================================================ */
/* ================================================================ */
/* ============================ Header ============================ */
/* ================================================================ */
/* ================================================================ */

.invoice__content {
  margin: 40px auto 50px auto;
  width: 60%;
  color: var(--txt-clr);
}

.back_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 50px;
  margin: 20px 0;
}

.back_btn:hover {
  cursor: pointer;
  color: var(--txt-gray);
}

.back_btn:hover {
  color: var(--txt-secondary);

}

.back_btn svg {
  margin-bottom: 5px;
}

.invoice__content .invoice__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  height: 88px;
  background-color: var(--ele-dark-clr);
  border-radius: 10px;
  padding: 0 30px;
}

.invoice__content .invoice__header .left .invoice__status {
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

.invoice__content .invoice__header .left .invoice__status .layer {
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: inherit;
}

.invoice__content .invoice__header .left .invoice__status .layer span {
  margin-right: 10px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.invoice__content .invoice__header .left p {
  margin-right: 20px;
}

.invoice__content .invoice__header .left,
.invoice__content .invoice__header .right {
  display: flex;
  align-items: center;
}

.invoice__content .invoice__header .right .delete-btn {
  margin: 0 10px;
}

.invoice__content .invoice_footer {
  display: none;
}

/* ======================================================================= */
/* =============================== Content ================================ */
/* ===================================== ================================= */

.invoice__content .content {
  border-radius: 10px;
  padding: 50px;
  background-color: var(--ele-dark-clr);
}

.invoice__content .content .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.invoice__content .content .middle .details {
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
}

.invoice__content .content .middle .sm.details__group.client_email {
  display: none;
}

.invoice__content .content .middle .details .dates .details__group:last-child {
  margin-top: 30px;
}

.invoice__content .content .middle .details .bill_info .details__group:last-child {
  margin-top: 10px;
}

.invoice__content .content .middle .details .details__group p {
  color: var(--txt-secondary);
}

.invoice__content .content .middle .details .details__group h3 {
  margin-top: 10px;
  color: var(--txt-clr);
}

.invoice__content .content .bottom {
  margin-top: 50px;
  /* min-height: 264px; */
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  color: var(--txt-clr);
}

.invoice__content .content .bottom .items_table {
  padding: 30px 0 100px 0;
  position: relative;
  min-height: 170px;
}

.invoice__content .content .bottom .table_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--txt-gray);
  padding: 0 30px;
}

.invoice__content .content .bottom .table_body {
  padding: 0 30px;
}

.invoice__content .content .bottom .table_body .item_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price {
  display: flex;
  justify-content: space-between;
  width: 69%;
}

.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .qty_and_price {
  display: flex;
  justify-content: space-between;
  width: 47%;
}

.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .name h4,
.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .qty_and_price h4 {
  color: var(--txt-gray);
}

.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .total h4 {
  color: var(--txt-clr);
}

.invoice__content .content .bottom .table_footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ele-black-light);
  height: 80px;
  padding: 0 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #FFF;
}

.invoice__content .content .bottom .table_footer h2 span {
  margin-right: 10px;
}

@media screen and (min-width: 679px) and (max-width: 1180px) {
  .invoice__content {
    margin-top: 100px;
    width: 88%;
  }
}

@media screen and (min-width: 320px) and (max-width: 678px) {
  .back_btn {
    margin-top: unset;
  }

  .invoice__content {
    margin-bottom: 0;
    margin-top: 100px;
    width: 90%;
    position: relative;
  }

  .invoice__header {
    margin-bottom: 20px !important;
  }

  .invoice__header .left {
    width: 100%;
    justify-content: space-between;
  }

  .invoice__header .right {
    display: none !important;
  }

  .invoice__content .invoice_footer {
    position: relative;
    bottom: 0;
    border-radius: 10px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0;
    height: 88px;
    background-color: var(--ele-dark-clr);
  }

  .invoice__content .content {
    padding: 20px;
  }

  .invoice__content .content .top {
    flex-direction: column;
    align-items: unset;
    margin-bottom: 40px;
  }

  .invoice__content .content .top .right {
    margin-top: 20px;
  }

  .invoice__content .content .middle .details {
    margin-right: unset;
  }

  .invoice__content .content .middle .details .details__group.client_email {
    display: none;
  }

  .invoice__content .content .middle .sm.details__group.client_email {
    display: block;
    margin-top: 20px;
  }

  .invoice__content .content .bottom .table_header {
    display: none;
  }

  .invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price {
    flex-direction: column;
  }

  .invoice__content .content .bottom .table_body .item_row {
    margin-bottom: 30px;
  }

  .invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .name {
    margin-bottom: 10px;
  }
}
</style>