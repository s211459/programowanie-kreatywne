<template>
  <div id="appContainer" class="maincontainer">
    <h1 class="titleclass">Bill details</h1>
    <h4 class="borderclass">Bill name: {{billDetail.Title}}</h4>
    <h4 class="borderclass">Owner: {{billDetail.Owner}}</h4>
    <h4 class="titleclass">Products: </h4>
    <h4 class="borderclass" v-for="prod in ProductsArr" :key ="prod.id">{{prod[0]}}: {{prod[1]}} PLN</h4>
    <h4 class="titleclass"> All participants of the bill: </h4>
    <h4 class="borderclass" v-for="ema in emailsFromFirebase" :key ="ema.id">{{ema}}</h4>

  </div>
</template>
<script>
import { billsColl } from "@/firebase";
import { getDoc, doc } from 'firebase/firestore';

export default {
  data() {
    return {
      selectedBill:{},
      billId: null,
      docRef: null,
      billDetail: [],
      productsPrice: {},
      ProductsArr: [],
      emailsFromFirebase: [],
    }
  },

  methods:{
    async getBill(){
      let billRef = doc(billsColl,this.billId);
      this.docRef = billRef;
      let bill = await getDoc(this.docRef);
      let billDetail = bill.data();
      const productArray = [];
      const priceArray = [];
      const productsPrice = {};
      let ProductsArr = [];
      let emailsFromFirebase = []

      for (let item in billDetail) {
        if (item.includes('@') || item.includes('Title')  || item.includes('Charge') || item.includes('Owner')  || item.includes('Total')) {
        continue;
        }
        else {
          productArray.push(item)
          priceArray.push(billDetail[item])
        }
      this.billDetail = billDetail;

    }    
    productArray.forEach(function(value, index) {
    productsPrice[value] = priceArray[index];
    });

    ProductsArr = Object.entries(productsPrice);

    this.ProductsArr = ProductsArr;
    this.emailsFromFirebase = emailsFromFirebase;
    for (let item in billDetail) {
       if (item.includes('@')) {
        emailsFromFirebase.push(item)
       }

    }

  },
  },

  created(){
    let billId = this.$route.params.billId;
    this.billId = billId;
    this.getBill();
  }
}
  
  

</script>


<style>
  .maincontainer{
    width: 60vw;
    margin-left: auto;
    margin-right: auto;

  }

  .borderclass{
    margin: 0 20px;
    padding: 10px;
    border: 1px solid rgba(0,0,0,.125);
  }
  
  .titleclass{
    margin-top: 20px;
    margin-bottom: 0;
    padding: 5px 0;
    font-size: 28px;
    background-color: rgb(192, 196, 210);
  }

  @media only screen and (max-width: 600px) {
    .maincontainer{
    width: 100vw;
  }
  }

</style>
