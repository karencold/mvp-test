import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#005B96',
        headings: '#011F4B',
        body: '#7E8299'
      },
    },
  },
})