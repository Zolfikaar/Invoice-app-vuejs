<script setup>
import {ref,onMounted} from 'vue'
import { useInvoiceStore } from '@/stores/invoiceStore'

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
</script>
<template>
  <div class="invoice__content" v-if="invoice">
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
        <div class="edit-btn">Edit</div>
        <div class="delete-btn">Delete</div>
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
;lfvcs
      </div>

    </div>
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
  height: 88px;
  background-color: var(--elements-clr);
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

.invoice__content .invoice__header .left p{
  margin-right: 20px;
}
.invoice__content .invoice__header .left,
.invoice__content .invoice__header .right{
  display: flex;
  align-items: center;
}
.invoice__content .invoice__header .right .delete-btn{
  margin: 0 10px;
}

/* ============================================================================ */
/* ================================= Content ================================== */
/* ============================================================================ */

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
.invoice__content .content .middle .details .dates .details__group:last-child{
  margin-top: 30px;
}
.invoice__content .content .middle .details .bill_info .details__group:last-child{
  margin-top: 10px;
}
.invoice__content .content .middle .details .details__group p{
  color: var(--txt-secondary);
}
.invoice__content .content .middle .details .details__group h3{
  margin-top: 10px;
  color: var(--txt-clr);
}
.invoice__content .content .bottom{
  margin-top: 50px;
  min-height: 264px;
  background-color: var(--cancel-btn);
  border-radius: 10px;
  color: var(--txt-clr);
}



.invoice__content .content{
  border-radius: 10px;
  padding: 50px;
  background-color: var(--elements-clr);
}
</style>