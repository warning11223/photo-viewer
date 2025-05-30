import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export const useTableStore = defineStore('table', () => {
  const photos = ref([])  // данные в таблице
  const page = ref(1)   // номер для infinite scroll
  const loading = ref(false)
  const hasMoreData = ref(true) // есть ли еще данные для infinite scroll
  const searchQuery = ref('') // значение в инпуте поиска
  const showSkeletons = ref(true)
  const sortField = ref('')   // название фильтра
  const sortOrder = ref('asc')  // сортировка asc || desc

  const savedAlbumIds = localStorage.getItem('albumIds')

  if (savedAlbumIds) {
    searchQuery.value = savedAlbumIds
  }

  // Id альбомов из поиска
  const albumIds = computed(() => {
    return searchQuery.value
      .split(' ')
      .map(id => id.trim())
      .filter(Boolean)
  })

  // Функция для загрузки фотографий с учетом введенного ID альбома
  const loadPhotos = async () => {
    if (loading.value || !hasMoreData.value) return

    loading.value = true

    try {
      let params = { _limit: 30, _page: page.value }

      if (albumIds.value.length > 0) {
        params.albumId = albumIds.value
      }

      if (sortField.value) {
        params._sort = sortField.value
        params._order = sortOrder.value
      }

      const response = await axios.get('https://jsonplaceholder.typicode.com/photos', { params })

      if (response.data.length === 0) {
        hasMoreData.value = false
        return
      }

      photos.value = [...photos.value, ...response.data]
      page.value += 1
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      loading.value = false
      showSkeletons.value = false
    }
  }

  // Функция для обработки клика по кнопке "Поиск"
  const onSearchClick = () => {
    photos.value = []
    page.value = 1
    hasMoreData.value = true
    showSkeletons.value = true

    localStorage.setItem('albumIds', searchQuery.value)
    loadPhotos()
  }

  // Функция для переключения сортировки
  const toggleSort = (field) => {
    photos.value = []
    page.value = 1
    hasMoreData.value = true
    showSkeletons.value = true

    if (sortField.value !== field) {
      sortField.value = field
      sortOrder.value = 'asc'
    } else {
      if (sortOrder.value === 'asc') {
        sortOrder.value = 'desc'
      } else {
        sortField.value = ''
        sortOrder.value = 'asc'
      }
    }

    loadPhotos()
  }

  const canLoadMore = () => {
    return hasMoreData.value && !loading.value
  }

  onMounted(() => {
    loadPhotos()
  })

  return {
    photos,
    page,
    loading,
    hasMoreData,
    searchQuery,
    showSkeletons,
    sortField,
    sortOrder,
    albumIds,
    loadPhotos,
    canLoadMore,
    onSearchClick,
    toggleSort
  }
})
