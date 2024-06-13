<script setup>
import { ref, onMounted } from 'vue'
import calendarIcon from '@/components/icons/IconCalendar.vue'
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import deleteIcon from '@/components/icons/IconDelete.vue'
import plusIcon from '@/components/icons/IconPlus.vue'

const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['onEdit', 'closeEditModal'])

const editedInvoice = ref({ ...props.invoice })
let invoiceInfo = ref({
  id: editedInvoice.value.id,
  createdAt: editedInvoice.value.createdAt,
  paymentDue: editedInvoice.value.paymentDue,
  description: editedInvoice.value.description,
  paymentTerms: editedInvoice.value.paymentTerms,
  clientName: editedInvoice.value.clientName,
  clientEmail: editedInvoice.value.clientEmail,
  status: editedInvoice.value.status,
  senderAddress: {
    street: editedInvoice.value.senderAddress.street,
    city: editedInvoice.value.senderAddress.city,
    postCode: editedInvoice.value.senderAddress.postCode,
    country: editedInvoice.value.senderAddress.country,
  },
  clientAddress: {
    street: editedInvoice.value.clientAddress.street,
    city: editedInvoice.value.clientAddress.city,
    postCode: editedInvoice.value.clientAddress.postCode,
    country: editedInvoice.value.clientAddress.country,
  },
  items: editedInvoice.value.items,
  total: editedInvoice.value.total,
})

let paymentDueInDays = ref()
onMounted(() => {
  // Use a regular expression to match the last number
  const createdDayes = props.invoice.createdAt.match(/(\d+)(?!.*\d)/)[0];
  const dueDayes = props.invoice.paymentDue.match(/(\d+)(?!.*\d)/)[0];

  paymentDueInDays.value = Number(dueDayes - createdDayes)
})

let showPaymentTerm = ref(false)
const togglePaymentTerm = () => showPaymentTerm.value = !showPaymentTerm.value

const onEdit = () => {

  console.log(invoiceInfo.value);
  emit('onEdit')
}

let toggleEditModal = ref()
const closeModal = () => {
  emit('closeEditModal', toggleEditModal.value)
}

const changePaymentDue = (days) => {
  days === 1 ? paymentDueInDays.value = 1
    : days === 7 ? paymentDueInDays.value = 7
      : days === 14 ? paymentDueInDays.value = 14
        : days === 30 ? paymentDueInDays.value = 30 : 0

  showPaymentTerm.value = !showPaymentTerm.value
}
</script>

<template>
  <div class="edit_modal_overlay" @click.self="closeModal">

    <div class="edit_modal">
      <h2>Edit <span>#</span>{{ invoice.id }}</h2>

      <div class="edit_modal_content_box">
        <div class="bill_from_group">
          <p class="group_header">Bill From</p>

          <div class="form_group st_address">
            <label for="st_address">Street Address</label>
            <input type="text" id="st_address" v-model="invoiceInfo.senderAddress.street">
          </div>
          <div class="other_info">
            <div class="form_group city">
              <label for="city">City</label>
              <input type="text" id="city" v-model="invoiceInfo.senderAddress.city">
            </div>
            <div class="form_group postCode">
              <label for="postCode">Post Code</label>
              <input type="text" id="postCode" v-model="invoiceInfo.senderAddress.postCode">
            </div>
            <div class="form_group country">
              <label for="country">Country</label>
              <input type="text" id="country" v-model="invoiceInfo.senderAddress.country">
            </div>
          </div>
        </div>

        <div class="bill_to_group">
          <div class="main_info">
            <p class="group_header">Bill To</p>

            <div class="form_group clientName">
              <label for="clientName">Client Name</label>
              <input type="text" id="clientName" v-model="invoiceInfo.clientName">
            </div>

            <div class="form_group clientEmail">
              <label for="clientEmail">Client Email</label>
              <input type="text" id="clientEmail" v-model="invoiceInfo.clientEmail">
            </div>

            <div class="form_group streetAddress">
              <label for="streetAddress">Street Address</label>
              <input type="text" id="streetAddress" v-model="invoiceInfo.clientAddress.street">
            </div>
          </div>

          <div class="other_info">
            <div class="form_group city">
              <label for="city">City</label>
              <input type="text" id="city" v-model="invoiceInfo.clientAddress.city">
            </div>
            <div class="form_group postCode">
              <label for="postCode">Post Code</label>
              <input type="text" id="postCode" v-model="invoiceInfo.clientAddress.postCode">
            </div>
            <div class="form_group country">
              <label for="country">Country</label>
              <input type="text" id="country" v-model="invoiceInfo.clientAddress.country">
            </div>
          </div>

          <div class="dates_info">
            <div class="form_group invoice_date">
              <label for="invoiceDate">Invoice Date</label>
              <div id="invoiceDate" class="invoiceDate">
                {{ invoiceInfo.createdAt }}
                <calendarIcon />
              </div>
            </div>
            <div class="form_group payment_due">
              <label for="paymentDue">Payment Terms</label>
              <div class="paymentDue" id="paymentDue" :value="invoiceInfo.paymentDue" @click="togglePaymentTerm">
                <span>net {{ paymentDueInDays }} days</span>
                <arrowDownIcon />
              </div>

              <div class="paymentTermBox" v-if="showPaymentTerm">
                <span @click="changePaymentDue(1)">Net 1 Day</span>
                <span @click="changePaymentDue(7)">Net 7 Days</span>
                <span @click="changePaymentDue(14)">Net 14 Days</span>
                <span @click="changePaymentDue(30)">Net 30 Days</span>
              </div>
            </div>

          </div>

          <div class="form_group desc">
            <label for="desc">Project Description</label>
            <input type="text" id="desc" v-model="invoiceInfo.description">
          </div>

        </div>

        <div class="invoice_items">
          <p class="header">Item List</p>

          <div class="item_table">

            <div class="table_header">
              <span>Name</span>
              <span class="qty_span">Qty.</span>
              <span>Price</span>
              <span>Total</span>
            </div>

            <div class="table_body">
              <div class="item_info" v-for="item in invoiceInfo.items">
                <div class="item_name">{{ item.name }}</div>
                <div class="item_qty">{{ item.quantity }}</div>
                <div class="item_price">{{ item.price }}</div>
                <div class="item_total">{{ item.total }}</div>
                <deleteIcon />
              </div>
            </div>

            <div class="add_new_item_btn">
              <plusIcon /> Add New Item
            </div>

            <div class="errors_box">
              <div>- All fields must be added</div>
              <div>- An item must be added</div>
            </div>
          </div>

        </div>
      </div>

      <div class="btns">
        <div class="edit-btn" @click="closeModal">Cancel</div>
        <div class="primary-btn" @click="onEdit">Save Changes</div>
      </div>

    </div>

  </div>
</template>


<style scoped>
.edit_modal_overlay {
  position: absolute;
  right: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  min-height: 100vh;
}

.edit_modal_overlay .edit_modal {
  position: relative;
  left: 103px;
  z-index: 10;
  width: 616px;
  background-color: var(--bg-clr);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 30px;
}

.edit_modal_overlay .edit_modal h2 {
  color: var(--txt-clr);
  letter-spacing: -0.038em !important;
}

.edit_modal_overlay .edit_modal h2 span {
  color: #888EB0;
}

.edit_modal_content_box .bill_from_group {
  margin: 30px 0;
}

.edit_modal_content_box .bill_to_group .group_header,
.edit_modal_content_box .bill_from_group .group_header {
  font-weight: bold;
  color: var(--primary-clr);
}

.edit_modal_content_box .bill_from_group .form_group.st_address {
  margin: 20px 0;
}

.edit_modal_content_box .bill_from_group .form_group.st_address label {
  color: var(--txt-clr);
  display: block;
}

.edit_modal_content_box .bill_from_group .form_group.st_address input {
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.edit_modal_content_box .bill_from_group .form_group.st_address input:focus {
  border: 1px solid var(--primary-clr);
}

.edit_modal_content_box .bill_from_group .other_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit_modal_content_box .bill_from_group .other_info .form_group label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.edit_modal_content_box .bill_from_group .other_info .form_group input {
  height: 48px;
  width: 152px;
  border: 1px soild var(--txt-clr);
  border-radius: 10px;
  background-color: var(--ele-light-clr);
  color: var(--txt-clr);
  padding: 0 20px;
  outline: none;
}

.edit_modal_content_box .bill_from_group .other_info .form_group input:focus {
  border: 1px solid var(--primary-clr);
}


.edit_modal_content_box .bill_to_group .main_info {
  margin: 50px 0;
}

.edit_modal_content_box .bill_to_group .main_info .form_group {
  margin: 20px 0;
}

.edit_modal_content_box .bill_to_group .main_info .form_group.clientName label,
.edit_modal_content_box .bill_to_group .main_info .form_group.clientEmail label,
.edit_modal_content_box .bill_to_group .main_info .form_group.streetAddress label {
  color: var(--txt-clr);
  display: block;
  margin-bottom: 10px;
}

.edit_modal_content_box .bill_to_group .main_info .form_group.clientName input,
.edit_modal_content_box .bill_to_group .main_info .form_group.clientEmail input,
.edit_modal_content_box .bill_to_group .main_info .form_group.streetAddress input {
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.edit_modal_content_box .bill_to_group .other_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.edit_modal_content_box .bill_to_group .other_info .form_group {}

.edit_modal_content_box .bill_to_group .other_info .form_group label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.edit_modal_content_box .bill_to_group .other_info .form_group input {
  height: 48px;
  width: 152px;
  border: 1px soild var(--txt-clr);
  border-radius: 10px;
  background-color: var(--ele-light-clr);
  color: var(--txt-clr);
  padding: 0 20px;
  outline: none;
}

.edit_modal_content_box .bill_to_group .dates_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date {}

.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due {
  position: relative;
}

.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due:hover {
  cursor: pointer;
}

.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date label,
.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due .paymentDue,
.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date .invoiceDate {
  border-radius: 10px;
  color: rgba(126, 136, 195, .5);
  padding: 0 20px;
  height: 48px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ele-dark-clr)
}

.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due .paymentDue {
  color: var(--txt-clr);
}

.edit_modal_content_box .bill_to_group .form_group.desc {
  margin-bottom: 50px;
}

.edit_modal_content_box .bill_to_group .form_group.desc label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.edit_modal_content_box .bill_to_group .form_group.desc input {
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.edit_modal_content_box .bill_to_group .paymentTermBox {
  width: 240px;
  background-color: var(--ele-light-clr);
  border-radius: 5px;
  position: absolute;
  top: 85px;
  right: 0;
}

.edit_modal_content_box .bill_to_group .paymentTermBox span {
  height: 48px;
  line-height: 48px;
  color: var(--txt-clr);
  display: block;
  padding: 0 20px;
}

.edit_modal_content_box .bill_to_group .paymentTermBox span:not(:last-child) {

  border-bottom: 1px solid #373B53;
}

.edit_modal_content_box .bill_to_group .paymentTermBox span:hover {
  color: var(--primary-clr);
  cursor: pointer;
}




.edit_modal_content_box .invoice_items {
  margin-bottom: 50px;
}

.edit_modal_content_box .invoice_items header {
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: -.38px;
  color: #777F98;
}

.edit_modal_content_box .invoice_items .item_table {}

.edit_modal_content_box .invoice_items .item_table .table_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}

.edit_modal_content_box .invoice_items .item_table .table_header span {
  color: var(--txt-clr);
}

.edit_modal_content_box .invoice_items .item_table .table_header span.qty_span {
  margin-left: 150px;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info div:not(:last-of-type) {
  color: var(--txt-clr);
  background-color: var(--ele-light-clr);
  border-radius: 5px;
  height: 48px;
  line-height: 48px;
  font-weight: bold;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info div:last-of-type {
  color: var(--txt-clr);
  font-weight: bold;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_name {
  width: 214px;
  padding-left: 20px;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty {
  width: 46px;
  text-align: center;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_price {
  width: 100px;
  text-align: center;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_total {}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info svg:hover {
  cursor: pointer;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info svg:hover path {
  fill: var(--danger-clr) !important;
}

.edit_modal_content_box .invoice_items .item_table .add_new_item_btn {
  height: 48px;
  width: 100%;
  line-height: 48px;
  background-color: var(--gray-clr);
  color: var(--txt-clr);
  margin-top: 20px;
  border-radius: 30px;
  text-align: center;
}

.edit_modal_content_box .invoice_items .item_table .add_new_item_btn:hover {
  cursor: pointer;
}


.edit_modal_content_box .invoice_items .item_table .errors_box {
  margin-top: 30px;
  color: var(--danger-clr);
}


.edit_modal_overlay .edit_modal .btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.edit_modal_overlay .edit_modal .btns .edit-btn {
  margin-right: 20px;
}
</style>