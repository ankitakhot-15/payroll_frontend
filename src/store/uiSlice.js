import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'ui', initialState: { dark: false, sidebarOpen: true },
  reducers: {
    toggleTheme: state => { state.dark = !state.dark },
    toggleSidebar: state => { state.sidebarOpen = !state.sidebarOpen }
  }
})
export const { toggleTheme, toggleSidebar } = slice.actions
export default slice.reducer
