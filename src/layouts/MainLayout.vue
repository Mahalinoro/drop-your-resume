<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header-pos bg-white">
      <div class="full-width row justify-between  items-center content-center">
        <div class="div-ws">
          <img class="logo-size" src="~/assets/logo.svg" />
        </div>

        <div class="overflow: auto">
          <q-btn
            unelevated
            no-caps
            color="primary"
            class="sairar-font primary-btn q-px-sm"
            label="Sign In / Sign Up"
            @click="dialog = true"
          />
        </div>
      </div>
    </q-header>

    <q-page-container class="container-pos">
      <router-view />
    </q-page-container>

    <q-dialog v-model="dialog">
      <q-card style="max-width:400px">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-selection class="column no-wrap flex-center">
          <q-spinner-hourglass
          color="primary"
          size="2em"
        />
        </q-card-selection>

        <q-card-section class="font-body q-pa-lg text-center">
          Feature still in construction! Thank you for your patience!
          You will hear from us soon when the new feature will be available.
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      dialog: false,
    };
  }
};
</script>

<style lang="scss">
.sairar-font {
  font-family: "Saira Semi Condensed", sans-serif;
  font-weight: 400;
}

.sairar-font-md {
  font-family: "Saira Semi Condensed", sans-serif;
  font-weight: 500;
}

.font-page {
  font-family: "Saira", sans-serif;
  font-weight: 400;
  color: $primary;
}

.font-body {
  font-family: "Saira", sans-serif;
  font-weight: 300;
  color: $dark;
}

@media only screen and (max-width: 600px) {
  .primary-btn {
    border-radius: 20px;
    opacity: 0.8;
    font-size: 10px;
  }

  .header-pos {
    padding: 2% 10% 2% 10%;
  }

  .container-pos {
    padding-left: 10%;
    padding-right: 10%;
  }

  .resume {
    width: 100%;
  }

  .font-body-size {
    font-size: 20px;
  }

  .font-body-title {
    font-size: 10px;
  }

  .body-div {
    width: 90%;
  }

  .font-caption {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    font-size: 10px;
    color: $dark;
  }

  .center {
    margin: auto;
    width: 80%;
    text-align: center;
  }

  .resume-pad {
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .logo-size {
    width: 100%;
  }

  .div-ws {
    width: 50%;
  }
}

@media only screen and (min-width: 600px) {
  .primary-btn {
    border-radius: 20px;
    opacity: 0.8;
    font-size: 15px;
  }

  .header-pos {
    padding: 2% 10% 2% 10%;
  }

  .container-pos {
    padding-left: 10%;
    padding-right: 10%;
  }

  .resume {
    width: 90%;
  }

  .font-body-size {
    font-size: 30px;
  }

  .div-w {
    width: 50%;
  }

  .body-div {
    width: 80%;
  }

  .font-caption {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: $dark;
  }

  .font-body-title {
    font-size: 15px;
  }

  .ele-center {
    margin: auto;
    width: 50%;
  }
}
</style>
