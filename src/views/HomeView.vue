<script setup>
import illustration from '@/components/icons/illustrationEmpty.vue'
import plusIcon from '@/components/icons/IconPlus.vue'
import arrowDownIcon from '@/components/icons/IconArrowDown.vue'
import arrowRightIcon from '@/components/icons/IconArrowRight.vue'
import checkIcon from '@/components/icons/IconCheck.vue'
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
          <div class="filter__select">
            <span>status</span>
            <arrowDownIcon />
          </div>
          <div class="filters-box">
            <div class="filter__group checked">
              <div class="checkbox">
                <checkIcon />
              </div>
              <label for="draft">Draft</label>
            </div>
            <div class="filter__group">
              <div class="checkbox">
                <checkIcon />
                
              </div>
              <label for="pending">Pending</label>
            </div>
            <div class="filter__group">
              <div class="checkbox">
                <checkIcon />

              </div>
              <label for="paid">Paid</label>
            </div>
          </div>
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
        <span class="invoice__id"><span>#</span>RT3080</span>
        <p class="payment__due">Due 2021-08-19</p>
        <p class="client__name">Jensen Huang</p>
        <h3 class="invoice__total">$1800.90</h3>
        <div class="invoice__status paid-btn">
          <div class="layer">
            <span></span>Paid
          </div>
        </div>
        <arrowRightIcon />
      </div>
      <div class="invoice">
        <span class="invoice__id"><span>#</span>RT3080</span>
        <p class="payment__due">Due 2021-08-19</p>
        <p class="client__name">Jensen Huang</p>
        <h3 class="invoice__total">$1800.90</h3>
        <div class="invoice__status pending-btn">
          <div class="layer">
            <span></span>Pending
          </div>
        </div>
        <arrowRightIcon />
      </div>
      <div class="invoice">
        <span class="invoice__id"><span>#</span>RT3080</span>
        <p class="payment__due">Due 2021-08-19</p>
        <p class="client__name">Jensen Huang</p>
        <h3 class="invoice__total">$1800.90</h3>
        <div class="invoice__status draft-btn">
          <div class="layer">
            <span></span>Draft
          </div>
        </div>
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
.content__header .left p{
  margin-top: 10px;
}
.content__header .right{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.content__header .right .filters{
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -.25px;
  font-weight: bold;
  position: relative;
}
.content__header .right .filters .filter__select{
  display: inline-block;
}
.content__header .right .filters .filter__select:hover{
  cursor: pointer;
}

.content__header .right .filters .filters-box{
  position: relative;
  top: 10px;
  width: 192px;
  height: 128px;
  background-color: var(--elements-clr);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
}
.content__header .right .filters .filters-box .filter__group{
  display: flex;
  align-items: center;
  margin: 10px 0 10px 20px;
}
.content__header .right .filters .filters-box .filter__group .checkbox{
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: var(--bg-clr);
  position: relative;
}
.content__header .right .filters .filters-box .filter__group.checked .checkbox{
  background-color: var(--primary-clr);
}

.content__header .right .filters .filters-box .filter__group.checked .checkbox svg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: unset;
}
.content__header .right .filters .filters-box .filter__group .checkbox:hover{
  border: 1px solid var(--primary-clr);
  cursor: pointer;
}
.content__header .right .filters .filters-box .filter__group label{
  margin-left: 10px;
}


.content__header .right .filters span{margin-left: 10px;}
.content__header .right .filters svg{margin-left: 10px;}
.content__header .right .create__invoice__btn{
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
.content__header .right .create__invoice__btn:hover{
  cursor: pointer;
  background-color: var(--primary-light);
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

/* ============================================================================ */
/* ============================================================================ */
/* ============================================================================ */

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
.invoices .invoice:hover{
  cursor: pointer;
  border: 1px solid var(--primary-clr);
}
.invoices .invoice .invoice__id{
  font-size: 15px;
  font-weight: bold;
  line-height: 15px;
  letter-spacing: -.25px;
}
.invoices .invoice .invoice__id span{
  color: #7E88C3;
}
.invoices .invoice .payment__due{
  color: var(--txt-secondary);
  font-size: 13px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: -.1px;
}
.invoices .invoice .client__name{
  font-size: 13px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: -.1px;
}
.invoices .invoice .invoice__total{
  margin-left: 100px;
}
.invoices .invoice .invoice__status{
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
.invoices .invoice .invoice__status .layer{
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: inherit;
}
.invoices .invoice .invoice__status .layer span{
  margin-right: 10px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

</style>