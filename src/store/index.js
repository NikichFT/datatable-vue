import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: [],
    photos: [],
    currentRows: [],
    filteredAlbums: [],
    originalAlbums: [],
    searchValue: null,
    noFoundModal: false,
    rowsPerPage: 20,
    currentPage: 1,
    albumsIdSort: 'ASCENDING',
    usersIdSort: 'ASCENDING',
    titleSort: 'ASCENDING',
  },
  mutations: {
    SET_ALBUMS: (state, albums) => {
      state.albums = albums
      state.originalAlbums = albums
    },
    SET_PHOTOS: (state, photos) => {
      state.photos = photos
    },
    SET_ROWS: (state, currentRows) => {
      state.currentRows = currentRows
    },
    SET_CURRENT_PAGE: (state, currentPage) => {
      state.currentPage = currentPage
    },
    SET_SORT_BY_ALBUMID: (state, sortedAlbums) => {
      state.albums = sortedAlbums
    },
    SET_SORT_BY_USERID: (state, sortedAlbums) => {
      state.albums = sortedAlbums
    },
    SET_SORT_BY_TITLE: (state, sortedAlbums) => {
      state.albums = sortedAlbums
    },
    SET_SEARCH_VALUE: (state, searchValue) => {
      state.searchValue = searchValue
    },
    SET_FILTER_ALBUMS: (state, filterAlbums) => {
      state.filteredAlbums = filterAlbums
      if (filterAlbums.length === 0) {
        state.albums = state.originalAlbums
        if (state.searchValue) {
          state.noFoundModal = true
        }
      } else {
        state.albums = filterAlbums
        state.noFoundModal = false
      }
    }
  },
  actions: {
    async GET_ALBUMS({commit}) {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums')
      const albums = await res.json()

      commit('SET_ALBUMS', albums)   
    },
    async GET_PHOTOS({commit}) {
      const res = await fetch('https://jsonplaceholder.typicode.com/photos')
      const photos = await res.json()

      commit('SET_PHOTOS', photos)
    },
    GET_CURRENT_ROWS({commit}) {
      const lastRowIndex = this.state.currentPage * this.state.rowsPerPage
      const firstRowIndex = lastRowIndex - this.state.rowsPerPage
      const currentRows = this.state.albums.slice(firstRowIndex, lastRowIndex)

      commit('SET_ROWS', currentRows)
    },
    PAGINATE({commit}, number) {
      const currentPage = number
      window.scrollTo(0,0)

      commit('SET_CURRENT_PAGE', currentPage)
    },
    SORT_BY_ALBUMID({commit}){
      let sortedAlbums
      
      switch (this.state.albumsIdSort) {
        case 'ASCENDING': 
          sortedAlbums = this.state.albums.sort((a, b) => b.id - a.id);
          this.state.albumsIdSort = 'DESCENDING';

          commit('SET_SORT_BY_ALBUMID', sortedAlbums)
          break

        case 'DESCENDING': 
          sortedAlbums = this.state.albums.sort((a, b) => a.id - b.id);
          this.state.albumsIdSort = 'ASCENDING';

          commit('SET_SORT_BY_ALBUMID', sortedAlbums)
          break

        default:
          break
      }
    },
    SORT_BY_USERID({commit}){
      let sortedAlbums
      
      switch (this.state.usersIdSort) {
        case 'ASCENDING': 
          sortedAlbums = this.state.albums.sort((a, b) => b.userId - a.userId);
          this.state.usersIdSort = 'DESCENDING';

          commit('SET_SORT_BY_USERID', sortedAlbums)
          break

        case 'DESCENDING': 
          sortedAlbums = this.state.albums.sort((a, b) => a.userId - b.userId);
          this.state.usersIdSort = 'ASCENDING';

          commit('SET_SORT_BY_USERID', sortedAlbums)
          break

        default:
          break
      }
    },
    SORT_BY_TITLE({commit}){
      let sortedAlbums
      
      switch (this.state.titleSort) {
        case 'ASCENDING': 
          sortedAlbums = this.state.albums.sort((a, b) => b.title.localeCompare(a.title));
          this.state.titleSort = 'DESCENDING';

          commit('SET_SORT_BY_TITLE', sortedAlbums)
          break

        case 'DESCENDING': 
          sortedAlbums = this.state.albums.sort((a, b) => a.title.localeCompare(b.title));
          this.state.titleSort = 'ASCENDING';

          commit('SET_SORT_BY_TITLE', sortedAlbums)
          break

        default:
          break
      }
    },
    GET_SEARCH_VALUE({commit}, searchValue){
      commit('SET_SEARCH_VALUE', searchValue)
    },
    FILTER_ALBUMS({commit}){

      if (typeof this.state.searchValue === 'string') {
        const filterAlbums = this.state.originalAlbums.filter((obj) => obj.title.toLowerCase().match(this.state.searchValue.toLowerCase()))

        commit('SET_FILTER_ALBUMS', filterAlbums)
      }
      if (!isNaN(this.state.searchValue)) {
        const filterAlbums = this.state.originalAlbums.filter((obj) => obj.id == this.state.searchValue || obj.userId == this.state.searchValue)

        commit('SET_FILTER_ALBUMS', filterAlbums)
      }
      if (!this.state.searchValue) {
        commit('SET_FILTER_ALBUMS', [])
      }
    }

  },
  getters: {
    ALBUMS(state) {
      return state.albums
    },
    PHOTOS(state) {
      return state.photos
    },
    CURRENT_ROWS(state) {
      return state.currentRows
    },
    CURRENT_PAGE(state) {
      return state.currentPage
    },
    ROWS_PER_PAGE(state) {
      return state.rowsPerPage
    },
    ALBUMS_ID_SORT(state) {
      return state.albumsIdSort
    },
    USERS_ID_SORT(state) {
      return state.usersIdSort
    },
    TITLE_SORT(state) {
      return state.titleSort
    },
    SEARCH_VALUE(state) {
      return state.searchValue
    },
    NO_FOUND_MODAL(state) {
      return state.noFoundModal
    }
  }
})
