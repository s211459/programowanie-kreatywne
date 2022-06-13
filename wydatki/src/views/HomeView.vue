<template>
  <main class="home">
    <div class="ownerBills">
    <h1>Bills owner</h1>
      <ul class="list-group" style="list-style:none">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <h5 class="chargeClass">Bill name</h5>
          <h5 class="chargeClass">Return for me<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></h5>
          <h5 class="badge badge-primary badge-pill">&nbsp;</h5>
          <h5 class="badge badge-primary badge-pill">&nbsp;</h5>
        </li>
        <li class="no-bills" v-if="bills2.length === 0">You don't own any bills</li>
        <li v-for="bill in bills2" :key ="bill.id"
        class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{bill.Title}}</span>
          <span class="chargeClass">{{Number(bill.Total) - Number(bill.Charge)}} <span class="plnclass">PLN</span></span>
          <span class="badge badge-primary badge-pill mediaflex">
            <router-link :to="{ path: `/bills/${bill.id}` }">
              <a href="#" class="btn-bills">Details</a>
            </router-link>
              <a href="#" class="btn-bills btn-delete" @click="deleteBill(bill.id)">Delete</a>
          </span>
        </li>
      </ul>
      </div>
      <div class="billsToPay">
    <h1>Bills to pay</h1>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <h5 class="chargeClass">Bill name</h5>
          <h5 class="chargeClass">To pay<span>&nbsp;&nbsp;&nbsp;&nbsp;</span></h5>
          <h5 class="badge badge-primary badge-pill badge2">&nbsp;</h5>
        </li>
        <li v-for="bill in bills3" :key ="bill.id"
        class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{bill.Title}}</span>
          <span class="chargeClass">{{bill.Charge}} <span class="plnclass">PLN</span></span>
          <span class="badge badge-primary badge-pill">
            <router-link :to="{ path: `/bills/${bill.id}` }">
              <a href="#" class="btn-bills">Details</a>
            </router-link>
          </span>
        </li>
      </ul>
      </div>
  </main>
</template>

<script>
import { billsColl } from "@/firebase";
import {getDocs, doc, deleteDoc} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


export default {
  name: "HomeView",
  components: {},
  data () {
    return {
      bills2: [],
      bills3: [],
      selectedDoc: null,
    };
  },

  methods: {
    async fetchBills() {
      let billsOnMain = await getDocs(billsColl);
      const auth = getAuth();
      const user = auth.currentUser;
      
      let bills = [];
        billsOnMain.forEach(bill=> {
          let billData = bill.data();

          billData.id = bill.id;
          bills.push(billData);
        })
        let bills2 = [];
        let bills3 = [];

        for (let i = 0; i<bills.length; i++){
          if(user.email in bills[i]) {
            if (bills[i].Owner == user.email){
              bills2.push(bills[i])
            }
            else{
              bills3.push(bills[i])
            }
          }}

        this.bills2 = bills2
        this.bills3 = bills3 
    },

    async deleteBill(billId){
      let billRef = doc(billsColl, billId);
      await deleteDoc(billRef);
      alert('Bill deleted');
      this.$router.go();
    }

  },
created() {
  this.fetchBills();
},

};
</script>

<style scoped>
  .no-bills {
    margin: 30px auto;
    
  }
</style>