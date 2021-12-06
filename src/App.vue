<template>
  <v-app class="pr-100">
    <v-app-bar height="80" app class="pr-100" clipped-left>
      <div class="logo-wrapper">
        <v-img
            contain
            height="40"
            max-height="40"
            :src="require('@/assets/logo.png')"
        ></v-img>
      </div>
      <v-app-bar-nav-icon>
        <v-img
            contain
            height="27"
            max-height="27"
            :src="require('@/assets/mobile-toggle-icon.png')"
        ></v-img>
      </v-app-bar-nav-icon>
      <NavigationAvatar name="John Doe" class="d-flex justify-end w-full align-center"/>
    </v-app-bar>
    <v-navigation-drawer
        class="custom-drawer"
        width="100"
        clipped
        flat
        app
    >

      <div class="pt-9">
        <!-- in real app would be <router-link to="/foo">Go to Foo</router-link> -->
        <div
            class="d-flex w-full justify-center pointer pb-6"
            v-for="item in navItems"
            :key="item.title"
        >
          <v-img
              width="24"
              height="24"
              max-width="24"
              max-height="24"
              :src="require(`@/assets/${item.img}`)"
              :alt="item.title"
          >
          </v-img>
        </div>
      </div>
    </v-navigation-drawer>
    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pt-9">

        <!-- would use router in real world app -->
        <!--        <router-view></router-view>-->
        <Report/>
      </v-container>

      <div class="absolute bottom-0 pl-3">
        <div class="d-flex gap-x-3">
          <!-- in real app coul be <router-link to="/foo">Go to Foo</router-link> or a popup -->
          <span class="primary--text font-weight-bold">
        Terms&Conditions
      </span>
          <span class="primary--text">|</span>
          <span class="primary--text font-weight-bold">
          Privacy policy
        </span>
        </div>
      </div>

    </v-main>

  </v-app>
</template>

<script>
import Report from "./views/Report";
import NavigationAvatar from "./components/NavigationAvatar";

export default {
  name: 'App',

  components: {
    NavigationAvatar,
    Report,
  },

  data: () => ({
    navItems: [
      {
        title: 'Nav1',
        img: 'nav-1.png'
      },
      {
        title: 'Nav2',
        img: 'nav-2.png'
      },
      {
        title: 'Nav3',
        img: 'nav-3.png'
      },
      {
        title: 'Report',
        img: 'report-icon.png'
      },
      {
        title: 'Nav last',
        img: 'nav-last.png'
      }
    ]
  }),
};
</script>
<style>
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  min-width: 100px;
  height: 80px;
}

.pr-100 {
  padding-right: 100px;
}

.w-full {
  width: 100%;
}

.pointer {
  cursor: pointer;
}

.gap-x-3 {
  column-gap: 6px;
}

.absolute {
  position: absolute;
}

.bottom-0 {
  bottom: 0;
}

</style>
