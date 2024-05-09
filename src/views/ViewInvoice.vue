<script setup>
import {ref,onMounted} from 'vue'
import { useInvoiceStore } from '@/stores/invoiceStore'
import arrowLeft from '@/components/icons/IconArrowLeft.vue'
import calendarIcon from '@/components/icons/IconCalendar.vue'
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import deleteIcon from '@/components/icons/IconDelete.vue'
import plusIcon from '@/components/icons/IconPlus.vue'
import EditModal from '@/components/EditModal.vue'

// const emit = defineEmits(['onEdit'])

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

let invoice = ref()
onMounted( () => {
  invoice.value = useInvoiceStore().getInvoice(props.id)[0]
})

let toggleDeleteModal = ref(false)
const onDelete = () => {
  toggleDeleteModal.value = !toggleDeleteModal.value
}

let toggleEditModal = ref(false)
const onEdit = () => {
  toggleEditModal.value = !toggleEditModal.value
  // emit('onEdit', invoice)
}
</script>
<template>
  <div class="delete_modal_overlay" v-if="toggleDeleteModal">

    <div class="delete_modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete invoice #{{ invoice.id }}? This action cannot be undone.</p>
      <div class="btns">
        <div class="edit-btn" @click="toggleDeleteModal = !toggleDeleteModal">Cancel</div>
        <div class="delete-btn" >Delete</div>
      </div>
    </div>

  </div>

  <!-- <EditModal :editInvoice="invoice" :showEditModal="toggleEditModal" /> -->
  <div class="edit_modal_overlay" v-if="toggleEditModal">

  <div class="edit_modal">
    <h2>Edit <span>#</span>{{ invoice.id }}</h2>

    <div class="edit_modal_content_box">
      <div class="bill_from_group">
        <p class="group_header">Bill From</p>
        
        <div class="form_group st_address">
          <label for="st_address">Street Address</label>
          <input type="text" id="st_address" :value="invoice.senderAddress.street">
        </div>
        <div class="other_info">
          <div class="form_group city">
            <label for="city">City</label>
            <input type="text" id="city" :value="invoice.senderAddress.city">
          </div>
          <div class="form_group postCode">
            <label for="postCode">Post Code</label>
            <input type="text" id="postCode" :value="invoice.senderAddress.postCode">
          </div>
          <div class="form_group country">
            <label for="country">Country</label>
            <input type="text" id="country" :value="invoice.senderAddress.country">
          </div>
        </div>
      </div>

      <div class="bill_to_group">
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
            <div class="paymentDue" id="paymentDue" :value="invoice.paymentDue">
              <span>net 30 days</span>
              <arrowDownIcon />
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

      </div>
    </div>

    <div class="btns">
        <div class="edit-btn" @click="toggleEditModal = !toggleEditModal">Cancel</div>
        <div class="primary-btn" >Save Changes</div>
    </div>

  </div>

  </div>


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
        <div class="edit-btn" @click="onEdit">Edit</div>
        <div class="delete-btn" @click="onDelete">Delete</div>
        <div class="primary-btn">Mark as Paid</div>
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
                  <h4>{{ item.price }}</h4>
                </div>

              </div>

              <div class="total">
                <h4>{{ item.total }}</h4>
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
  </div>
</template>

<style scoped>
/* ================================================================ */
/* ================================================================ */
/* ========================= Modals =============================== */
/* ================================================================ */
/* ================================================================ */
/* ========================= Delete Modal =================================== */
.delete_modal_overlay{
  position: absolute;
  z-index: 6;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  min-height: 100vh;
}
.delete_modal_overlay .delete_modal{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10;
  width: 480px;
  height: 250px;
  background-color: var(--ele-dark-clr);
  border-radius: 10px;
  padding: 30px;
}
.delete_modal_overlay .delete_modal h2{color: var(--txt-clr);letter-spacing: -0.038em !important;}
.delete_modal_overlay .delete_modal p{color: var(--txt-gray);margin: 20px 0;}
.delete_modal_overlay .delete_modal .btns{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.delete_modal_overlay .delete_modal .btns .edit-btn{margin-right: 10px;}

/* ========================= Edit Modal =================================== */
.edit_modal_overlay{
  position: absolute;
  right: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  min-height: 100vh;
}
.edit_modal_overlay .edit_modal{
  position: relative;
  left: 103px;
  z-index: 10;
  width: 616px;
  background-color: var(--bg-clr);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 30px;
}
.edit_modal_overlay .edit_modal h2{color: var(--txt-clr);letter-spacing: -0.038em !important;}
.edit_modal_overlay .edit_modal h2 span{color: #888EB0;}

.edit_modal_content_box .bill_from_group{margin: 30px 0;}
.edit_modal_content_box .bill_to_group .group_header,
.edit_modal_content_box .bill_from_group .group_header {font-weight: bold; color: var(--primary-clr);}
.edit_modal_content_box .bill_from_group .form_group.st_address{
  margin: 20px 0;
}
.edit_modal_content_box .bill_from_group .form_group.st_address label{color: var(--txt-clr);display: block;}
.edit_modal_content_box .bill_from_group .form_group.st_address input{
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}
.edit_modal_content_box .bill_from_group .form_group.st_address input:focus{border: 1px solid var(--primary-clr);}

.edit_modal_content_box .bill_from_group .other_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit_modal_content_box .bill_from_group .other_info .form_group label{
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}
.edit_modal_content_box .bill_from_group .other_info .form_group input{
  height: 48px;
  width: 152px;
  border: 1px soild var(--txt-clr);
  border-radius: 10px;
  background-color: var(--ele-light-clr);
  color: var(--txt-clr);
  padding: 0 20px;
  outline: none;
}
.edit_modal_content_box .bill_from_group .other_info .form_group input:focus{border: 1px solid var(--primary-clr);}


.edit_modal_content_box .bill_to_group .main_info{margin: 50px 0;}
.edit_modal_content_box .bill_to_group .main_info .form_group{margin: 20px 0;}
.edit_modal_content_box .bill_to_group .main_info .form_group.clientName label,
.edit_modal_content_box .bill_to_group .main_info .form_group.clientEmail label,
.edit_modal_content_box .bill_to_group .main_info .form_group.streetAddress label{
  color: var(--txt-clr);
  display: block;
  margin-bottom: 10px;
}

.edit_modal_content_box .bill_to_group .main_info .form_group.clientName input,
.edit_modal_content_box .bill_to_group .main_info .form_group.clientEmail input,
.edit_modal_content_box .bill_to_group .main_info .form_group.streetAddress input{
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}

.edit_modal_content_box .bill_to_group .other_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.edit_modal_content_box .bill_to_group .other_info .form_group{}
.edit_modal_content_box .bill_to_group .other_info .form_group label{
  display: block;
  color: var(--txt-clr);
  margin-bottom: 10px;
}
.edit_modal_content_box .bill_to_group .other_info .form_group input{
  height: 48px;
  width: 152px;
  border: 1px soild var(--txt-clr);
  border-radius: 10px;
  background-color: var(--ele-light-clr);
  color: var(--txt-clr);
  padding: 0 20px;
  outline: none;
}

.edit_modal_content_box .bill_to_group .dates_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date{}
.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due:hover{cursor: pointer;}

.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date label,
.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due label{display: block;color: var(--txt-clr);margin-bottom: 10px;}

.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due .paymentDue,
.edit_modal_content_box .bill_to_group .dates_info .form_group.invoice_date .invoiceDate{
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
.edit_modal_content_box .bill_to_group .dates_info .form_group.payment_due .paymentDue{
  color: var(--txt-clr);
}
.edit_modal_content_box .bill_to_group .form_group.desc{margin-bottom: 50px;}
.edit_modal_content_box .bill_to_group .form_group.desc label{display: block;color: var(--txt-clr);margin-bottom: 10px;}
.edit_modal_content_box .bill_to_group .form_group.desc input{
  height: 48px;
  width: 100%;
  padding: 0 20px;
  outline: none;
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  border: 1px soild var(--txt-gray);
  color: var(--txt-clr);
}






.edit_modal_content_box .invoice_items{
  margin-bottom: 50px;
}

.edit_modal_content_box .invoice_items header{ 
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: -.38px;
  color: #777F98;
}
.edit_modal_content_box .invoice_items .item_table{} 
.edit_modal_content_box .invoice_items .item_table .table_header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
} 
.edit_modal_content_box .invoice_items .item_table .table_header span{
  color: var(--txt-clr);
}
.edit_modal_content_box .invoice_items .item_table .table_header span.qty_span{margin-left: 150px;}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.edit_modal_content_box .invoice_items .item_table .table_body .item_info div:not(:last-of-type){
  color: var(--txt-clr);
  background-color: var(--ele-light-clr);
  border-radius: 5px;
  height: 48px;
  line-height: 48px;
  font-weight: bold;
}
.edit_modal_content_box .invoice_items .item_table .table_body .item_info div:last-of-type{
  color: var(--txt-clr);
}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_name{
  width: 214px;
  padding-left: 20px;
}
.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_qty{
  width: 46px;
  text-align: center;
}
.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_price{
  width: 100px;
  text-align: center;
}
.edit_modal_content_box .invoice_items .item_table .table_body .item_info .item_total{}

.edit_modal_content_box .invoice_items .item_table .table_body .item_info svg:hover{cursor: pointer;}
.edit_modal_content_box .invoice_items .item_table .table_body .item_info svg:hover path{fill: var(--danger-clr) !important;}


.edit_modal_content_box .invoice_items .item_table .add_new_item_btn{
  height: 48px;
  width: 100%;
  line-height: 48px;
  background-color: var(--gray-clr);
  color: var(--txt-clr);
  margin-top: 20px;
  border-radius: 30px;
  text-align: center;
}
.edit_modal_content_box .invoice_items .item_table .add_new_item_btn:hover{cursor: pointer;}


.edit_modal_content_box .invoice_items .item_table .errors_box{
  margin-top: 30px;
  color: var(--danger-clr);
}


.edit_modal_overlay .edit_modal .btns{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.edit_modal_overlay .edit_modal .btns .edit-btn{margin-right: 20px;}

/* ================================================================ */
/* ================================================================ */
/* ============================ Header ============================ */
/* ================================================================ */
/* ================================================================ */

.invoice__content{
  margin: 40px auto 50px auto;
  width: 60%;
  color: var(--txt-clr);
}
.back_btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 50px;
  margin: 20px 0;
}
.back_btn:hover{
  cursor: pointer;
  color: var(--txt-gray);
}
.back_btn:hover{
  color: var(--txt-secondary);

}
.back_btn svg{margin-bottom: 5px;}
.invoice__content .invoice__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  height: 88px;
  background-color: var(--ele-dark-clr);
  border-radius: 10px;
  padding: 0 30px;
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
.invoice__content .invoice__header .left p{margin-right: 20px;}
.invoice__content .invoice__header .left,
.invoice__content .invoice__header .right{
  display: flex;
  align-items: center;
}
.invoice__content .invoice__header .right .delete-btn{margin: 0 10px;}

/* ======================================================================= */
/* =============================== Content ================================ */
/* ===================================== ================================= */

.invoice__content .content{
  border-radius: 10px;
  padding: 50px;
  background-color: var(--ele-dark-clr);
}
.invoice__content .content .top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.invoice__content .content .middle .details{
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
}
.invoice__content .content .middle .details .dates .details__group:last-child{margin-top: 30px;}
.invoice__content .content .middle .details .bill_info .details__group:last-child{margin-top: 10px;}
.invoice__content .content .middle .details .details__group p{color: var(--txt-secondary);}
.invoice__content .content .middle .details .details__group h3{
  margin-top: 10px;
  color: var(--txt-clr);
}
.invoice__content .content .bottom{
  margin-top: 50px;
  /* min-height: 264px; */
  background-color: var(--ele-light-clr);
  border-radius: 10px;
  color: var(--txt-clr);
}

.invoice__content .content .bottom .items_table{
  padding: 30px 0 100px 0;
  position: relative;
  min-height: 170px;
}
.invoice__content .content .bottom .table_header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--txt-gray);
  padding: 0 30px;
}
.invoice__content .content .bottom .table_body{
  padding: 0 30px;
}
.invoice__content .content .bottom .table_body .item_row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price{
  display: flex;
  justify-content: space-between;
  width: 69%;
}

.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .qty_and_price{
  display: flex;
  justify-content: space-between;
  width: 47%;
}

.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .name h4,
.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .qty_and_price h4{
  color: var(--txt-gray);
}
.invoice__content .content .bottom .table_body .item_row .name_and_qty_and_price .total h4{color: var(--txt-clr);}

.invoice__content .content .bottom .table_footer{
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
.invoice__content .content .bottom .table_footer h2 span{
  margin-right: 10px;
}
</style>