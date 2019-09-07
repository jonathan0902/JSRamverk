<template>
  <div id="home">
    <div class="global-nav fixed-top">
      <div id="container">
        <div class="navbar">
          <div id="left-nav">
            <router-link class="navText" to="/">Jonathan Hellberg</router-link>
            <router-link class="navText" to="/reports/week/1">Week 1</router-link>
          </div>
          <div id="right-nav">
            <router-link class="navText" to="/reports/week/1"> Report</router-link>
          </div>
        </div>
      </div>
    </div>
    <ul class="links">
      <li>
        <a href="https://www.google.com/">
          <img src="../assets/github.png">
        </a>
      </li>
      <li>
        <a href="https://www.google.com/">
          <img src="../assets/linkedin.png">
        </a>
      </li>
    </ul>
    <div class="img"></div>
    <div id="read-more">
      <a class="read-more-text">Read More</a>
      <a class="read-more-text">
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
        <span class="space-text">|</span>
      </a>
    </div>
    <div class="block"></div>
    <div class="text-block">
        <div id="contain">
          <h3>About me</h3>
          <p class="text-about">My name is Jonathan Hellberg born in Skövde, Sweden. At young age i got involved with computers games.
            At age 12 i started curiosity towards programming i wanted to know how mods to minecraft where made. I went throgth many tutorials on youtube and i finally
            had a prodcut but had still no ide what i was doing but i was fascinate what i could do. At 14 i 'did' my first game in java i was a space shooter game late 14-15
            i made my first website at that moment i knew i was in the right track. 15-18 i learned how to program my english skills had developed and i started to graps
            what i acutally where doing i learn Java, PHP, SQL, HTML, CSS and much more. Later i started in collage in the topic webproagmming. </p>
      </div>
    </div>
    <div class="quote-block">
        <div id="contain">
          <div class="vertcal-center">
            <p class="quote-text">Vue Everything So Easy Its Like You Seem So Sure Still Your Ways You Dont See Im Not Sure.</p>
            <p class="quote-user"> - Machine Learning Program</p>
          </div>
      </div>
    </div>

    <div class="footer-block">
      <div id="contain">
        <div class="center">
          <h1 class="explore-text">
            Explore
          </h1>
          <ul class="list">
            <li>
              <a href="https://www.google.com/">
                <img src="../assets/64github.png">
              </a>
            </li>
            <li>
            <a href="https://www.google.com/">
              <img src="../assets/64linkedin.png">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>

#home {
  height: 100%;
  width: 100%;
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
  color: white;
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
</style>
