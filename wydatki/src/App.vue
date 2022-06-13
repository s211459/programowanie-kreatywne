<template>
  <div>
  <nav v-if="$store.state.user">
    <router-link class="btn-nav" to="/">User view</router-link>
    <router-link class="btn-nav" to="/createabill">Create a bill</router-link>
    <button class="btn-logout" @click="$store.dispatch('logout')">Logout</button>
  </nav>
  <router-view/>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onBeforeMount(()=> {
      store.dispatch('fetchUser')
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a.router-link-exact-active {
  color: #ccd6d8;
}

a.btn-bills:hover{
  color: rgb(222, 213, 213);
  background-color: rgb(76, 122, 175);
}

a.btn-delete:hover{
  color: rgb(222, 213, 213);
  background-color: rgb(189, 67, 67);
}

button.btn-delete:hover{
  color: rgb(222, 213, 213);
  background-color: rgb(189, 67, 67);
}

button.btn-removeproducts{
  width: 200px;
  margin: 10px 10px 30px 10px;
}


.btn-logout, .btn-nav {
  display: inline-block;
  width: 180px;
  font-size: 1rem;
  text-decoration: none;
  margin: 0.5rem 1rem;
  border: none;
	background-color: rgb(48, 72, 99);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 1.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

.btn-grey {
  display: inline-block;
  width: 25px;
  height: 35px;
  font-size: 0,5rem;
  text-decoration: none;
  margin: 0.5rem;
  border: none;
	background-color: rgb(148, 148, 148);
	color: #FFF;
	font-weight: 200;
	padding: 0.25rem 0.25rem;
	border-radius: 0.5rem;
	cursor: pointer;
}

.btn-blue {
  display: inline-block;
  width: 180px;
  font-size: 0.9rem;
  text-decoration: none;
  margin: 0.1rem 0.1rem;
  border: none;
	background-color: rgb(99, 140, 187);
	color: #FFF;
	font-weight: 50;
	padding: 0.5rem 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

.btn-bills {
  display: inline-block;
  width: 80px;
  font-size: 0.9rem;
  text-decoration: none;
  margin: 0.1rem 0.3rem;
  border: none;
	background-color: rgb(99, 140, 187);
	color: #FFF;
	font-weight: 50;
	padding: 0.5rem 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

.btn-delete {
  background-color: rgb(210, 89, 89);
}

.products-container{
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
}

.fri {
  display: inline;
}

input.form-control {
  width: 90vw;
}

#appContainer form {
  padding-top: 1rem;
}

.home {
  display: flex;
  flex-direction: row;
}

.ownerBills {
  flex: 55%;
  margin-left: 20px;
}

.billsToPay {
  flex: 45%;
  margin-right: 30px;
}

.list-group{
  margin: 10px 30px;
}

li.list-group-item {
  padding: 0.5rem 0.2rem;
}

.list-group-item:first-child {
  border-bottom: 2px solid rgb(48, 72, 99);
}

.list-group-item > span{
  flex: 1 1 70px;
}

.list-group-item > h5{
  flex: 33.33%;
  margin: 5px 0;
}

.list-group-item > .badge {
  flex: 0 0 90px;
}

.chargeClass {
  color: black;
}

.plnclass {
  font-size: 12px;
  font-weight: bold;
}

.card-title{
  padding: 5px 10px;
}
.underline {
  border-bottom: 1px solid rgb(48, 72, 99);
}

@media only screen and (max-width: 600px) {
  .home {
  display: flex;
  flex-direction: column;
}

.ownerBills {
  margin: 0 0 20px 0;
}

.billsToPay {
  margin: 0 0 20px 0;
}

.list-group-item > .badge {
  display: flex;
  flex-direction: column;
  flex: 0 0 47px;
}

.list-group-item > .badge2 {
  display: flex;
  flex-direction: column;
  flex: 0 0 95px;
}

h5.chargeClass {
  font-size: 1rem;
}

.marginclass{
  margin: 10px 5vw;
}
}

</style>
