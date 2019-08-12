<template>
    <div class="image" :data-content="name" @click="OpenInTab" v-bind:class="{ hidden: isHidden }">
        <img :id='name' :alt="name" :src="getUrl">
    </div>
</template>

<script>
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
        this.showIfHidden();
        return `${this.url}+?user=${this.username}&password=${this.password}`;
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
          this.$router.push({ path: this.name })
        } else {
          this.$router.push({ path: 'multiview' })
        }
      },
      createTriggerForCamera() {
        this.fps = localStorage.getItem('fps');
        setInterval(() => {
          const now = new Date();
          let element = document.getElementById(this.name);
          if (element) {
            element.src = this.url + '?' + now.getTime();
            this.showIfHidden();
          }
        }, this.fps * 1000);
      }
    },
    created: function () {
      if (this.type === 'jpg') {
        this.createTriggerForCamera();
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