<template>
    <div class="image" :data-content="name" :class="{ hidden: isHidden }" @click="OpenInTab">
        <img :id='name' :alt="name">
    </div>
</template>

<script>
  export default {
    components: {},
    props: ['url', 'name', 'username', 'password', 'type', 'singlefull'],
    data () {
      return {
        isHidden: true,
        fps: 1,
        headers: new Headers({'Authorization': 'Basic ' + btoa(this.username + ":" + this.password)}, { 'cache-control': 'no-store' })
      };
    },
    created: function () {
        this.createTriggerForJpgCamera();
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
          this.$router.push({ path: this.name })
        } else {
          this.$router.push({ path: 'multiview' })
        }
      },
      createTriggerForJpgCamera() {
        this.fps = localStorage.getItem('fps');
        setInterval(() => {
          let element = document.getElementById(this.name);
          if (element) {
            this.fetchJpg(element);
            this.showIfHidden();
          }
        }, this.fps * 1000);
      },
      arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
      },
      fetchJpg(element) {
        const options = {
          method: 'GET',
          headers: this.headers,
          mode: 'cors',
          cache: 'no-store'
        };
        const request = new Request(this.url);
        fetch(request, options).then((response) => {
          response.arrayBuffer().then((buffer) => {
            const base64Flag = 'data:image/jpeg;base64,';
            const imageStr = this.arrayBufferToBase64(buffer);
            element.src = base64Flag + imageStr;
          });
        });
      },
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