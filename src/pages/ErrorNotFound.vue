<template>
  <div
    class="fullscreen bg-green text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div class="text-h2" style="opacity: 0.4">Page not found</div>
      <q-btn
        class="q-mt-xl"
        color="blue"
        text-color="white"
        unelevated
        to="/"
        label="Zurück"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
