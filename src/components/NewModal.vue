<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['onShowNewModal'])
let data = ref([])

onMounted(() => {

})
</script>


<template>

  <div class="edit_modal_overlay">

    <div class="edit_modal">
      <h2>New Invoice</h2>



      <div class="edit_modal_content_box">
        <div class="bill_from_group">
          <p class="group_header">Bill From</p>

          <div class="form_group st_address">
            <label for="st_address">Street Address</label>
            <input type="text" id="st_address" v-model="data">
          </div>
          <div class="other_info">
            <div class="form_group city">
              <label for="city">City</label>
              <input type="text" id="city" v-model="data">
            </div>
            <!-- <div class="form_group postCode">
          <label for="postCode">Post Code</label>
          <input type="text" id="postCode" :value="invoice.senderAddress.postCode">
        </div>
        <div class="form_group country">
          <label for="country">Country</label>
          <input type="text" id="country" :value="invoice.senderAddress.country">
        </div> -->
          </div>
        </div>

        <!-- <div class="bill_to_group">
      <div class="main_info">
        <p class="group_header">Bill To</p>

        <div class="form_group clientName">
          <label for="clientName">Client Name</label>
          <input type="text" id="clientName" :value="invoice.clientName">
        </div>

        <div class="form_group clientEmail">
          <label for="clientEmail">Client Email</label>
          <input type="text" id="clientEmail" :value="invoice.clientEmail">
        </div>

        <div class="form_group streetAddress">
          <label for="streetAddress">Street Address</label>
          <input type="text" id="streetAddress" :value="invoice.clientAddress.street">
        </div>
      </div>

      <div class="other_info">
        <div class="form_group city">
          <label for="city">City</label>
          <input type="text" id="city" :value="invoice.clientAddress.city">
        </div>
        <div class="form_group postCode">
          <label for="postCode">Post Code</label>
          <input type="text" id="postCode" :value="invoice.clientAddress.postCode">
        </div>
        <div class="form_group country">
          <label for="country">Country</label>
          <input type="text" id="country" :value="invoice.clientAddress.country">
        </div>
      </div>

      <div class="dates_info">
        <div class="form_group invoice_date">
          <label for="invoiceDate">Invoice Date</label>
          <div id="invoiceDate" class="invoiceDate">
            {{ invoice.createdAt }}
            <calendarIcon />
          </div>
        </div>
        <div class="form_group payment_due">
          <label for="paymentDue">Payment Terms</label>
          <div class="paymentDue" id="paymentDue" :value="invoice.paymentDue" @click="togglePaymentTerm">
            <span>net 30 days</span>
            <arrowDownIcon />
          </div>

          <div class="paymentTermBox" v-if="showPaymentTerm">
            <span>Net 1 Day</span>
            <span>Net 7 Days</span>
            <span>Net 14 Days</span>
            <span>Net 30 Days</span>
          </div>
        </div>

      </div>

      <div class="form_group desc">
        <label for="desc">Project Description</label>
        <input type="text" id="desc" :value="invoice.description">
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
          <div class="item_info" v-for="item in invoice.items">
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

    </div> -->
      </div>

      <div class="btns">
        <div class="edit-btn" @click="">Cancel</div>
        <div class="primary-btn" @click="">Save Changes</div>
      </div>

    </div>

  </div>

</template>

<style scoped></style>