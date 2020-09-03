/** @format */

import { mount } from '@vue/test-utils';
import Link from './Link.vue';

describe('Link.vue', () => {
  let cb = null;
  // let loading: any = null;

  beforeEach(() => {
    cb = mount(Link);
    // loading = mount(Link, {
    //   propsData: {
    //     loading: true,
    //   },
    // });
  });

  it('test Link', (done) => {
    cb.vm.$nextTick(() => {
      try {
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });

  // it('test Link loading', (done) => {
  //   loading.vm.$nextTick(() => {
  //     try {
  //       expect(loading.vm.classList).toEqual([
  //         {
  //           'w-link-disabled': false,
  //           'w-link-loading': true,
  //           'w-link-loading-undefined': undefined,
  //           'w-link-undefined': undefined,
  //         },
  //       ]);

  //       done();
  //     } catch (err) {
  //       done.fail(err);
  //     }
  //   });
  // });
});
