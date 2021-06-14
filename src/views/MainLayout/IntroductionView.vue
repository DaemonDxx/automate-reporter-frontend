<template>
  <v-container>
    <v-card class="elevation-0 rounded-lg mt-4 mb-3">
      <v-card-title>
        О сайте
      </v-card-title>
      <v-card-text>
        <div>
          Данный сайт поможет узнать, как влияет изменение температуры на отпуск в сеть в электрических сетях ПАО Россети Сибирь.
        </div>
      </v-card-text>
    </v-card>
    <div class="option">
        <v-card
            v-for="item in items"
            :key="item.title"
            class="elevation-0 rounded-lg option_card"
        >
          <v-card-title>
            {{item.title}}
          </v-card-title>
          <v-card-text>
            <span class="text_option">{{item.text}}</span>
          </v-card-text>
        </v-card>
    </div>

    <v-card class="elevation-0 rounded-lg mt-3">
      <v-card-text class="text-center">
          <div>
            Более подробно о том, как выполняется расчет и как рассчитать температурный фактор без данного ресурса, а так же, необходимая вспомогательная информация
            прикреплена по ссылкам ниже
          </div>
        <div class="mt-2">
          <v-btn
            icon
            link
            href="/metodic.docx"
            color="primary"
            large
            target="download"
          >
            <v-icon>
              mdi-file-word-outline
            </v-icon>
          </v-btn>
          <v-btn
              icon
              link
              href="/coeff.pdf"
              color="primary"
              large
              target="download"
          >
            <v-icon>
              mdi-pdf-box
            </v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "IntroductionView",
  data: () => {
    return {
      items: [
        {
          title: 'База данных',
          text: `В базе данных вы можете ознакомиться
           изменениями температуры и отпуска в сеть на территории
           присутствия Общества по филиально с 2014 по настоящее время.
           Просто выберите два года, которые необходиом будет сравнить и
           настройте фильтры под себя.
           `,
        },
        {
          title: 'Расчет',
          text: `Если же вам нужно провести расчеты, которых нет в базе данных
              необходимо спрогнозировать изменение отпуска в сеть, то вы можете это
              сделать во вкладке РАСЧЕТ. Просто выберите необходимый филиал,
              введите отпус в сеть за прошлый период и значения температур
              за прошлый и текущий период и произведите расчет.
              `
        },
        {
          title: 'Обновление БД',
          text: `Для обновления/изменения/добавления данных, который используются при
                отображении во вкладке БАЗА ДАННЫХ, вы можете загрузить файл в формате
                EXCEL на сайт, тем самым обновив данные. Шаблоны файлов находятся во вкладке.
                Для перехода на данную вкладку необходимо иметь права доступа администратора!
          `
        },
      ]
    }
  }
}
</script>

//TODO переписать на grid
<style lang="sass" scoped>
.option
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  &_card
    flex-basis: 260px
    flex-shrink: 1
    flex-grow: 1
  :nth-child(2)
    margin-left: 8px
    margin-right: 8px

@media (max-width: 826px)
  .option
    :nth-child(1)
      margin-right: 4px
    :nth-child(2)
      margin-left: 4px
      margin-right: 0px
    :nth-child(3)
      margin-top: 8px


@media (max-width: 567px)
  .option
    :nth-child(2)
      margin: 8px 0


.text_option
  text-align: justify
</style>