<template>
      <!-- component -->
    <div class="overflow-x-auto">
        <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div class="w-full lg:w-5/6">
                <div class="bg-white shadow-md rounded my-8">
                    <Search/>
                    <div class="">
                        <div class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex flex-row justify-between">
                            <div class="py-3 px-6 w-1/4 text-left">
                                <div class="flex flex-row justify-start items-center">
                                    <span>Album ID</span> 
                                    <img src="../img/triangle.png" @click="SORT_BY_ALBUMID()" class="w-4 ml-2 h-3 transition duration-300 ease-in-out cursor-pointer transform hover:scale-110" :class="ALBUMS_ID_SORT === 'ASCENDING' ? 'rotate-180' : ''"/>
                                </div>
                            </div>
                            <div class="py-3 px-6 w-1/4 text-center items-center ">
                                <div class="flex flex-row justify-center items-center">
                                    <span>User ID</span>
                                    <img src="../img/triangle.png" @click="SORT_BY_USERID()" class="w-4 ml-2 h-3 transition duration-300 ease-in-out cursor-pointer transform hover:scale-110" :class="USERS_ID_SORT === 'ASCENDING' ? 'rotate-180' : ''"/>
                                </div>
                            </div>
                            <div class="py-3 px-6 w-1/4 text-center items-center">
                                <div class="flex flex-row justify-center items-center">
                                    <span>Title</span>
                                    <img src="../img/triangle.png" @click="SORT_BY_TITLE()" class="w-4 ml-2 h-3 transition duration-300 ease-in-out cursor-pointer transform hover:scale-110" :class="TITLE_SORT === 'ASCENDING' ? 'rotate-180' : ''"/>
                                </div>
                            </div>
                            <div class="py-3 px-6 w-1/4 text-center items-center">
                                <div class="flex flex-row justify-center items-center">
                                    <span>Actions</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-gray-600 text-sm font-light">
                          <TableRow v-for="row in CURRENT_ROWS" :key="row.id" :albumData="row" :photoData="PHOTOS.filter((el)=> el.albumId === row.id)"/>
                        </div>
                    </div>
                    <Pagination :totalAlbums="ALBUMS.length"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TableRow from './TableRow'
import Search from './Search'
import Pagination from './Pagination'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Table',
    components: {
        TableRow, Search, Pagination
    },
    computed: {
        ...mapGetters(['ALBUMS', 'PHOTOS', 'CURRENT_ROWS', 'CURRENT_PAGE', 'ALBUMS_ID_SORT', 'USERS_ID_SORT', 'TITLE_SORT'])
    },
    methods: {
        ...mapActions(['GET_ALBUMS', 'GET_CURRENT_ROWS', 'GET_PHOTOS', 'SORT_BY_ALBUMID', 'SORT_BY_USERID', 'SORT_BY_TITLE']),
    },
    watch: {
        CURRENT_PAGE(){
            this.GET_CURRENT_ROWS()
        },
        ALBUMS(){
            this.GET_CURRENT_ROWS()
        }
    },
    mounted() {
        this.GET_ALBUMS()
        this.GET_PHOTOS()
        .then(() => {
            this.GET_CURRENT_ROWS()
        })
    }
}
</script>

<style>
</style>