<template>
  <div id="home">
    <div class="global-nav fixed-top">
      <div id="container">
        <div class="navbar">
          <div id="left-nav">
            <router-link class="navText" to="/">Jonathan Hellberg</router-link>
            <div v-for="reca in getAllReports" v-bind:key="reca.id">
              <router-link class="navText" v-on:click="report" :to="'/reports/week/' + reca.id">Week {{reca.id}}</router-link>
            </div>
          </div>
          <div id="right-nav">
            <div v-if="auther">
              Logged in
              </div>
            <div v-else>
            <span class="navText" v-on:click="showLogin"> Login</span>
            <span class="navText" v-on:click="show"> Register</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-block">
      <div class="">
       <markdown-it-vue id="code" class="md-body" :key="this.re" :content="this.re" />
      </div>
    </div>
    <div v-if="auther">
      <a class="float" id="menu-share">
      <font-awesome-icon class="my-float" icon="cog" />
      </a>
      <ul>
      <li><a v-on:click="add">
      <font-awesome-icon class="my-float" icon="plus" />
      </a></li>
      <li><a v-on:click="showEdit">
      <font-awesome-icon class="my-float" icon="edit" />
      </a></li>
      </ul>
      </div>
  <modal name="hello-world" :height="600">
    <div class="reg-block">
      <h2>Register</h2>
    </div>
    <div class="reg-model"><br>

      <validation-provider rules="required" v-slot="{ errors }">
          <label for="">Name</label><br>
          <input v-model="username" required type="text"><br>
          <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>
      
        <validation-provider rules="required: true | email: true" v-slot="{ errors }">
        <label for="">Email</label><br>
        <input v-model="email" name="myinput" type="email" /><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>
      <label>Birthday</label>
        <validation-provider rules="required" v-slot="{ errors }">
        <div class="select">
        <select class="select-text" v-model="currentYear" required>
          <option v-for="cYear in year" v-bind:key="cYear">
            {{ cYear }}
          </option>
        </select>
        </div>
      </validation-provider>

        <validation-provider rules="required" v-slot="{ errors }">
          <div class="select">
            
          <select class="select-text" v-model="currentMonth" required>
          <option v-for="cMonth in month" v-bind:key="cMonth">
            {{ cMonth }}
          </option>
        </select>
          </div>
      </validation-provider>

        <validation-provider rules="required" v-slot="{ errors }">
          <div class="select">
          <select class="select-text" v-model="currentDay" required>
            <option v-for="cDays in daysInMonth" v-bind:key="cDays">
              {{ cDays }}
            </option>
            </select>
          </div>
      </validation-provider><br><br><br><br>

      <validation-provider rules="required" v-slot="{ errors }">
        <label for="">Password</label><br>
        <input v-model="password" name="myinput" type="password" /><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>

      <button v-on:click="register()" class="btn btn--stripe">Button</button>
    </div>
</modal>

<modal name="login" :height="450">
    <div class="reg-block">
      <h2>Login</h2>
    </div>
    <div class="reg-model"><br>
      
      <validation-provider rules="required: true | email: true" v-slot="{ errors }">
        <label for="">Email</label><br>
        <input v-model="email" name="myinput" type="email" /><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>

      <validation-provider rules="required" v-slot="{ errors }">
        <label for="">Password</label><br>
        <input v-model="password" name="myinput" type="password" /><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>

      <button v-on:click="login()" class="btn btn--stripe">Button</button>
    </div>
</modal>

<modal name="edit" :height="650">
    <div class="reg-block">
      <h2>Week {{ this.$route.params.id }}</h2>
    </div>
    <div class="reg-model"><br>
      
      <h2></h2>

      <validation-provider rules="required" v-slot="{ errors }">
        <label for="">Text</label><br>
        <textarea style="resize: none;" rows="14" cols="50" v-model="text" name="myinput"></textarea><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>

      <button v-on:click="edit()" class="btn btn--stripe">Edit</button>
    </div>
</modal>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import {mapActions} from 'vuex';
import axios from 'axios';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';

extend('required', {
  ...required,
  message: '* The field is required',
});

extend('email', {
  ...email,
  message: '* Must be an email.',
});

interface Date {
  year: [];
}

@Component({
  components: {
    ValidationProvider,
    MarkdownItVue,
  },
})
export default class Home extends Vue {

  private time: number[] = [];
  private mo: string[] = [];
  private currentYear: number = 2019;
  private currentMonth: string = 'January';
  private currentDay: number = 1;
  private days: number[] = [];
  private re: string = '';
  private username: string = '';
  private email: string = '';
  private password: string = '';
  private text: string = '';
  private links: number[] = [];
  private token: string = '';
  private auther: boolean = false;

  private report() {
    axios.get('https://me-api.jhellberg.me/reports/week/' + this.$route.params.id)
    .then((response) => {
      this.re = response.data.data;
      this.text = response.data.data;
    });
    return this.re;
  }

  private created() {
    this.allReports();
    this.report();
    this.auth();
  }

  private updated() {
    this.report();
    this.auth();
  }

  private auth() {
    axios.get('https://me-api.jhellberg.me/reports/auth', { headers: { 'x-access-token': this.token } })
    .then((response) => {
      this.auther = response.data.data;
    });
  }

  private allReports() {
    axios.get('https://me-api.jhellberg.me/reports')
    .then((response) => {
      this.links = response.data.id;
    });
  }

  get getAllReports() {
    return this.links;
  }

  private add() {
    axios.post('https://me-api.jhellberg.me/reports/add', {
      tx: '',
    }, { headers: { 'x-access-token': this.token } })
    .then((response) => {
      this.allReports();
    });
    this.allReports();
  }

  private edit() {
    axios.post('https://me-api.jhellberg.me/reports/update', {
      id: this.$route.params.id,
      tx: this.text,
    }, { headers: { 'x-access-token': this.token } })
    .then((response) => {
      this.re = this.text;
    });
    this.hideEdit();
  }

  private register() {
    axios.post('https://me-api.jhellberg.me/register', {
      username: this.username,
      email: this.email,
      birthday: this.currentYear.toString() + '-' + this.currentMonth + '-' + this.currentDay.toString(),
      password: this.password,
    });
    this.hide();
  }

  private login() {
    axios.post('https://me-api.jhellberg.me/login', {
      email: this.email,
      password: this.password,
    })
    .then((response) => {
      this.token = response.data.token;
      this.auther = true;
    });
    this.hideLogin();
  }

  private show() {
    this.$modal.show('hello-world');
  }

  private hide() {
    this.$modal.hide('hello-world');
  }

  private showLogin() {
    this.$modal.show('login');
  }

  private hideLogin() {
    this.$modal.hide('login');
  }

  private showEdit() {
    this.$modal.show('edit');
  }

  private hideEdit() {
    this.$modal.hide('edit');
  }

  private sortNumber(a: any, b: any) {
    return b - a;
  }

  private getMonthFromString(mon: string) {

   const d = Date.parse(mon + '1, 2012');
   if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
   }
   return -1;
 }

  get year(): number[] {
    let startYear = 1900;
    const currentYear = new Date().getFullYear();

    startYear = startYear || 1980;
    while ( startYear <= currentYear ) {
      this.time.push(startYear++);
    }
    return this.time.sort(this.sortNumber);
  }

  get month(): string[] {
    this.mo[0] = 'January';
    this.mo[1] = 'February';
    this.mo[2] = 'March';
    this.mo[3] = 'April';
    this.mo[4] = 'May';
    this.mo[5] = 'June';
    this.mo[6] = 'July';
    this.mo[7] = 'August';
    this.mo[8] = 'September';
    this.mo[9] = 'October';
    this.mo[10] = 'November';
    this.mo[11] = 'December';
    return this.mo;
  }

  get daysInMonth(): number[] {
    this.days = [];
    const int = new Date(this.currentYear, this.getMonthFromString(this.currentMonth), 0).getDate();
    for (let i = 1; i < int + 1; i++) {
      this.days.push(i);
    }

    return this.days;
  }
}
</script>

<style scoped>

#home {
  height: 100%;
  width: 100%;
}

.reg-model {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.error {
  color: #ff0a3a;
}

.reg-block {
  background-color: #191919;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-bottom: 25px;
}

.reg-block h2 {
  padding: 0;
  margin: 0;
}

.label-container{
	position:fixed;
	bottom:48px;
	right:105px;
	display:table;
	visibility: hidden;
}

.label-text{
	color:#FFF;
	background:rgba(51,51,51,0.5);
	display:table-cell;
	vertical-align:middle;
	padding:10px;
	border-radius:3px;
}

.label-arrow{
	display:table-cell;
	vertical-align:middle;
	color:#333;
	opacity:0.5;
}

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#F33;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
	z-index:1000;
	animation: bot-to-top 2s ease-out;
}

ul{
	position:fixed;
	right:40px;
	padding-bottom:20px;
	bottom:80px;
	z-index:100;
}

ul li{
	list-style:none;
	margin-bottom:10px;
}

ul li a{
	background-color:#F33;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
	width:60px;
	height:60px;
	display:block;
}

ul:hover{
	visibility:visible!important;
	opacity:1!important;
}


.my-float{
	font-size:24px;
	margin-top:18px;
}

a#menu-share + ul{
  visibility: hidden;
}

a#menu-share:hover + ul{
  visibility: visible;
  animation: scale-in 0.5s;
}

a#menu-share i{
	animation: rotate-in 0.5s;
}

a#menu-share:hover > i{
	animation: rotate-out 0.5s;
}

@keyframes bot-to-top {
    0%   {bottom:-40px}
    50%  {bottom:40px}
}

@keyframes scale-in {
    from {transform: scale(0);opacity: 0;}
    to {transform: scale(1);opacity: 1;}
}

@keyframes rotate-in {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

@keyframes rotate-out {
    from {transform: rotate(360deg);}
    to {transform: rotate(0deg);}
}

.img {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/test.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  z-index: 2;
}

.container-block {
  margin-top: 250px;
}

.block {
  width: 100%;
  height: 100vh;
  z-index: 1;
}

.text-block {
  width: 100%;
  height: 400px;
  background: #191919;
  color: #fff;
}

.footer-block {
  width: 100%;
  height: 300px;
  background: #191919;
  color: #fff;
}

.quote-block {
  width: 100%;
  height: 600px;
  background: #ffffff;
}

.quote-text {
  top: 100%;
  font-size: 1.9rem;
  color: #444444;
}

.quote-user {
  font-size: 1.3rem;
  float: right;
  color: #777777;
}

.vertcal-center {
  margin-top: 200px;
}

.center {
  text-align: center;
}

.text-about {
  font-size: 1em;
  letter-spacing: 1px;
  margin: 0px;
}

.list {
  display: inline;
  list-style-type: none;
  padding: 0;
}

.list li {
  display: inline;
}

.list li:last-child {
  margin-left: 20px;
}

h1 {
  font-weight: 100;
  color: #fff;
}

h3 {
  margin: 0;
  font-family: "Gravity-Regular";
  letter-spacing: 10px;
  padding-bottom: 60px;
  font-weight: 100;
  font-size: 1.75em;
  padding-top: 25px;
}

#read-more {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  z-index: 5;
}

.read-more-text {
  display: block;
  color: white;
  outline: 0;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin-bottom: .5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  font-size: 1.5em;
}

.space-text {
  letter-spacing: 0.3em;
}

.space-text:last-child {
  letter-spacing: 0em;
}

#left-nav {
  display: flex;
  margin-right: auto !important;
}

#right-nav {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
}

.links {
  position: absolute;
  top: 50%;
  list-style-type: none;
  z-index: 5;
}

.links li {
  margin-top: 8px;
}

#container {
  display: flex;
  flex-wrap: nowrap;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  max-width: 1140px;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 1rem;
}

#contain {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  max-width: 1140px;
  padding: .5rem 1rem;
}

.global-nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 120px;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 40;
}

.navText, .navText:hover {
  font-size: 1em;
  color: black;
  font-family: 'Gravity-Regular';
  text-decoration: none;
  padding-right: 10px;
  padding-left: 10px;
}

.navbar {
  display: flex !important;
  flex-basis: 100%;
  align-items: center;
}

.btn {
  overflow: visible;
  background: transparent;
  font: inherit;
  cursor: pointer;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 30px 16px;
  background-color: #fff;
  color: #666;
  border: 2px solid #666;
  border-radius: 6px;
  margin-bottom: 16px;
  margin: auto;
  transition: all .5s ease;
}
.btn:-moz-focus-inner {
  padding: 0;
  border: 0;
}
.btn--stripe {
  overflow: hidden;
  position: relative;
}
.btn--stripe:after {
  content: '';
  display: block;
  height: 7px;
  width: 100%;
  background-image: repeating-linear-gradient(45deg, #666, #666 1px, transparent 2px, transparent 5px);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-top: 1px solid #666;
  position: absolute;
  left: 0;
  bottom: 0;
  background-size: 7px 7px;
}
.btn--stripe:hover {
  background-color: #666;
  color: #fff;
  border-color: #000;
}
.btn--stripe:hover:after {
  background-image: repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 2px, transparent 5px);
  border-top: 1px solid #000;
}

select {
  margin: 3px;
}

input {
  border: 0;
  border-bottom: solid 1px rgba(0,0,0, 0.12);
}

input:focus {
  border-bottom: 1px solid #133c94;
}

.select-text {
	position: relative;
	font-family: inherit;
	background-color: transparent;
	padding: 10px 10px 10px 0;
	font-size: 16px;
	border-radius: 0;
	border: none;
	border-bottom: 1px solid rgba(0,0,0, 0.12);
  float: left;
}

/* Remove focus */
.select-text:focus {
	outline: none;
	border-bottom: 1px solid #133c94;
}

	/* Use custom arrow */
.select .select-text {
	appearance: none;
	-webkit-appearance:none
}

</style>
