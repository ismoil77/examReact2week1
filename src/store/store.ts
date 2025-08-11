import { configureStore } from '@reduxjs/toolkit'
import { TodoSlice } from '../reducers/TodoSlice'

export const store = configureStore({
  reducer: {
    todos: TodoSlice.reducer,
  },
})
