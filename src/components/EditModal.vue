<script setup>
import { ref, onMounted } from 'vue'
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import deleteIcon from '@/components/icons/IconDelete.vue'
import plusIcon from '@/components/icons/IconPlus.vue'

const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['toggleEditModal', 'update-invoice'])

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

onMounted(() => {

})

let showPaymentTerm = ref(false)
const togglePaymentTerm = () => {
  showPaymentTerm.value = !showPaymentTerm.value
}

let paymentTermValue = ref(30)
const changePaymentTermValue = (val) => {
  paymentTermValue.value = val
  showPaymentTerm.value = false
  invoiceInfo.value.paymentTerms = val

  let paymentTermsVal = val;

  let createdAtVal = invoiceInfo.value.createdAt

  if (createdAtVal == null) {

    // Create a date object for the current date
    let currentDate = new Date();

    // Function to pad single digit months and days with a leading zero
    function pad(number) {
      return number < 10 ? '0' + number : number;
    }

    // Extract the year, month, and day from the date object
    let year = currentDate.getFullYear();
    let month = pad(currentDate.getMonth() + 1); // Add 1 to the month since it is zero-indexed
    let day = pad(currentDate.getDate());

    // Format the date
    let formatted_date = `${year}-${month}-${day}`;

    createdAtVal = formatted_date

    invoiceInfo.value.createdAt = createdAtVal
  }


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
  description: false,
  clientName: false,
  clientEmail: false,
  senderAddressStreet: false,
  senderAddressCity: false,
  senderAddressPostCode: false,
  senderAddressCountry: false,
  clientAddressStreet: false,
  clientAddressCity: false,
  clientAddressPostCode: false,
  clientAddressCountry: false,
})

// // Check if all values in the errors object are true
let allEmpty = ref(true)
function checkAllErrors() {

  // Get the values of the errors object
  const errorValues = Object.values(errors.value);

  // Check if all values are true
  const allErrorsTrue = errorValues.every(value => value === true);

  const allErrorsFalse = errorValues.every(value => value === false);

  // Display an error message if all values are true
  if (allErrorsTrue) {
    allEmpty.value = true
  }
  if (allErrorsFalse) {
    allEmpty.value = false
  }

}

function validateInvoiceInfo(invoiceInfo) {

  if (invoiceInfo.description === '') {
    errors.value.description = true
  } else {
    errors.value.description = false
  }

  if (invoiceInfo.clientEmail === '') {
    errors.value.clientEmail = true
  } else {
    errors.value.clientEmail = false
  }

  if (invoiceInfo.clientName === '') {
    errors.value.clientName = true
  } else {
    errors.value.clientName = false
  }

  if (invoiceInfo.items.length === 0) {
    emptyList.value = true
  } else {
    emptyList.value = false
  }


  if (invoiceInfo.senderAddress.street === '') {
    errors.value.senderAddressStreet = true
  } else {
    errors.value.senderAddressStreet = false
  }
  if (invoiceInfo.senderAddress.city === '') {
    errors.value.senderAddressCity = true
  } else {
    errors.value.senderAddressCity = false
  }
  if (invoiceInfo.senderAddress.country === '') {
    errors.value.senderAddressCountry = true
  } else {
    errors.value.senderAddressCountry = false
  }
  if (invoiceInfo.senderAddress.postCode === '') {
    errors.value.senderAddressPostCode = true
  } else {
    errors.value.senderAddressPostCode = false
  }

  if (invoiceInfo.clientAddress.street === '') {
    errors.value.clientAddressStreet = true
  } else {
    errors.value.clientAddressStreet = false
  }
  if (invoiceInfo.clientAddress.city === '') {
    errors.value.clientAddressCity = true
  } else {
    errors.value.clientAddressCity = false
  }
  if (invoiceInfo.clientAddress.country === '') {
    errors.value.clientAddressCountry = true
  } else {
    errors.value.clientAddressCountry = false
  }
  if (invoiceInfo.clientAddress.postCode === '') {
    errors.value.clientAddressPostCode = true
  } else {
    errors.value.clientAddressPostCode = false
  }

  checkAllErrors()

}

let itemListId = 0
let itemListName = ref()
let itemListQty = ref()
let itemListPrice = ref()
let itemListTotal = ref(0)

let itemList = ref([])

let emptyList = ref(true)
function checkItemList() {

  // check if inputs are filled
  if (itemListName.value !== undefined && itemListQty.value !== undefined && itemListPrice.value !== undefined) {

    // increment item id befor adding it to the array to avoid initial value
    itemListId++

    // group the data from inputs
    let itemData = {
      id: itemListId,
      name: itemListName.value,
      quantity: itemListQty.value,
      price: itemListPrice.value,
      total: itemListQty.value * itemListPrice.value,
    }

    // push item data to itemList array
    itemList.value.push(itemData)

    // change error status
    emptyList.value = false

    // the itemListId will not be reseted, because we need it for adding the next new element

    // reset inputs
    itemListName = ref()
    itemListQty = ref()
    itemListPrice = ref()
    itemListTotal = ref(0)


    return itemData

  }

}

const updateItemList = (item) => {
  let oldItemIndex = invoiceInfo.value.items.indexOf(item)
  invoiceInfo.value.items[oldItemIndex].total = item.qty * item.price
}

const deleteListItem = (item) => {
  let currentItemIndex = invoiceInfo.value.items.indexOf(item)
  let currentItem = invoiceInfo.value.items[currentItemIndex]
  invoiceInfo.value.items.pop(currentItem)
  itemList.value.pop(currentItem)
}

const addListItem = () => {
  let listitems = checkItemList()
  if (listitems !== undefined) {
    invoiceInfo.value.items.push(listitems)
    emptyList.value = false
  }

}



const onEdit = () => {
  // console.log(invoiceInfo.value);

  validateInvoiceInfo(invoiceInfo.value);

  // only if all fields are filled and the item list is not empty, then add the invoice 

  if (!allEmpty.value && !emptyList.value) {

    // invoice total from item totals
    let invoiceTotal = 0
    invoiceInfo.value.items.forEach((itemTotal) => invoiceTotal += itemTotal.total)

    invoiceInfo.value.total = invoiceTotal
    invoiceInfo.value.status = 'pending'

    // NOW all data are ready to be saved in local storage
    // get current invoice with old data

    let invoices = JSON.parse(localStorage.getItem('invoices'))

    let currentInvoice = invoices.filter((invoice) => invoice.id == invoiceInfo.value.id)

    let invoiceIndex = invoices.indexOf(currentInvoice[0])

    // removeing the old feedbacks from local storage
    if (invoiceIndex > -1) { // only splice array when item is found
      invoices.splice(invoiceIndex, 1) // 2nd parameter means remove one item only
    }

    invoices.push(invoiceInfo.value)

    localStorage.setItem('invoices', JSON.stringify(invoices))



    closeModal()


  }

  emit('update-invoice', true)
  // console.log(invoiceInfo.value.senderAddress.street);
}

const closeModal = () => emit('toggleEditModal')


</script>

<template>
  <div class="edit_modal_overlay" @click.self="closeModal">

    <div class="edit_modal">
      <h2>Edit <span>#</span>{{ invoice.id }}</h2>

      <div class="edit_modal_content_box">
        <div class="bill_from_group">
          <p class="group_header">Bill From</p>

          <div class="form_group st_address" :class="errors.senderAddressStreet ? 'is_empty' : ''">
            <label for="st_address">Street Address <span class="error_msg" v-if="errors.senderAddressStreet">Can't be
                empty</span></label>
            <input type="text" id="st_address" v-model="invoiceInfo.senderAddress.street">

          </div>

          <div class="other_info">
            <div class="form_group city" :class="errors.senderAddressCity ? 'is_empty' : ''">
              <label for="city">City</label>
              <input type="text" id="city" v-model="invoiceInfo.senderAddress.city">

            </div>
            <div class="form_group postCode" :class="errors.senderAddressPostCode ? 'is_empty' : ''">
              <label for="postCode">Post Code </label>
              <input type="text" id="postCode" v-model="invoiceInfo.senderAddress.postCode">

            </div>
            <div class="form_group country" :class="errors.senderAddressCountry ? 'is_empty' : ''">
              <label for="country">Country </label>
              <input type="text" id="country" v-model="invoiceInfo.senderAddress.country">

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
              <input type="text" id="streetAddress" v-model="invoiceInfo.clientAddress.street">

            </div>
          </div>

          <div class="other_info">
            <div class="form_group city" :class="errors.clientAddressCity ? 'is_empty' : ''">
              <label for="city">City</label>
              <input type="text" id="city" v-model="invoiceInfo.clientAddress.city">

            </div>
            <div class="form_group postCode" :class="errors.clientAddressPostCode ? 'is_empty' : ''">
              <label for="postCode">Post Code </label>
              <input type="text" id="postCode" v-model="invoiceInfo.clientAddress.postCode">

            </div>
            <div class="form_group country" :class="errors.clientAddressCountry ? 'is_empty' : ''">
              <label for="country">Country </label>
              <input type="text" id="country" v-model="invoiceInfo.clientAddress.country">

            </div>
          </div>

          <div class="dates_info">
            <div class="form_group invoice_date">
              <label for="invoiceDate">Invoice Date</label>
              <div id="invoiceDate" class="invoiceDate">
                <input type="date" id="start" v-model="invoiceInfo.createdAt"
                  v-if="invoiceInfo.createdAt !== null ? invoiceInfo.createdAt : 'mm/dd/yyyy'" disabled />
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

          <div class="form_group desc" :class="errors.description ? 'is_empty' : ''">
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

              <div class="item_info" v-for="item in invoiceInfo.items">
                <input type="text" class="item_name" v-model="item.name">
                <input type="number" class="item_qty" v-model="item.quantity" @input="updateItemList(item)">
                <input type="number" class="item_price" v-model="item.price" @input="updateItemList(item)">
                <div class="item_total"> {{ item.total }} </div>
                <deleteIcon @click="deleteListItem(item)" />
              </div>

              <div class="item_info new_row" v-if="invoiceInfo.items.length === 0">
                <input type="text" class="item_name" v-model="itemListName">
                <input type="number" class="item_qty" v-model="itemListQty">
                <input type="number" class="item_price" v-model="itemListPrice">
                <div class="item_total"> {{ itemListQty * itemListPrice || itemListTotal }} </div>
              </div>

              <div class="item_info new_row" v-else="itemList.length > 0">
                <input type="text" class="item_name" v-model="itemListName">
                <input type="number" class="item_qty" v-model="itemListQty">
                <input type="number" class="item_price" v-model="itemListPrice">
                <div class="item_total"> {{ itemListQty * itemListPrice || itemListTotal }} </div>
              </div>



            </div>

            <div class="add_new_item_btn" @click="addListItem">
              <plusIcon /> Add New Item / Update Item
            </div>

            <div class="errors_box">
              <div v-if="allEmpty">- All fields must be added</div>
              <div v-if="invoiceInfo.items.length === 0">- An item must be added</div>
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
  color: var(--txt-clr);
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
  background-color: var(--ele-dark-clr);
}

.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date .invoiceDate input {
  background-color: var(--ele-dark-clr);
  color: rgba(126, 136, 195, .5);
  border: none;
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

.edit_modal_content_box .invoice_items .item_table .table_body .item_info.new_row {
  margin-right: 50px
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info input:focus {
  /* border: 1px solid var(--primary-clr); */
  outline: 1px solid var(--primary-clr);
  ;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info input {
  color: var(--txt-clr);
  background-color: var(--ele-light-clr);
  border-radius: 5px;
  border: none;
  height: 48px;
  line-height: 48px;
  font-weight: bold;
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info input {
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

.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_price input::-webkit-outer-spin-button,
.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_price input::-webkit-inner-spin-button,
.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty input::-webkit-outer-spin-button,
.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

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

.edit_modal_content_box .bill_to_group .main_info .form_group.is_empty label,
.edit_modal_content_box .bill_to_group .form_group.is_empty label,
.edit_modal_content_box .bill_from_group .other_info .form_group.is_empty label,
.edit_modal_content_box .bill_from_group .form_group.is_empty label {
  color: var(--danger-clr);
}

.edit_modal_content_box .bill_to_group .main_info .form_group.is_empty label .error_msg,
.edit_modal_content_box .bill_to_group .form_group.is_empty label .error_msg,
.edit_modal_content_box .bill_from_group .other_info .form_group.is_empty label .error_msg,
.edit_modal_content_box .bill_from_group .form_group.is_empty label .error_msg,
.edit_modal_content_box .bill_to_group .form_group.desc.is_empty label .error_msg {
  float: right;
}

.edit_modal_content_box .bill_to_group .main_info .form_group.is_empty input,
.edit_modal_content_box .bill_to_group .form_group.is_empty input,
.edit_modal_content_box .bill_from_group .other_info .form_group.is_empty input,
.edit_modal_content_box .bill_from_group .form_group.is_empty input {
  border: 1px solid var(--danger-clr);
}

@media screen and (min-width: 679px) and (max-width: 1180px) {
  .edit_modal_overlay .edit_modal {
    left: 0;
    top: 80px;
  }
}
</style>