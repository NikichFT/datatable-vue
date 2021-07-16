<template>
  <div class="pagination flex justify-center space-x-2 font-light">
        <a v-for="number in pageNum" :key="number" href='!#' @click.prevent="PAGINATE(number)" class="page-num cursor-pointer hover:scale-110" :class="number === CURRENT_PAGE ? 'border-b-2 font-medium' : ''">
            {{number}}
        </a>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex' 

export default {
    name: 'Pagination',
    props: {
        totalAlbums: Number
    },
    computed: {
        ...mapGetters(['CURRENT_ROWS', 'CURRENT_PAGE', 'ROWS_PER_PAGE']),
        pageNum(){
            const pageNum = []
            for (let i = 1; i <= Math.ceil(this.totalAlbums / this.ROWS_PER_PAGE); i++){
                pageNum.push(i)
            }
            return pageNum
        }
    },
    methods: {
        ...mapActions(['GET_CURRENT_ROWS', 'PAGINATE']),
    }
}
</script>

<style>

</style>