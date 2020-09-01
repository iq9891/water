/** @format */

import { ref, onMounted } from 'vue';
import { rgbToHex } from '../../common/color';

const getColors = (typeValue: never[]): string[] => {
  const colors = [];
  for (let index = 1; index < typeValue.length; index++) {
    const typeEl = typeValue[index];
    const { backgroundColor } = getComputedStyle(typeEl);
    colors.push(rgbToHex(backgroundColor));
    console.log(backgroundColor, rgbToHex(backgroundColor), 'element');
  }
  return colors;
};

export default {
  name: 'adsf',
  props: {
    count: {
      type: Number,
      default: 10,
    },
    type: String,
  },
  setup() {
    const typeNodes = ref([]);
    const typeColors = ref([]);

    onMounted(() => {
      typeColors.value = getColors(typeNodes.value) as any;
      console.log(typeNodes.value, typeColors, 'typeNodes');
    });

    return {
      typeNodes,
      typeColors,
    };
  },
};
