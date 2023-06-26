<template>
    <card class="card-user" style="padding: 20px 20px 0px 20px;">
        <div class="row" style="margin-left: 20px; transform: scale(0.70); margin-left: calc((0.5 - 1) * 390px); margin-top: calc((0.5 - 1) * 100px); margin-bottom: calc((0.5 - 1) * 120px);">
            <img
            class="avatar border-white"
            src="@/assets/img/faces/face-2.jpg"
            alt="..."
            style="transform: scale(0.5);"
          />
          <h4 class="title" style="margin-left: calc((0.5 - 1) *30px);">
            r/Singapore
            <a href="#">
              <small>&#2022 Posted by: @chetfaker</small>
            </a>
            <small>&nbsp 5 days ago</small>
          </h4>
        </div>
          <h4 class="title">
            PSA: Buy your concert tickets directly at SingPost
          </h4>
      <div >
        <p>
          I've been doing ticketing for recent 2023 concert sales and I've noticed somehow the queue numbers can go up to 100k+. This was never the case for previous concert ticketing done with Ticketmaster. I used to be able to get tickets fast under 5min after the sale opened, even without presale. My queue number could be in the thousands but the queue system worked really fast unlike this time when I tried for ATEEZ and The Boyz ticketing.
<br/>
Some people reported having queue numbers of 900k for Coldplay for a PRESALE alone. I have suspicions that this is caused by the people openly promoting and selling bypass links. (Yes, they even have bypass links for presale).
<br/>
True enough, this whole chaos started with the TWICE concert this June with insane queue numbers. Many of the sellers started with selling TWICE bypass links. Some have the audacity to even advertise on Carousell. (Carousell is doing a very poor job at regulating ads on their platform.)
        </p>
        <div slot="image">
        <img src="@/assets/img/background.jpg" alt="..." />
      </div>
      </div>
      <hr />
      <div class="text-center">
        <div class="row">
          <h5>
              Comments
              <br />
              <small>57</small>
            </h5>
            <h5>
              Share
              <br />
              <small> -></small>
            </h5>
            <h5>
              Save
              <br />
              <small>V</small>
            </h5>
        </div>
      </div>
    </card>
  </template>
  <script>
  export default {
    methods: {
      getClasses(index) {
        var remainder = index % 3;
        if (remainder === 0) {
          return "col-lg-3 offset-lg-1";
        } else if (remainder === 2) {
          return "col-lg-4";
        } else {
          return "col-lg-3";
        }
      },
    },
  };
  </script>
  <style></style>
  