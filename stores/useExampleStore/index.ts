import { defineStore } from 'pinia'
import ExampleService from '~/services/example.service';

export const useExampleStore = defineStore('example', {
  state: () => ({
    examples: [],
    total: 0,
    isLoading: false,
    example: {},
  }),
  actions: {
    loadExamples(reqObj = {}) {
      this.isLoading = true;
      return new Promise(async (resolve, reject) => {
        const exampleService = new ExampleService();
        const res = await exampleService.loadAllWithPaging(reqObj) as any;
        if (!res.errors) {
          this.examples = res.records;
          this.total = res.total;
          this.isLoading = false;
          resolve(res);
        }
        else {
          this.examples = [];
          this.total = 0;
          this.isLoading = false;
          reject(res);
        }
      }
      );
    },
    getExample(reqObj = {
      _id: '',
    }) {
      return new Promise(async (resolve, reject) => {
        const exampleService = new ExampleService();
        const res = await exampleService.getById(reqObj._id) as any;
        if (!res.error) {
          this.example = res;
          resolve(res);
        }
        else {
          this.example = {};
          reject(res);
        }
      });
    },
    saveExample(reqObj: any) {
      return new Promise(async (resolve, reject) => {
        const exampleService = new ExampleService();
        const res = await exampleService.save(reqObj) as any;
        if (!res.error) {
          this.example = res;
          resolve(res);
        }
        else {
          this.example = {};
          reject(res);
        }
      })
    },
    updateExample(reqObj: any) {
      return new Promise(async (resolve, reject) => {
        const exampleService = new ExampleService();
        const res = await exampleService.update(reqObj) as any;
        if (!res.error) {
          this.example = res;
          resolve(res);
        }
        else {
          this.example = {};
          reject(res);
        }
      })
    }
  },
});
