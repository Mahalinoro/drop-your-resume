<template>
  <q-page>
    <div class="full-width row inline wrap justify-start q-pt-lg">
      <div class="div-w ele-center">
        <div class="text-justify font-body-size body-div">
          <p class="font-body">
            <span class="font-page">Drop Your Resume</span> is a free online
            storage platform to manage your CV/Resume in one place.
          </p>
        </div>

        <div>
          <q-list class="q-px-md q-pt-xs q-pb-md" style="max-width: 450px">
            <q-item class="q-mb-sm"
            v-for="item in listItem"
            :key="item.icon"
            >
              <q-item-section top avatar>
                <q-avatar
                  style="opacity: 0.8"
                  color="primary"
                  text-color="white"
                  rounded
                  :icon="item.icon"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="font-page text-justify font-body-title">{{ item.title }}</q-item-label>
                <q-item-label caption class="font-caption text-justify"
                  >{{ item.description }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="ele-center center">
          <q-btn unelevated no-caps color="primary" @click="dialog = true" class="sairar-font-md primary-btn q-px-md" label="Get Started" />
        </div>
      </div>

      <div class="div-w ele-center resume-pad center">
        <img class="resume" src="~/assets/resume.svg" />
      </div>
    </div>

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
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  
  data() {
    return {
      dialog: false,
      listItem: [
        {
          icon: "folder",
          title: "Upload & Manage",
          description:"Upload your files easily by drag & drop. Manage your stored files in one place."
        },

        {
          icon: "share",
          title: "Share  to the World",
          description:"Each file uploaded contain a custom link. You can share your CV/Resume on every platform."
        },

        {
          icon: "security",
          title: "High Security & Privacy",
          description:"Your personal data is secured and encrypted as privacy is essential to us."
        },
      ]
    };
  }
};
</script>
