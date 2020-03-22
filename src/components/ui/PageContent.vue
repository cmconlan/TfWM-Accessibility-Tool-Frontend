<template>
  <div class="flex flex-row w-full h-full">

    <LeftSidebar class="relative z-20" style="transition: width 0.5s;" :class="{'w-1/12': showLeftSidebar, 'w-0': !showLeftSidebar}" />

    <multipane
      class="custom-resizer"
      :class="mapWidth"
      style="transition: width 0.5s;"
      @paneResize="paneResized"
      @paneResizeStop="paneResizeStopped"
      @paneResizeStart="paneRisizeStarted">
      <div class="pane" style="width: 50%" ref="leftMap">
        <div class="w-full h-full relative" >
          <transition name="fade">
            <div
              class="absolute top-0 left-0 w-full h-full flex"
              style="background-color: rgba(0, 0, 0, 0.4); z-index: 999999;"
              v-if="showLeftMapCollapse"
            >
              <div class="m-auto">
                <ArrowCollapseLeft fillColor="#FFFFFF" :size="38" style="margin: auto"/>
              </div>
            </div>
          </transition>
          <Map class="w-full h-full" :id="1" />
        </div>
        Test
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="pane" style="flexGrow: 1;" ref="rightMap">
        <div class="w-full h-full" >
          <transition name="fade">
            <div
              class="absolute top-0 left-0 w-full h-full flex"
              style="background-color: rgba(0, 0, 0, 0.4); z-index: 999999;"
              v-if="showRightMapCollapse"
            >
              <div class="m-auto">
                <ArrowCollapseRight fillColor="#FFFFFF" :size="38" style="margin: auto"/>
              </div>
            </div>
          </transition>
          <Map class="w-full h-full" :id="2" />
        </div>
      </div>
    </multipane>

    <LeftSidebar class="relative z-20" style="transition: width 0.5s;" :class="{'w-1/12': showRightSidebar, 'w-0': !showRightSidebar}" />

  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js"

import Map from "@/components/Map";
import LeftSidebar from "@/components/ui/LeftSidebar";
import { Multipane, MultipaneResizer } from 'vue-multipane';
import ArrowCollapseLeft from "vue-material-design-icons/ArrowCollapseLeft.vue";
import ArrowCollapseRight from "vue-material-design-icons/ArrowCollapseRight.vue";

export default {
  components: {
    Map,
    Multipane,
    LeftSidebar,
    MultipaneResizer,
    ArrowCollapseLeft,
    ArrowCollapseRight
  },
  data() {
    return {
      showLeftSidebarMaster: true,
      showRightSidebarMaster: true,
      showLeftSidebarOnFinish: false,
      showRightSidebarOnFinish: false,
      showLeftMap: true,
      showRightMap: true,
      showLeftMapCollapse: false,
      showRightMapCollapse: false
    };
  },
  methods: {
    paneRisizeStarted() {
      if (this.showLeftMap == false) {
        this.showLeftSidebarOnFinish = this.showLeftSidebarMaster;
        this.showLeftSidebarMaster = false;
        this.$refs['leftMap'].style.width = "0%";
        this.showLeftMap = true;
      }
      if (this.showRightMap == false) {
        this.showRightSidebarOnFinish = this.showRightSidebarMaster;
        this.showRightSidebarMaster = false;
        this.$refs['leftMap'].style.width = "100%";
        this.showRightMap = true;
      }
      console.log(this.$refs['leftMap'].style);
    },
    paneResized($el1, $el2, $size) {
    /* eslint no-console: ["error", { allow: ["log", "error"] }] */
      console.log($size);
      var floatSize = parseFloat($size.slice(0, -1));
      if (floatSize <= 10) {
        this.showLeftMapCollapse = true;
      } else {
        this.showLeftMapCollapse = false;
      }
      if (floatSize >= 90) {
        this.showRightMapCollapse = true;
      } else {
        this.showRightMapCollapse = false;
      }
      EventBus.$emit("refreshMaps");
    },
    paneResizeStopped() {
      if (this.showLeftMapCollapse) {
        this.showLeftMap = false;
        this.$refs['leftMap'].style.width = "0%";
        EventBus.$emit("refreshMaps");
      }
      if (this.showRightMapCollapse) {
        this.showRightMap = false;
        this.$refs['leftMap'].style.width = "100%";
        EventBus.$emit("refreshMaps");
      }
      if (this.showLeftSidebarOnFinish) {
        this.showLeftSidebarMaster = true;
      }
      if (this.showRightSidebarOnFinish) {
        this.showRightSidebarMaster = true;
      }
    }
  },
  computed: {
    showLeftSidebar() {
      return this.showLeftSidebarMaster && this.showLeftMap;
    },
    showRightSidebar() {
      return this.showRightSidebarMaster && this.showRightMap;
    },
    mapWidth() {
      if (this.showLeftSidebar && this.showRightSidebar) {
        return "w-10/12";
      } else if (this.showLeftSidebar || this.showRightSidebar) {
        return "w-11/12";
      } else {
        return "w-full";
      }
    },
    leftPaneStyle() {
      if (!this.showLeftMap) {
        return "width: 0%;";
      } else {
        return ""
      }
    },
    rightPaneStyle() {
      return this.showRightMap ? 'flexGrow: 1;' : 'width: 0%;';
    }
  }
};
</script>

<style lang="scss">
.custom-resizer {
  width: 100%;
}
.custom-resizer > .pane {
  border: 1px solid #ccc;
}
.custom-resizer > .pane ~ .pane {
}
.custom-resizer > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
</style>
