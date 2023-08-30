<template>
  <div
    class="qa-pa-md"
    style="
      padding: 4px;
      font-size: large;
      max-width: 80%;
      text-align: left;
      word-spacing: 6px;
    "
  >
    <q-card flat>
      <q-card-section style="font-weight: bolder">
        {{ $t("ABOUT_TEXT_TITLE") }}
      </q-card-section>
      <q-card-section>
        {{ $t("ABOUT_TEXT_1") }}
      </q-card-section>
      <q-card-section>
        {{ $t("ABOUT_TEXT_2") }}
      </q-card-section>
      <q-card-section> {{ $t("ABOUT_TEXT_3") }} </q-card-section>
      <q-card-section style="font-weight: bolder">
        {{ $t("ABOUT_TEXT_GITHUB") }}
      </q-card-section>
      <q-card-section
        ><a
          href="https://github.com/ilya-smirnov-de/boundary-agents"
          target="_blank"
          >Frontend (Vue 3 / Quasar component library)</a
        > </q-card-section
      ><q-card-section>
        <a
          href="https://github.com/ilya-smirnov-de/boundary-agents-be"
          target="_blank"
          >Backend (Python 3)</a
        >
      </q-card-section>
    </q-card>
  </div>
</template>
<script></script>
