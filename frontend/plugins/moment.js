import moment from "moment";
import "moment/dist/locale/th";

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  
  moment.locale(nuxtApp?.$i18n?.locale?.value ?? "th");
  
  return {
    provide: {
      moment: moment,
    },
  };
});
