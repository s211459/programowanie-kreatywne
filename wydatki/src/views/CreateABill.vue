<template>  
<div>
    <h3 class="marginclass" @click="showFieldF">Share bill with:</h3>
    <p class="fri" v-show="cVisible" v-for="fr of friendsList" :key="fr.id">{{fr}} <button class="btn-grey" @click="removeFriend(fr)">x</button>, </p>
     <p :class= "friends" v-show="fVisible">
        <input type="email"  @keyup.enter="addfriends" class="form-control marginclass" v-model.trim="NewFriend" placeholder="Add friends">
    </p>

      <h3 class="marginclass" @click="showField">Bill title: {{ bill }}</h3>
      <p :class= "billTitle" v-show="pVisible">
        <input  @keyup.enter="hide" class="form-control marginclass" v-model.trim="bill" placeholder="Enter bill title">
    </p>
    <div id="appContainer">
    <form @submit.prevent="addProd">
      <input v-model="newProd" class="form-control" placeholder="Product" type="text"/>
      <input v-model="newPrice" class="form-control" placeholder="Price" type="number" step="0.01"/>
      <button class="btn-blue">Add product</button>
      <button class="btn-blue" v-if="products.length !== 0" @click="()=>{exporttofirebase(); removeproducts();}">Submit bill</button>
    </form>
    
    <div class="products-container">
    <div id="prodList">
      <div class="underline"
        :class="{ completed: product.complete }"
        v-for="(product, index) in products"
        :key="index"
        @click="completedproduct(product)"
        @keyup.enter="completedproduct(product)"
      >
        <span class="card-title">{{ product.text }}&nbsp;</span>
      </div>
    </div>
    <div id="priceList">
      <div class="underline"
        :class="{ completed: price.complete }"
        v-for="(price, index) in prices"
        :key="index"
        @click="completedprice(price)"
        @keyup.enter="completedprice(price)"
      >
        <span class="card-title">{{ price.text }} PLN</span>
      </div>
    </div>
    </div>
    <button
      class="btn-delete btn-bills btn-removeproducts"
      v-if="products.length !== 0"
      @click="removeproducts"
    >
      Remove All products
    </button>
  </div>
</div>

</template>

<script setup>
import { ref} from 'vue';
import { billsColl } from "@/firebase";
import {addDoc} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

const bill = ref()
const billTitle = ref()

const NewFriend = ref()
const friends = ref()
let friendsList = [];
let friendsDB = [user.email];


const pVisible = ref(true)
const fVisible = ref(true)
const cVisible = ref(false)

function removeFriend(x) {

for( var i = 0; i < friendsList.length; i++){ 
                                   
        if ( friendsList[i] === x) { 
            friendsList.splice(i, 1); 
            i--; 
        }
    }

cVisible.value = false
cVisible.value = true
}

function showField() {
  pVisible.value=true
    }

function showFieldF() {
  fVisible.value=true
    }

function showFieldC() {
  cVisible.value=true
    }


function hide() {
  pVisible.value=false
  fVisible.value=false
  }

function addfriends() {
  showFieldC();
  if (NewFriend.value.includes('@')) {
      const currentFriend = NewFriend.value;
  friendsList.push(currentFriend);
  friendsDB.push(currentFriend);
  fVisible.value=false
  fVisible.value=true
  NewFriend.value = ''
  }
 else {
  alert('Enter correct mail')
 }
  }
const newProd = ref("");
const newPrice = ref("");
const initialLoadData = [
      {
        complete: false,
        text: "Create product list functionality",
      },
    ];

    const initialLoadData2 = [
      {
        complete: false,
        text: "Create product list functionality",
      },
    ];

    let storedproducts;
    let storedprices;
    localStorage.getItem("products")
      ? (storedproducts = JSON.parse(localStorage.getItem("products")))
      : (storedproducts = initialLoadData);

    localStorage.getItem("prices") 
      ? (storedprices = JSON.parse(localStorage.getItem("prices"))) 
      : (storedprices = initialLoadData2);

    const products = ref(storedproducts);
    const prices = ref(storedprices);

    function addProd() {
      if (newProd.value !== "" && newPrice.value !== "") {
        products.value.push({
          complete: false,
          text: newProd.value,
        });
        prices.value.push({
          complete: false,
          text: newPrice.value,
        })
        newProd.value = "";
        newPrice.value = "";
        updateStorage();
      }
    }
    function removeproducts() {
      products.value.splice(0, products.value.length);
      prices.value.splice(0, prices.value.length);
      updateStorage();
    }
    function completedproduct(product) {
      product.complete = !product.complete;
      updateStorage();
    }
    function completedprice(price) {
      price.complete = !price.complete;
      updateStorage();
    }

    function updateStorage() {
      localStorage.setItem("products", JSON.stringify(products.value));
      localStorage.setItem("prices", JSON.stringify(prices.value))
    }

function exporttofirebase() {
      // console.log("Creating Document");
      let billdata = {}
      let productsToFirebase= JSON.parse(localStorage.getItem("products")).map(productF => productF.text);
      let pricesToFirebase = JSON.parse(localStorage.getItem("prices")).map(priceF => priceF.text);
      productsToFirebase.forEach((product, i) => billdata[product] = pricesToFirebase[i]);

      let totalCost = pricesToFirebase.reduce(function(a, b) {
        return a + b;
        });

      let qtyUsers = friendsDB.length;
      let debtUser = Math.ceil(totalCost/qtyUsers * 100) / 100;

      for (let i = 0; i<qtyUsers; i++){
        billdata[friendsDB[i]] = debtUser;
      }

      billdata["Total"] = totalCost.toFixed(2);

      billdata["Title"] = bill.value;

      billdata["Charge"] = debtUser.toFixed(2);

      billdata["Owner"] = user.email;
         
      addDoc(billsColl, billdata);

      friendsDB = [user.email];

      alert("Bill saved successfully!")

      this.bill = '';
      this.friendsList = [];

}

</script>
