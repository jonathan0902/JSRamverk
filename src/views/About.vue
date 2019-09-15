<template>
  <div id="report">
    <div class="global-nav fixed-top">
      <div id="container">
        <div class="navbar">
          <div id="left-nav">
            <router-link class="navText" to="/">Jonathan Hellberg</router-link>
            <router-link class="navText" to="/reports/week/1">Week 1</router-link>
            <router-link class="navText" to="/reports/week/2">Week 2</router-link>
          </div>
          <div id="right-nav">
          </div>
        </div>
      </div>
    </div>
    <a href="https://github.com/jonathan0902/JSRamverk">
      <h4>GitHub</h4>
    </a>
    <markdown-it-vue class="md-body" :content="content"/>

    <modal name="hello-world" :height="600">
    <div class="reg-block">
      <h2>Register</h2>
    </div>
    <div class="reg-model"><br>

      <validation-provider rules="required" v-slot="{ errors }">
          <label for="">Name</label><br>
          <input v-model="value" required type="text"><br>
          <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>
      
        <validation-provider rules="required: true | email: true" v-slot="{ errors }">
        <label for="">Email</label><br>
        <input v-model="value" name="myinput" type="email" /><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>

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
          <select class="select-text" required>
            <option v-for="cDays in daysInMonth" v-bind:key="cDays">
              {{ cDays }}
            </option>
            </select>
          </div>
      </validation-provider><br><br><br><br>

      <validation-provider rules="required" v-slot="{ errors }">
        <label for="">Password</label><br>
        <input v-model="value" name="myinput" type="password" /><br>
        <span class="error">{{ errors[0] }}</span>
      </validation-provider><br><br>

      <button class="btn btn--stripe">Button</button>
    </div>
</modal>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import * as file from 'raw-loader!./../../README.md';

export default {
  components: {
    MarkdownItVue,
  },
  data() {
    return {
      content: file.default,
    };
  },
};
</script>


<style scoped>

  #report {
    height: 100%;
    width: 100%;
    text-align: center;
  }

  #container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
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

  .global-nav {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    height: 120px;
  }

  .fixed-top {
    position: relative;
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
	font-size: 18px;
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