<template>
  <v-footer
    app
    color="white"
  >
    <v-container
        class="flex flex-column justify-center align-content-center"
    >
      <div
          class="footer_item"
      >
        <span class="footer_text">Разработано для внутреннего использования</span>
      </div>
      <div
        class="footer_item"
      >
        <span class="footer_text">Ведущий специалист НБиАП Еронин Юрий Петрович</span>
      </div>
      <div
          class="footer_item"
      >
        <ul class="footer_list">
          <li
            v-for="contact in contactMethods"
            :key="contact.link"
          >
            <a
              :href="contact.link"
            >
              <v-icon
                color="primary"
                small
                >
                {{contact.icon}}
              </v-icon>
            </a>
          </li>
        </ul>
      </div>

    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "MyFooter",
  data: () => {
    return {
      contactMethods: [
        {
          icon: 'mdi-email',
          link: 'mailto:eronin_up@rosseti-sib.ru',
        },
        {
          icon: 'mdi-phone',
          link: 'tel:+79770322831',
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.footer_item
  text-align: center

.footer_list
  list-style: none
  li
    display: inline-block
    padding-left: 6px
    padding-right: 6px
    a
      text-decoration: none

.footer_text
  font-size: 0.75rem
</style>