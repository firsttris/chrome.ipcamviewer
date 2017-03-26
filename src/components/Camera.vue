<template>
    <div class="image" :data-content="name" @click="OpenInTab" v-bind:class="{ hidden: isHidden }">
        <img :id='name' :alt="name" :src="getUrl">
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    components: {},
    props: ['url', 'name', 'username', 'password', 'type', 'singlefull'],
    data () {
      return {
        isHidden: true,
        fps: 1
      };
    },
    computed: {
      getUrl: function () {
        if (this.type === 'mjpg') {
          this.showIfHidden();
          return this.url;
        }
        if (this.type === 'jpg') {
          return '';
        }
      }
    },
    methods: {
      showIfHidden() {
        if (this.isHidden) {
          this.isHidden = false;
        }
      },
      OpenInTab() {
        const connection = {
          url: this.url,
          name: this.name,
          username: this.username,
          password: this.password,
          type: this.type
        };
        if (!this.singlefull) {
          localStorage.setItem(this.name, JSON.stringify(connection));
          chrome.tabs.create({'url': chrome.extension.getURL('options.html#/' + this.name)});
        } else {
          chrome.tabs.query({active: true}, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
          });
        }
      },
      findObjectByPropertyInArray(nameKey, myArray){
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].url === nameKey) {
            return myArray[i];
          }
        }
      },
      addBasicAuthToRequestHeader() {
        chrome.webRequest.onBeforeSendHeaders.addListener(
          (details) => {
            const connections = JSON.parse(localStorage.getItem('connections'));
            const connection = this.findObjectByPropertyInArray(details.url, connections);
            if(connection) {
              const basicAuth = {name: 'Authorization', value: "Basic " + btoa(connection.username + ":" + connection.password)};
              details.requestHeaders.push(basicAuth);
              return {requestHeaders: details.requestHeaders};
            }
          },
          {urls: ["<all_urls>"]},
          ["blocking", "requestHeaders"]);
      },
      getImageFromCamera() {
        this.fps = localStorage.getItem('fps');
        setInterval(() => {
          const now = new Date();
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
            if (element) {
              element.src = window.URL.createObjectURL(response.data);
              this.showIfHidden();
            }
          })
            .catch((error) => {
              console.log(error);
            });
        }, this.fps * 1000);
      }
    },
    created: function () {
      if (this.type === 'jpg') {
        this.getImageFromCamera();
      }
      if (this.type === 'mjpg') {
        this.addBasicAuthToRequestHeader();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        color: white;
    }
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