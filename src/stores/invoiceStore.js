import axios from "axios";
import { defineStore } from "pinia";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [],
  }),
  getters: {
    paid: (state) =>
      state.invoices.filter((invoice) => invoice.status === "paid"),
    draft: (state) =>
      state.invoices.filter((invoice) => invoice.status === "draft"),
    pending: (state) =>
      state.invoices.filter((invoice) => invoice.status === "pending"),
  },
  actions: {
    async getInvoices() {
      if (localStorage.getItem("invoices")) {
        this.invoices = JSON.parse(localStorage.getItem("invoices"));
      } else {
        // Check if 'data.json' file is available
        try {
          let response = await axios.get("/Invoice-app-vuejs/data.json");

          this.invoices = response.data;
          localStorage.setItem("invoices", JSON.stringify(this.invoices));
        } catch (error) {
          return error;
        }
      }

      return this.invoices;
    },

    getInvoice(invoiceId) {
      return JSON.parse(localStorage.getItem("invoices")).filter(
        (invoice) => invoice.id === invoiceId
      );
    },
  },
});
