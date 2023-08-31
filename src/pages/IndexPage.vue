<template>
  <q-page class="row items-center">
    <table style="width: 100%" cellpadding="24">
      <tr>
        <td style="width: 50%">
          <div
            style="
              padding: 4px;
              font-size: large;
              width: 90%;
              text-align: left;
              word-spacing: 6px;
            "
          >
            {{ $t("INTRO_TEXT_1") }}
            <br />
            {{ $t("INTRO_TEXT_2") }}
          </div>
        </td>
        <td style="width: 30%; min-height: 500px">
          <q-carousel
            top-right
            :keep-alive="true"
            class="carousel rounded-borders"
            animated
            v-model="slide"
            infinite
            :autoplay="autoplay"
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide
              v-for="image in images"
              :key="image.name"
              :name="image.name"
              v-ripple
              class="uncropped-image"
              :img-src="image.src"
            >
              <div class="absolute-bottom custom-caption">
                <div
                  v-if="$i18n.locale == 'de'"
                  style="
                    text-align: center;
                    font-size: larger;
                    font-weight: bolder;
                    color: rgb(184, 184, 71);
                  "
                >
                  {{ image.caption.de }}
                </div>
                <div
                  v-if="$i18n.locale != 'de'"
                  style="
                    text-align: center;
                    font-size: larger;
                    font-weight: bolder;
                    color: rgb(184, 184, 71);
                  "
                >
                  {{ image.caption.en }}
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </td>
      </tr>
    </table>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      slide: ref(1),
      images: ref([]),
      autoplay: ref(true),
    };
  },
  mounted() {
    this.images = [
      {
        src: require("../assets/slide-images/1a.jpg"),
        name: "image1a",
        caption: {
          de: "Antoine Pesne  (1683–1757), Erbprinz Friedrich Ludwig of Württemberg (1698-1731) mit seiner Gemahlin Henriette Marie von Brandenburg-Schwedt (1702-1782), Öl, zw. 1715 und 1725, Staatliches Museum Schwerin, public domain.",
          en: "Antoine Pesne  (1683–1757), Portrait of the Hereditary Prince Friedrich Ludwig of Württemberg and his wife Henriette Marie of Brandenburg-Schwedt, oil, between 1715 and 1725, Staatliches Museum Schwerin, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/1b.jpg"),
        name: "image1b",
        caption: {
          de: "Antoine Pesne  (1683–1757), Erbprinz Friedrich Ludwig of Württemberg (1698-1731) mit seiner Gemahlin Henriette Marie von Brandenburg-Schwedt (1702-1782), Öl, zw. 1715 und 1725, Staatliches Museum Schwerin, public domain.",
          en: "Antoine Pesne  (1683–1757), Portrait of the Hereditary Prince Friedrich Ludwig of Württemberg and his wife Henriette Marie of Brandenburg-Schwedt, oil, between 1715 and 1725, Staatliches Museum Schwerin, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/2a.jpg"),
        name: "image2a",
        caption: {
          de: "Antoine Pesne (1683–1757), Friedrich der Große als Kind mit seiner Schwester Wilhelmine, Öl/Lw., 1715, Staatliche Preußische Schlösser und Gärten Berlin-Brandenburg, public domain.",
          en: "Antoine Pesne (1683–1757), Frederick the Great as a child with his sister Wilhelmine, oil on canvas, 1715, Prussian Palaces and Gardens Foundation Berlin-Brandenburg, Potsdam, Germany, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/2b.jpg"),
        name: "image2b",
        caption: {
          de: "Antoine Pesne (1683–1757), Friedrich der Große als Kind mit seiner Schwester Wilhelmine, Öl/Lw., 1715, Staatliche Preußische Schlösser und Gärten Berlin-Brandenburg, public domain.",
          en: "Antoine Pesne (1683–1757), Frederick the Great as a child with his sister Wilhelmine, oil on canvas, 1715, Prussian Palaces and Gardens Foundation Berlin-Brandenburg, Potsdam, Germany, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/3a.jpg"),
        name: "image3a",
        caption: {
          de: "Jean Girardet  (1709–1778), Kopie nach Jacob van Schuppen  (1670–1751), Prinz Karl Alexander von Lothringen (1712-1780), 18. Jh., Musée des Beaux-Arts de Nancy, public domain.",
          en: "Jean Girardet  (1709–1778), copy after Jacob van Schuppen  (1670–1751), Prince Charles Alexander of Lorraine (1712-1780), 18th century, Musée des Beaux-Arts de Nancy, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/3b.jpg"),
        name: "image3b",
        caption: {
          de: "Jean Girardet  (1709–1778), Kopie nach Jacob van Schuppen  (1670–1751), Prinz Karl Alexander von Lothringen (1712-1780), 18. Jh., Musée des Beaux-Arts de Nancy, public domain.",
          en: "Jean Girardet  (1709–1778), copy after Jacob van Schuppen  (1670–1751), Prince Charles Alexander of Lorraine (1712-1780), 18th century, Musée des Beaux-Arts de Nancy, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/4a.jpg"),
        name: "image4a",
        caption: {
          de: "Anna Rosina de Gasc  (1713–1783), Karl Friedrich Albert, Markgraf von Brandenburg-Schwedt (1705–1762), Öl, 1737, Germanisches Nationalmuseum, public domain.",
          en: "Anna Rosina de Gasc  (1713–1783), Portrait of Charles Frederick Albert, Margrave of Brandenburg-Schwedt (1705–1762), oil, 1737, Germanisches Nationalmuseum, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/4b.jpg"),
        name: "image4b",
        caption: {
          de: "Anna Rosina de Gasc  (1713–1783), Karl Friedrich Albert, Markgraf von Brandenburg-Schwedt (1705–1762), Öl, 1737, Germanisches Nationalmuseum, public domain.",
          en: "Anna Rosina de Gasc  (1713–1783), Portrait of Charles Frederick Albert, Margrave of Brandenburg-Schwedt (1705–1762), oil, 1737, Germanisches Nationalmuseum, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/5a.jpg"),
        name: "image5a",
        caption: {
          de: "Johann Jakob Schmitz  (1724–1810), Fürstäbtissin Franziska Christine von Pfalz-Sulzbach mit Ignatius Fortuna, Öl/Lw., 2. Hälfte 18. Jahrhundert, Fürstin-Franziska-Christine-Stiftung, Germany, public domain.",
          en: "Johann Jakob Schmitz  (1724–1810), Francisca Christina of the Palatinate-Sulzbach (1696-1776) Princess-Abbess of Essen and Thorn, with Ignatius Fortuna, oil on canvas, 2nd half 18th century, Fürstin-Franziska-Christine-Stiftung, Germany, public domain.",
        },
      },
      {
        src: require("../assets/slide-images/5b.jpg"),
        name: "image5b",
        caption: {
          de: "Johann Jakob Schmitz  (1724–1810), Fürstäbtissin Franziska Christine von Pfalz-Sulzbach mit Ignatius Fortuna, Öl/Lw., 2. Hälfte 18. Jahrhundert, Fürstin-Franziska-Christine-Stiftung, Germany, public domain.",
          en: "Johann Jakob Schmitz  (1724–1810), Francisca Christina of the Palatinate-Sulzbach (1696-1776) Princess-Abbess of Essen and Thorn, with Ignatius Fortuna, oil on canvas, 2nd half 18th century, Fürstin-Franziska-Christine-Stiftung, Germany, public domain.",
        },
      },
    ];
  },
});
</script>
<style scoped>
.uncropped-image {
  background-size: contain; /* don't crop the image  */
  background-repeat: no-repeat; /* only show the image one time  */
  background-color: rgba(
    147,
    148,
    147,
    0.26
  ); /* color to fill empty space with  */
}
.carousel {
  border-radius: 12px;
}
</style>
