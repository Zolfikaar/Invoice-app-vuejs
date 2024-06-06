<script setup>
import { ref, onMounted } from 'vue';
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import calendarIcon from '@/components/icons/IconCalendar.vue'
import deleteIcon from '@/components/icons/IconDelete.vue'
import { useInvoiceStore } from '@/stores/invoiceStore'

const emit = defineEmits(['onShowNewModal', 'closeNewModal'])

// let formattedDate = ref()
// const date = new Date();
// const options = { day: 'numeric', month: 'short', year: 'numeric' };
// formattedDate.value = new Intl.DateTimeFormat('en-GB', options).format(date);

let invoiceInfo = ref({
  id: '',
  street: '',
  city: '',
  senderAddressPostCode: '',
  senderAddressCountry: '',
  clientName: '',
  clientEmail: '',
  clientAddressStreet: '',
  clientAddressCity: '',
  clientAddressPostCode: '',
  clientAddressCountry: '',
  description: '',
  createdAt: null,
  paymentDue: '',
  paymentTerms: 30,
  items: [],
  total: 0,
})

let invoices = ref()
onMounted(async () => invoices.value = await useInvoiceStore().getInvoices())


let toggleNewModal = ref()
const closeModal = () => emit('closeNewModal', toggleNewModal.value)

let showPaymentTerm = ref(false)
const togglePaymentTerm = () => {
  showPaymentTerm.value = !showPaymentTerm.value
}

let paymentTermValue = ref(30)
const changePaymentTermValue = (val) => {
  paymentTermValue.value = val
  showPaymentTerm.value = false
  invoiceInfo.value.paymentTerms = val

  // from the date and paymentTerms value calculate the paymentDue value 

  let paymentTermsVal = val;

  let createdAtVal = invoiceInfo.value.createdAt

  let createdAtDayVal = parseInt(createdAtVal.slice(8))
  let createdAtMonthVal = parseInt(createdAtVal.slice(5, 7))
  let createdAtYearVal = parseInt(createdAtVal.slice(0, 4))

  let updatedPaymentDue = null
  const numDays = (y, m) => new Date(y, m, 0).getDate();
  let monthDaysCount = numDays(createdAtYearVal, createdAtMonthVal)

  if (paymentTermsVal + createdAtDayVal > monthDaysCount) {
    createdAtMonthVal++;
    let updatedCreatedAtDayVal = (paymentTermsVal + createdAtDayVal) - monthDaysCount
    updatedPaymentDue = `${createdAtYearVal}-${createdAtMonthVal}-${updatedCreatedAtDayVal}`;
  } else if (paymentTermsVal + createdAtDayVal <= monthDaysCount) {
    let updatedCreatedAtDayVal = paymentTermsVal + createdAtDayVal
    updatedPaymentDue = `${createdAtYearVal}-${createdAtMonthVal}-${updatedCreatedAtDayVal}`;
  }

  invoiceInfo.value.paymentDue = updatedPaymentDue

}


let errors = ref({
  street: false,
  city: false,
  senderAddressPostCode: false,
  senderAddressCountry: false,
  clientName: false,
  clientEmail: false,
  clientAddressStreet: false,
  clientAddressCity: false,
  clientAddressPostCode: false,
  clientAddressCountry: false,
  description: false,
})

// // Check if all values in the errors object are true
let allEmpty = ref(false)
function checkAllErrors() {
  // Get the values of the errors object
  const errorValues = Object.values(errors.value);

  // Check if all values are true
  const allErrorsTrue = errorValues.every(value => value === true);

  // Display an error message if all values are true
  if (allErrorsTrue) {
    allEmpty.value = true
  } else {
    allEmpty.value = false
  }

}

function validateInvoiceInfo(invoiceInfo) {

  for (let invoiceItem in invoiceInfo.value) {
    if (invoiceItem === 'createdAt') {
      return
    } else {

      if (invoiceInfo.value[invoiceItem] === '') {
        errors.value[invoiceItem] = true
      } else {
        errors.value[invoiceItem] = false
      }

    }
  }

  checkAllErrors()

}

// let itemListName = ref()
// let itemListQty = ref()
// let itemListPrice = ref()
// let itemListTotal = itemListQty.value * itemListPrice.value || 0

let itemList = ref([
  {
    name: '',
    qty: 0,
    price: 0,
    total: 0,
  }
])

let emptyList = ref(true)
function checkItemList() {

}

const addListItem = () => {
  // function one: if the itemList is empty, the click event must show the table body for addind item info, 
  // console.log(itemList.value.length);
  if (itemList.value.length === 0) {
    //  show the empty feilds for adding item info
    emptyList.value = false

    let itemInfo = {
      'name': itemListName.value,
      'qty': itemListQty.value,
      'price': itemListPrice.value,
      'total': itemListPrice.value * itemListQty.value
    }

    itemList.value.push(itemInfo)

    // 

    // console.log(itemListName.value);
  }

  if (itemList.value.length !== 0) {
    // console.log('there is an item in the list');
    let itemInfo = {
      'name': itemListName.value,
      'qty': itemListQty.value,
      'price': itemListPrice.value,
      'total': itemListPrice.value * itemListQty.value
    }

    itemList.value.push(itemInfo)

    console.log(itemList.value);
  }

  // function one: if the itemList is not empty, the click event must add the info that been added and then show new empty feild for addind new item
}

const onDraft = () => {

  let newId = generateID()

}

// generate id, (return 2 random upper case letters followed by 4 random numbers)
let invoicesIds = []; // This is your array of IDs
let callCounter = 0;  // Counter to track the number of calls
let lastResetTime = Date.now();  // Timestamp to track the last reset time
function generateID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let id = '';

  // load ids for checking
  invoices.value.forEach((item) => {
    invoicesIds.push(item.id)
  })


  // generate the new id
  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 4; i++) {
    id += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return id;

}


const generateIDWithRateLimit = () => {
  const now = Date.now()

  // Check if a minute has passed since the last reset
  if (now - lastResetTime >= 60000) {
    callCounter = 0; // Reset the counter
    lastResetTime = now; // Update the last reset time
  }

  // Check if the call counter is below the limit
  if (callCounter >= 5) {
    throw new Error('Rate limit exceeded: Please try again later.');
  }

  callCounter++; // Increment the counter

  const id = generateID();

  // to prevent duplicate ids
  if (invoicesIds.includes(id)) {
    // Decrement the counter as the call didn't result in a new ID
    callCounter--;
    // controlled recursive, only when the new generated id value is existed in invoicesIds array, then we can call the function again.
    return generateIDWithRateLimit()
  } else {
    return id;
  }

}

const onSubmit = () => {

  validateInvoiceInfo(invoiceInfo);
  checkAllErrors()
  checkItemList()

  let id = generateIDWithRateLimit()

  // console.log(invoiceInfo.value);


  // NOW Almost all data are ready to be saved in local storage

}
</script>


<template>

  <div class="new_modal_overlay" @click.self="closeModal">

    <div class="new_modal">
      <h2>New Invoice</h2>

      <div class="new_modal_content_box">
        <div class="bill_from_group">
          <p class="group_header">Bill From</p>

          <div class="form_group st_address" :class="errors.street ? 'is_empty' : ''">
            <label for="st_address">Street Address <span class="error_msg" v-if="errors.street">Can't be
                empty</span></label>
            <input type="text" id="st_address" v-model="invoiceInfo.street">
          </div>
          <div class="other_info">
            <div class="form_group city" :class="errors.city ? 'is_empty' : ''">
              <label for="city">City</label>
              <input type="text" id="city" v-model="invoiceInfo.city">
            </div>
            <div class="form_group postCode" :class="errors.senderAddressPostCode ? 'is_empty' : ''">
              <label for="postCode">Post Code </label>
              <input type="text" id="postCode" v-model="invoiceInfo.senderAddressPostCode">
            </div>
            <div class="form_group country" :class="errors.senderAddressCountry ? 'is_empty' : ''">
              <label for="country">Country </label>
              <input type="text" id="country" v-model="invoiceInfo.senderAddressCountry">
            </div>
          </div>
        </div>

        <div class="bill_to_group">
          <div class="main_info">
            <p class="group_header">Bill To</p>

            <div class="form_group clientName" :class="errors.clientName ? 'is_empty' : ''">
              <label for="clientName">Client Name <span class="error_msg" v-if="errors.clientName">Can't be
                  empty</span></label>
              <input type="text" id="clientName" v-model="invoiceInfo.clientName">
            </div>

            <div class="form_group clientEmail" :class="errors.clientEmail ? 'is_empty' : ''">
              <label for="clientEmail">Client Email <span class="error_msg" v-if="errors.clientEmail">Can't be
                  empty</span></label>
              <input type="text" id="clientEmail" v-model="invoiceInfo.clientEmail">
            </div>

            <div class="form_group streetAddress" :class="errors.clientName ? 'is_empty' : ''">
              <label for="streetAddress">Street Address <span class="error_msg" v-if="errors.clientAddressStreet">Can't
                  be
                  empty</span></label>
              <input type="text" id="streetAddress" v-model="invoiceInfo.clientAddressStreet">
            </div>
          </div>

          <div class="other_info">
            <div class="form_group city" :class="errors.clientAddressCity ? 'is_empty' : ''">
              <label for="city">City</label>
              <input type="text" id="city" v-model="invoiceInfo.clientAddressCity">
            </div>
            <div class="form_group postCode" :class="errors.clientAddressPostCode ? 'is_empty' : ''">
              <label for="postCode">Post Code </label>
              <input type="text" id="postCode" v-model="invoiceInfo.clientAddressPostCode">
            </div>
            <div class="form_group country" :class="errors.clientAddressCountry ? 'is_empty' : ''">
              <label for="country">Country </label>
              <input type="text" id="country" v-model="invoiceInfo.clientAddressCountry">
            </div>
          </div>

          <div class="dates_info">
            <div class="form_group invoice_date">
              <label for="invoiceDate">Invoice Date</label>
              <div id="invoiceDate" class="invoiceDate">
                <input type="date" id="start" v-model="invoiceInfo.createdAt" />
              </div>
            </div>
            <div class="form_group payment_due">
              <label for="paymentDue">Payment Terms</label>
              <div class="paymentDue" id="paymentDue" @click="togglePaymentTerm">
                <span>Net {{ paymentTermValue }} Day{{ paymentTermValue == 1 ? '' : 's' }}</span>
                <arrowDownIcon />
              </div>

              <div class="paymentTermBox" v-if="showPaymentTerm">
                <span @click="changePaymentTermValue(1)">Net 1 Day</span>
                <span @click="changePaymentTermValue(7)">Net 7 Days</span>
                <span @click="changePaymentTermValue(14)">Net 14 Days</span>
                <span @click="changePaymentTermValue(30)">Net 30 Days</span>
              </div>
            </div>

          </div>

          <div class="form_group desc" :class="errors.clientAddressCountry ? 'is_empty' : ''">
            <label for="desc">Project Description <span class="error_msg" v-if="errors.description">Can't be
                empty</span></label>
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



              <div class="item_info" v-if="itemList.length === 0">
                <input type="text" class="item_name" v-model="item.name">
                <input type="number" class="item_qty" v-model="item.qty">
                <input type="number" class="item_price" v-model="item.price">
                <div class="item_total"> {{ itemListTotal }} </div>
                <deleteIcon />
              </div>

              <div class="item_info" v-else v-for="item in itemList">
                <input type="text" class="item_name" v-model="item.name">
                <input type="number" class="item_qty" v-model="item.qty">
                <input type="number" class="item_price" v-model="item.price">
                <div class="item_total"> {{ item.total }} </div>
                <deleteIcon />
              </div>

            </div>

            <div class="add_new_item_btn" @click="addListItem">
              <plusIcon /> Add New Item
            </div>

            <div class="errors_box">
              <div v-if="allEmpty">- All fields must be added</div>
              <div>- An item must be added</div>
            </div>
          </div>

        </div>
      </div>

      <div class="btns">
        <div>
          <div class="edit-btn" @click="closeModal">Discard</div>
        </div>

        <div>
          <div class="draft-btn" @click="onDraft">Save as Draft</div>
          <div class="primary-btn" @click="onSubmit">Save & Send</div>
        </div>
      </div>

    </div>

  </div>

</template>

<style>
.new_modal_overlay {
  position: absolute;
  right: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  min-height: 100vh;
}

.new_modal_overlay .new_modal {
  position: relative;
  left: 103px;
  z-index: 10;
  width: 616px;
  background-color: var(--bg-clr);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 30px;
  color: var(--txt-clr);
}

.new_modal_overlay .new_modal h2 {
  color: var(--txt-clr);
  letter-spacing: -0.038em !important;
}

.new_modal_overlay .new_modal h2 span {
  color: #888EB0;
}

.new_modal_content_box .bill_from_group {
  margin: 30px 0;
}

.new_modal_content_box .bill_to_group .group_header,
.new_modal_content_box .bill_from_group .group_header {
  font-weight: bold;
  color: var(--primary-clr);
}

.new_modal_content_box .bill_from_group .form_group.st_address {
  margin: 20px 0;
}

.new_modal_content_box .bill_from_group .form_group.st_address label {
  color: var(--txt-clr);
  display: block;
}

.new_modal_content_box .bill_from_group .form_group.st_address input {
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.new_modal_content_box .bill_from_group .form_group.st_address input:focus {
  border: 1px solid var(--primary-clr);
}

.new_modal_content_box .bill_from_group .other_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new_modal_content_box .bill_from_group .other_info .form_group label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.new_modal_content_box .bill_from_group .other_info .form_group input {
  height: 48px;
  width: 152px;
  border: 1px soild var(--txt-clr);
  border-radius: 10px;
  background-color: var(--ele-light-clr);
  color: var(--txt-clr);
  padding: 0 20px;
  outline: none;
}

.new_modal_content_box .bill_from_group .other_info .form_group input:focus {
  border: 1px solid var(--primary-clr);
}


.new_modal_content_box .bill_to_group .main_info {
  margin: 50px 0;
}

.new_modal_content_box .bill_to_group .main_info .form_group {
  margin: 20px 0;
}

.new_modal_content_box .bill_to_group .main_info .form_group.clientName label,
.new_modal_content_box .bill_to_group .main_info .form_group.clientEmail label,
.new_modal_content_box .bill_to_group .main_info .form_group.streetAddress label {
  color: var(--txt-clr);
  display: block;
  margin-bottom: 10px;
}

.new_modal_content_box .bill_to_group .main_info .form_group.clientName input,
.new_modal_content_box .bill_to_group .main_info .form_group.clientEmail input,
.new_modal_content_box .bill_to_group .main_info .form_group.streetAddress input {
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.new_modal_content_box .bill_to_group .other_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.new_modal_content_box .bill_to_group .other_info .form_group label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.new_modal_content_box .bill_to_group .other_info .form_group input {
  height: 48px;
  width: 152px;
  border: 1px soild var(--txt-clr);
  border-radius: 10px;
  background-color: var(--ele-light-clr);
  color: var(--txt-clr);
  padding: 0 20px;
  outline: none;
}

.new_modal_content_box .bill_to_group .dates_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.new_modal_content_box .bill_to_group .dates_info .form_group.payment_due {
  position: relative;
}

.new_modal_content_box .bill_to_group .dates_info .form_group.payment_due:hover {
  cursor: pointer;
}

.new_modal_content_box .bill_to_group .dates_info .form_group.invoice_date label,
.new_modal_content_box .bill_to_group .dates_info .form_group.payment_due label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.new_modal_content_box .bill_to_group .dates_info .form_group.payment_due .paymentDue,
.new_modal_content_box .bill_to_group .dates_info .form_group.invoice_date .invoiceDate {
  border-radius: 10px;
  color: var(--txt-clr);
  padding: 0 20px;
  height: 48px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ele-dark-clr)
}

.new_modal_content_box .bill_to_group .dates_info .form_group.invoice_date .invoiceDate input[type="date"] {
  width: 100%;
  height: inherit;
  /* padding: 0 20px; */
  border-radius: inherit;
  border: none;
  background-color: inherit;
  color: inherit;
}

.new_modal_content_box .bill_to_group .dates_info .form_group.invoice_date .invoiceDate input:focus {
  outline: none;
}

.new_modal_content_box .bill_to_group .dates_info .form_group.payment_due .paymentDue {
  color: var(--txt-clr);
}

.new_modal_content_box .bill_to_group .form_group.desc {
  margin-bottom: 50px;
}

.new_modal_content_box .bill_to_group .form_group.desc label {
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}

.new_modal_content_box .bill_to_group .form_group.desc input {
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.new_modal_content_box .bill_to_group .main_info .form_group.is_empty label,
.new_modal_content_box .bill_to_group .form_group.is_empty label,
.new_modal_content_box .bill_from_group .other_info .form_group.is_empty label,
.new_modal_content_box .bill_from_group .form_group.is_empty label {
  color: var(--danger-clr);
}

.new_modal_content_box .bill_to_group .main_info .form_group.is_empty label .error_msg,
.new_modal_content_box .bill_to_group .form_group.is_empty label .error_msg,
.new_modal_content_box .bill_from_group .other_info .form_group.is_empty label .error_msg,
.new_modal_content_box .bill_from_group .form_group.is_empty label .error_msg {
  float: right;
}

.new_modal_content_box .bill_to_group .main_info .form_group.is_empty input,
.new_modal_content_box .bill_to_group .form_group.is_empty input,
.new_modal_content_box .bill_from_group .other_info .form_group.is_empty input,
.new_modal_content_box .bill_from_group .form_group.is_empty input {
  border: 1px solid var(--danger-clr);
}

.new_modal_content_box .bill_to_group .paymentTermBox {
  width: 240px;
  background-color: var(--ele-light-clr);
  border-radius: 5px;
  position: absolute;
  top: 85px;
  right: 0;
}

.new_modal_content_box .bill_to_group .paymentTermBox span {
  height: 48px;
  line-height: 48px;
  color: var(--txt-clr);
  display: block;
  padding: 0 20px;
}

.new_modal_content_box .bill_to_group .paymentTermBox span:not(:last-child) {

  border-bottom: 1px solid #373B53;
}

.new_modal_content_box .bill_to_group .paymentTermBox span:hover {
  color: var(--primary-clr);
  cursor: pointer;
}

.new_modal_content_box .invoice_items {
  margin-bottom: 50px;
}

.new_modal_content_box .invoice_items header {
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: -.38px;
  color: #777F98;
}

.new_modal_content_box .invoice_items .item_table .table_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}

.new_modal_content_box .invoice_items .item_table .table_header span {
  color: var(--txt-clr);
}

.new_modal_content_box .invoice_items .item_table .table_header span.qty_span {
  margin-left: 150px;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info input:focus {
  /* border: 1px solid var(--primary-clr); */
  outline: 1px solid var(--primary-clr);
  ;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info input {
  color: var(--txt-clr);
  background-color: var(--ele-light-clr);
  border-radius: 5px;
  border: none;
  height: 48px;
  line-height: 48px;
  font-weight: bold;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info input {
  color: var(--txt-clr);
  font-weight: bold;

}

.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_name {
  width: 214px;
  padding-left: 20px;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty {
  width: 46px;
  text-align: center;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_price {
  width: 100px;
  text-align: center;
}

/* .new_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty input[type=number],
.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_price input[type=number] {
  -moz-appearance: textfield;
} */

.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_price input::-webkit-outer-spin-button,
.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_price input::-webkit-inner-spin-button,
.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty input::-webkit-outer-spin-button,
.new_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info svg:hover {
  cursor: pointer;
}

.new_modal_content_box .invoice_items .item_table .table_body .item_info svg:hover path {
  fill: var(--danger-clr) !important;
}

.new_modal_content_box .invoice_items .item_table .add_new_item_btn {
  height: 48px;
  width: 100%;
  line-height: 48px;
  background-color: var(--gray-clr);
  color: var(--txt-clr);
  margin-top: 20px;
  border-radius: 30px;
  text-align: center;
}

.new_modal_content_box .invoice_items .item_table .add_new_item_btn:hover {
  cursor: pointer;
}


.new_modal_content_box .invoice_items .item_table .errors_box {
  margin-top: 30px;
  color: var(--danger-clr);
}


.new_modal_overlay .new_modal .btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new_modal_overlay .new_modal .btns>div:last-child {
  display: flex;
}

.new_modal_overlay .new_modal .btns .draft-btn {
  margin-right: 20px;
}
</style>