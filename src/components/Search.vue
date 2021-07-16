<template>
  <div class="flex flex-row items-center">
    <div class="w-1/6 h-10 pl-3 pr-2 my-4 bg-white border rounded-full flex justify-between items-center relative">
      <input type="search" v-model="value" name="search" id="search" placeholder="Search"
            class="appearance-none w-full outline-none focus:outline-none active:outline-none"/>
      <button type="submit" class="ml-1 outline-none focus:outline-none active:outline-none">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24" class="w-6 h-6">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
    <div class="ml-4 shadow-xl text-pink-500" v-if="NO_FOUND_MODAL">No data found</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Search',
    computed: {
      ...mapGetters(['ALBUMS', 'CURRENT_PAGE', 'SEARCH_VALUE', 'NO_FOUND_MODAL'])
    },
    data(){
      return {
        value: '',
      }
    },
    methods: {
      ...mapActions(['FILTER_ALBUMS', 'GET_CURRENT_ROWS', 'GET_SEARCH_VALUE'])
    },
    watch: {
        CURRENT_PAGE(){
          this.GET_CURRENT_ROWS()
        },
        ALBUMS(){
          this.GET_CURRENT_ROWS()
        },
        value(){
          this.GET_SEARCH_VALUE(this.value)
        },
        SEARCH_VALUE(){
          this.FILTER_ALBUMS()
        }
    }
}
</script>

<style>

</style>