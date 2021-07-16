<template>
    <div class="">
        <div class="border-b border-gray-200 hover:bg-gray-100 flex flex-row justify-between" :class="rejection ? 'bg-red-500 hover:bg-red-300' : ''">
            <div class="py-3 px-6 w-1/4 text-left whitespace-nowrap flex items-center">
                <span class="font-medium">{{albumData.id}}</span>
            </div>
            <div class="py-3 px-6 w-1/4 text-center flex items-center justify-center">
                <span>{{albumData.userId}}</span>
            </div>
            <div class="py-3 px-6 w-1/4 text-center flex items-center justify-center">
                    {{albumData.title}}
            </div>
            <div class="py-3 px-6 w-1/4 text-center flex items-center justify-center">
                <div class="transform hover:text-purple-500 hover:scale-110 cursor-pointer" v-if="!addInfo" @click="showInfo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                </div>
                <div class="transform hover:text-purple-500 hover:scale-110 cursor-pointer" v-if="addInfo" @click="showInfo">
                    <img width="20" height="20" src="../img/hideInfo.svg" alt="hideInfo">
                </div>
                <div class="transform ml-5 hover:text-purple-500 hover:scale-110 cursor-pointer transition duration-300 ease-in-out" @click="reject" :class="rejection ? 'rotate-180' : ''">
                    <img width="20" height="20" src="../img/refuse.png" alt="refuse">
                </div>
            </div>
        </div>
        <div v-if="addInfo">
            <AddInfo v-for="row in photoData" :key="row.id" :photo="row"/>
        </div>
    </div>
</template>

<script>
import AddInfo from './AddInfo'

export default {
    name: 'TableRow',
    components: {
        AddInfo,
    },
    props: {
        albumData: {
            type: Object,

            default: () => {
                return {}
            }
        },
        photoData: Array,
    },
    data(){
        return {
            addInfo: false,
            rejection: false,
        }
    },
    methods: {
        showInfo(){
            this.addInfo = !this.addInfo
        },
        reject(){
            this.rejection = !this.rejection;
        }
    },
    watch: {
        rejection(){
            this.albumData.rejection = this.rejection
        }
    },
    computed: {

    },
    mounted(){
        this.rejection = this.albumData.rejection
    }
}
</script>

<style>

</style>