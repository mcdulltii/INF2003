<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="..." />
    </div>
    <div>
      <div class="author">
        <img
          class="avatar border-white"
          src="@/assets/img/faces/face-2.jpg"
          alt="..."
        />
        <h4 class="title">
          {{user_name}}
          <br />
          <a href="#">
            <small>@{{user_name}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        Hello! I'm just here to post random updates
      </p>
    </div>
    <hr />
    <div class="text-center">
      <div class="row">
        <div
          v-for="(info, index) in details"
          :key="index"
          :class="getClasses(index)"
        >
          <h5>
            {{ info.title }}
            <br />
            <small>{{ info.subTitle }}</small>
          </h5>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      details: [
        {
          title: localStorage.getItem('post_count'),
          subTitle: "Posts",
        },
        {
          title: "24",
          subTitle: "Comments",
        },
      ],
      user_name: localStorage.getItem('username'),
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-4";
      } else if (remainder === 2) {
        return "col-lg-5";
      } else {
        return "col-lg-3";
      }
    },
    
  },
  
};
</script>
<style></style>
