<script setup>
import { useInvoiceStore } from '@/stores/invoiceStore'
import { ref, onMounted } from 'vue'
import illustration from '@/components/icons/illustrationEmpty.vue'
import plusIcon from '@/components/icons/IconPlus.vue'
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import arrowRightIcon from '@/components/icons/IconArrowRight.vue'
import checkIcon from '@/components/icons/IconCheck.vue'
import NewModal from '@/components/NewModal.vue'

const emit = defineEmits(['invoice-updated'])

let showFilters = ref(false)
const showHideFiltersBox = () => {
  showFilters.value = !showFilters.value
}

let filters = ref([
  {
    'name': 'draft',
    'val': false,
  },
  {
    'name': 'pending',
    'val': false,
  },
  {
    'name': 'paid',
    'val': false,
  },
])

const toggleFilters = (index, filterName) => {
  filters.value[index].val = !filters.value[index].val
  filterInvoices()
}

let invoices = ref()
onMounted(async () => {
  invoices.value = await useInvoiceStore().getInvoices()
  filteredInvoices.value = invoices.value
})

let filteredInvoices = ref()
const filterInvoices = () => {
  // Get active filters
  const activeFilters = filters.value.filter(filter => filter.val).map(filter => filter.name)

  // If no filters are selected, display all invoices
  if (activeFilters.length === 0) {
    filteredInvoices.value = invoices.value
  } else {
    // Filter invoices based on selected filters
    filteredInvoices.value = invoices.value.filter(invoice => activeFilters.includes(invoice.status))
  }
}


const rerenderInvoices = (dataAdded) => {

  if (dataAdded) {

    const updatedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];

    invoices.value = updatedInvoices;

    filteredInvoices.value = invoices.value
  }

  // call showNotification()
}


let showNewModal = ref(false)
const toggleNewModal = () => {
  showNewModal.value = !showNewModal.value
  showFilters.value = false
}

</script>

<template>

  <NewModal v-if="showNewModal" @closeNewModal="toggleNewModal" @invoice-updated="rerenderInvoices" />

  <main class="home__content" @click.self="showFilters = false">

    <div class="content__header">

      <div class="left">
        <h1>Invoices</h1>
        <div v-if="invoices" class="invoice_count">
          <p class="lg_invoice_count">There are {{ invoices.length }} total invoices</p>
          <p class="sm_invoice_count">{{ invoices.length }} invoices</p>
        </div>
        <div class="no__invoices" v-else>
          <p>No Invoices</p>
        </div>
      </div>

      <div class="right">
        <div class="filters lg_filters">
          Filter by
          <div class="filter__select" @click="showHideFiltersBox">
            <span>status</span>
            <arrowDownIcon />
          </div>
          <div class="filters-box" v-if="showFilters">
            <div v-for="(filter, index) in filters" :key="index">
              <div class="filter__group" :class="filter.val ? 'checked' : ''">
                <div class="checkbox" @click="toggleFilters(index, filter.name)">
                  <checkIcon v-if="filter.val" />
                </div>
                <label>{{ filter.name }}</label>
              </div>


            </div>
          </div>
        </div>

        <div class="filters sm_filters">
          Filter
          <div class="filter__select" @click="showHideFiltersBox">
            <arrowDownIcon />
          </div>
          <div class="filters-box" v-if="showFilters">
            <div v-for="(filter, index) in filters" :key="index">
              <div class="filter__group" :class="filter.val ? 'checked' : ''">
                <div class="checkbox" @click="toggleFilters(index, filter.name)">
                  <checkIcon v-if="filter.val" />
                </div>
                <label>{{ filter.name }}</label>
              </div>


            </div>
          </div>
        </div>

        <div class="create__invoice__btn" @click="toggleNewModal">
          <span class="arrow__icon">
            <plusIcon />
          </span>
          <span class="lg_new_btn">New Invoice</span>
          <span class="sm_new_btn">New</span>
        </div>
      </div>

    </div>

    <div class="invoices lg_invoices" v-if="invoices">

      <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice">
        <router-link :to="{ path: 'view-invoice/' + invoice.id }">
          <span class="invoice__id"><span>#</span>{{ invoice.id }}</span>
          <p class="payment__due">{{ invoice.paymentDue }}</p>
          <p class="client__name">{{ invoice.clientName }}</p>
          <h3 class="invoice__total">${{ invoice.total }}</h3>
          <div class="invoice__status" :class="invoice.status + '-btn'">
            <div class="layer">
              <span></span>{{ invoice.status }}
            </div>
          </div>
          <arrowRightIcon />
        </router-link>
      </div>

    </div>

    <div class="invoices sm_invoices" v-if="invoices">

      <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice">
        <router-link :to="{ path: 'view-invoice/' + invoice.id }">

          <div class="left">
            <span class="invoice__id"><span>#</span>{{ invoice.id }}</span>

            <p class="payment__due">{{ invoice.paymentDue }}</p>

            <h3 class="invoice__total">${{ invoice.total }}</h3>
          </div>

          <div class="right">
            <p class="client__name">{{ invoice.clientName }}</p>

            <div class="invoice__status" :class="invoice.status + '-btn'">
              <div class="layer">
                <span></span>{{ invoice.status }}
              </div>
            </div>
          </div>



        </router-link>
      </div>

    </div>

    <div class="no__invoices_content" v-else>
      <illustration />

      <div>
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the
          New Invoice button and get started</p>
      </div>
    </div>

  </main>
</template>

<style>
.home__content {
  position: relative;
  width: 60%;
  margin: 50px auto;
  color: var(--txt-clr);
}

/* ===================================================
====================== Header  =======================
=================================================== */
.content__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  position: relative;
}

.content__header .left p {
  margin-top: 10px;
}

.content__header .left .invoice_count .lg_invoice_count {
  display: inline-block;
}

.content__header .left .invoice_count .sm_invoice_count {
  display: none;
}

.content__header .right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.content__header .right .filters {
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -.25px;
  font-weight: bold;
}

.content__header .right .filters.sm_filters {
  display: none;
}

.content__header .right .filters .filter__select {
  display: inline-block;
}

.content__header .right .filters .filter__select:hover {
  cursor: pointer;
}

.content__header .right .filters .filters-box {
  position: absolute;
  top: 60px;
  right: 188px;
  width: 192px;
  height: 128px;
  background-color: var(--ele-dark-clr);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  z-index: 5;
  box-shadow: 0px 0px 10px 5px var(--bg-clr);
}

.content__header .right .filters .filters-box .filter__group {
  display: flex;
  align-items: center;
  margin: 10px 0 10px 20px;
}

.content__header .right .filters .filters-box .filter__group .checkbox {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: var(--bg-clr);
  position: relative;
}

.content__header .right .filters .filters-box .filter__group.checked .checkbox {
  background-color: var(--primary-clr);
}

.content__header .right .filters .filters-box .filter__group.checked .checkbox svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: unset;
}

.content__header .right .filters .filters-box .filter__group .checkbox:hover {
  border: 1px solid var(--primary-clr);
  cursor: pointer;
}

.content__header .right .filters .filters-box .filter__group label {
  margin-left: 10px;
}


.content__header .right .filters span {
  margin-left: 10px;
}

.content__header .right .filters svg {
  margin-left: 10px;
}

.content__header .right .create__invoice__btn {
  font-size: 15px;
  letter-spacing: -.25px;
  font-weight: bold;
  margin-left: 40px;
  padding-right: 15px;
  height: 50px;
  width: 150px;
  border-radius: 50px;
  background-color: var(--primary-clr);
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content__header .right .create__invoice__btn:hover {
  cursor: pointer;
  background-color: var(--primary-light);
}

.content__header .right .create__invoice__btn .arrow__icon {
  background-color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  line-height: 32px;
  position: relative;
}

.content__header .right .create__invoice__btn .arrow__icon svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.content__header .right .create__invoice__btn .lg_new_btn {
  /* display: block; */
}

.content__header .right .create__invoice__btn .sm_new_btn {
  display: none;
}

/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */

.invoices.sm_invoices {
  display: none;
}

.invoices .invoice {
  border: 1px solid transparent;
}

.invoices .invoice:not(:first-child) {
  margin-top: 20px;
}

.invoices .invoice a {
  background-color: var(--ele-dark-clr);
  width: 100%;
  height: 72px;
  border-radius: 10px;
  padding: 0 20px 0 50px;
  text-decoration: none;
  color: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invoices .invoice:hover {
  cursor: pointer;
  border: 1px solid var(--primary-clr);
  border-radius: 10px;
}

.invoices .invoice .invoice__id {
  font-size: 15px;
  font-weight: bold;
  line-height: 15px;
  letter-spacing: -.25px;
}

.invoices .invoice .invoice__id span {
  color: #7E88C3;
}

.invoices .invoice .payment__due {
  color: var(--txt-secondary);
  font-size: 13px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: -.1px;
  min-width: 55px;
}

.invoices .invoice .client__name {
  font-size: 13px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: -.1px;
  min-width: 105px;
}

.invoices .invoice .invoice__total {
  min-width: 70px;
}

.invoices .invoice .invoice__status {
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

.invoices .invoice .invoice__status .layer {
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: inherit;
}

.invoices .invoice .invoice__status .layer span {
  margin-right: 10px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.no__invoices_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 240px;
}

.no__invoices_content div {
  margin-top: 50px;
}

.no__invoices_content div p {
  margin-top: 20px;
}

@media screen and (min-width: 679px) and (max-width: 1180px) {
  .home__content {
    margin-top: 130px;
    width: 88%;
  }
}

@media screen and (min-width: 320px) and (max-width: 678px) {

  .content__header .left .invoice_count .lg_invoice_count {
    display: none;
  }

  .content__header .left .invoice_count .sm_invoice_count {
    display: inline-block;
  }

  .home__content {
    margin-top: 100px;
    width: 90%;
  }

  .content__header {
    margin-bottom: 20px;
  }

  .content__header .left p {
    margin-top: unset;
  }

  .content__header .right .filters.lg_filters {
    display: none
  }

  .content__header .right .filters.sm_filters {
    display: flex;
  }

  .content__header .right .create__invoice__btn {
    width: 90px;
    height: 44px;
  }

  .content__header .right .create__invoice__btn .lg_new_btn {
    display: none;
  }

  .content__header .right .create__invoice__btn .sm_new_btn {
    display: block;
  }

  /* ============= invoice style ================= */

  .invoices.lg_invoices {
    display: none;
  }

  .invoices.sm_invoices {
    display: block;
  }

  .invoices.sm_invoices .invoice {
    height: 134px;
  }

  .invoices.sm_invoices .invoice a {
    height: inherit;
    padding: unset
  }

  .invoices.sm_invoices .invoice a .left,
  .invoices.sm_invoices .invoice a .right {
    height: inherit;
    padding: 20px;
  }


  .invoices.sm_invoices .invoice a .left,
  .invoices.sm_invoices .invoice a .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .invoices.sm_invoices .invoice a .left .payment__due {
    margin-top: 20px
  }

  .invoices.sm_invoices .invoice a .right .client__name {
    text-align: right;
  }

  .invoices.sm_invoices .invoice a svg {
    display: none;
  }
}
</style>