<template>
  <v-container>
    <v-card class="elevation-0 rounded-lg">
      <v-card-text>
        <div class="pa-1 mb-1">
          <span>
            Выберите два года для сравнения
          </span>
        </div>
        <year-selector
            :year-items="accessebleYear"
            v-on:update="getOffsetsByYear"
        />
        <v-slide-y-transition>
          <v-progress-linear
              :style="{opacity: !isProgressActive ? 0 : 1}"
              color="secondary"
              class="mt-3"
              :indeterminate="isProgressActive"
          />
        </v-slide-y-transition>


        <v-divider class="mt-6 mb-3"/>

        <table-offsets
            ref="table"
            :offsets="offsets"
        />
          <v-btn
              v-if="offsets.length > 0"
              color="secondary"
              class="mt-6"
              block
              link
              :loading="isDownloadFile"
              @click="handlerClick"
          >
            <v-icon left>
              mdi-file-excel
            </v-icon>
            Скачать в формате EXCEL
          </v-btn>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import YearSelector from "../../components/MainLayout/OffsetHistoryView/YearSelector";
import TableOffsets from "../../components/MainLayout/OffsetHistoryView/TableOffsets";
import {mapActions} from "vuex";
import {ACTION_DOWNLOAD_FILE} from "../../store/storageStore";
import {ACTION_CREATE_REPORT} from "../../store/reportStore";
import {ACTION_GET_ACCESSES_YEAR, ACTION_OFFSETS_BY_YEAR} from "../../store/solverStore";

export default {
name: "OffsetHistoryView",
  components: {TableOffsets, YearSelector},
  data: () => {
    return {
      isProgressActive: false,
      isDownloadFile: false,
      offsets: [],
      accessebleYear: [],
    }
  },
  methods: {

      ...mapActions([ACTION_DOWNLOAD_FILE, ACTION_CREATE_REPORT, ACTION_OFFSETS_BY_YEAR, ACTION_GET_ACCESSES_YEAR]),

    async getOffsetsByYear([year1, year2]) {
        this.isProgressActive = true;
        this.offsets = await this[ACTION_OFFSETS_BY_YEAR]({
          yearBefore: year1,
          yearNow: year2,
        });
        this.isProgressActive = false;
    },

    async handlerClick() {
        this.isDownloadFile = true;
        const filename = await this[ACTION_CREATE_REPORT]({
          formatOffset: this.$refs.table.dataTable,
          offsets: this.offsets,
        });
        if (filename) {
          await this[ACTION_DOWNLOAD_FILE](filename);
        }
        this.isDownloadFile = false;
    }

  },

  async beforeMount() {
   this.accessebleYear = await this[ACTION_GET_ACCESSES_YEAR]();
  },

}
</script>

<style lang="sass" scoped>

</style>