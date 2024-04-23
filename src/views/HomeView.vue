<script setup>
import illustration from '@/components/icons/illustrationEmpty.vue'
import plusIcon from '@/components/icons/IconPlus.vue'
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import arrowRightIcon from '@/components/icons/IconArrowRight.vue'
</script>

<template>
  <main class="home__content">

    <div class="content__header">

      <div class="left">
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>

      <div class="right">
        <div class="filters">
          filter by
          <span>status</span>
          <arrowDownIcon />
        </div>
        <div class="create__invoice__btn">
          <span class="arrow__icon">
            <plusIcon />
          </span>
          <span>New Invoice</span>
        </div>
      </div>

    </div>

    <div class="invoices">
      <div class="invoice">
        <span class="invoice__id">#RT3080</span>
        <span class="payment__due">Due 2021-08-19</span>
        <span class="client__name">Jensen Huang</span>
        <h3 class="invoice__total">$1800.90</h3>
        <span class="invoice__status">Paid</span>
        <arrowRightIcon />
      </div>
      
    </div>

  </main>
</template>

<style>
.home__content{
  width: 60%;
  margin: 50px auto 0 auto;
}
.content__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.content__header .right{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.content__header .right .filters span{margin-left: 10px;}
.content__header .right .filters svg{margin-left: 10px;}
.content__header .right .create__invoice__btn{
  margin-left: 40px;
  height: 50px;
  width: 150px;
  border-radius: 50px;
  background-color: var(--primary-clr);
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content__header .right .create__invoice__btn .arrow__icon{
  background-color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  line-height: 32px;
  position: relative;
}
.content__header .right .create__invoice__btn .arrow__icon svg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.invoices .invoice:not(:first-child){margin-top: 20px;}
.invoices .invoice{
  background-color: var(--elements-clr);
  width: 100%;
  height: 72px;
  border-radius: 10px;
  padding: 0 20px 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.invoices .invoice .invoice__id{}
.invoices .invoice .payment__due{color: var(--txt-secondary);}
.invoices .invoice .client__name{}
.invoices .invoice .invoice__total{font-weight: bold;}
.invoices .invoice .invoice__status{}
</style>