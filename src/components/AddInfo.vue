<template>
    <div class="border-b border-gray-200 bg-yellow-50 flex flex-row items-center justify-between">
        <div class="main-info flex flex-row items-center">
            <div class="flex flex-col py-3 px-6">
                <div>Album ID:</div>
                <div>Photo ID:</div>
                <div>Title:</div>
            </div>
            <div class="flex flex-col py-3 px-6">
                <div>{{photo.albumId}}</div>
                <div>{{photo.id}}</div>
                <div>{{photo.title}}</div>
            </div>
        </div>
        <div class="px-6 pb-4 w-1/4 flex flex-col items-center">
            <div class="text-center">Photo:</div>
            <img class="w-40" :src="photo.url" alt="photo">
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddInfo',
    props: {
        photo: Object
    }
}
</script>

<style>

</style>