<template>
    <div class="image" :data-content="name" @click="OpenInTab" v-bind:class="{ hidden: isHidden }">
        <img :id='name' :alt="name">
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    components: {},
    props: ['url', 'name', 'username', 'password', 'singlefull'],
    data () {
      return {
        isHidden: true,
        fps: 1
      };
    },
    methods: {
      OpenInTab() {
        const camToStore = {};
        if(!this.singlefull) {
          camToStore[this.name] = {url: this.url, name: this.name, username: this.username, password: this.password};
          chrome.storage.sync.set(camToStore, () => {
            chrome.tabs.create({'url': chrome.extension.getURL('options.html#/' + this.name)});
          });
        } else {
          chrome.tabs.query({ active: true }, function(tabs) {
            chrome.tabs.remove(tabs[0].id);
          });
        }
      }
    },
    created: function () {
      chrome.storage.sync.get(["fps"], (result) => {
        if (result && result.fps) {
          this.fps = result.fps;
          setInterval(() => {
            const now = new Date();
            //document.getElementById(this.name).src = this.url + '?' + now.getTime();
            axios({
              method: 'get',
              timeout: 5000,
              responseType: 'blob',
              url: this.url + '?' + now.getTime(),
              auth: {
                username: this.username,
                password: this.password
              }
            }).then((response) => {
              let element = document.getElementById(this.name);
              if(element) {
                element.src = window.URL.createObjectURL(response.data);
                if(this.isHidden) {
                  this.isHidden = false;
                }
              }
            })
              .catch((error) => {
                console.log(error);
              });
          }, this.fps * 1000);
        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .image {
        position: relative;

    }
    .hidden {
        visibility: hidden;
    }
    .image img {
        width: 100%;
        border: 1px solid black;
    }
    .image:after {
        content: attr(data-content);
        text-align: center;
        color: #fff;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
    }
    .image:hover:after {
        opacity: 0.3;
    }
</style>