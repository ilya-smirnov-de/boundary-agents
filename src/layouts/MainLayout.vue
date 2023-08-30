<template>
  <q-layout view="LHh lpR fFf">
    <q-header class="header_normal; text-grey-2 q-py-md">
      <q-toolbar class="q-px-sm q-py-sm">
        <div class="col">
          <span>
            <transition name="hmenu">
              <slot name="h-links">
                <q-list dense padding class="rounded-borders h-nav">
                  <q-item
                    active-class="tab-active"
                    to="/"
                    exact
                    class="navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section>{{ $t("MENU_START") }}</q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/search"
                    class="navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section>{{ $t("MENU_PERSONS") }}</q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/courts"
                    class="navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section>{{
                      $t("MENU_LIVING_WORLDS")
                    }}</q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/about"
                    class="navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section>{{ $t("MENU_ABOUT") }}</q-item-section>
                  </q-item>
                </q-list>
              </slot>
            </transition>
          </span>
        </div>
        <div class="col"><img class="logo" src="~assets/logo.png" /></div>
        <q-select
          @update:model-value="(val) => updateLang(val)"
          class="q-pr-md"
          dark
          color="green"
          v-model="locale"
          :options="localeOptions"
          label="Language"
          dense
          emit-value
          map-options
          style="min-width: 120px; font-size: larger"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MainLayout",
  methods: {
    updateLang(lang) {
      localStorage.setItem("lang", lang);
    },
  },
  mounted() {
    if (localStorage.getItem("lang")) {
      this.$i18n.locale = localStorage.getItem("lang");
    } else {
      localStorage.setItem("lang", this.$i18n.locale);
    }
  },
  setup() {
    const { locale } = useI18n({ useScope: "global" });

    return {
      show: true,
      locale,
      localeOptions: [
        { value: "en", label: "English" },
        { value: "de", label: "German" },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.navigation-item {
  font-size: large;
}

.h-nav {
  display: flex;
  float: left;
  flex-direction: row;
}
.logo {
  position: center;
  z-index: 0;
}
</style>
