// store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { TodoSlice } from '../reducers/TodoSlice'

export const store = configureStore({
  reducer: {
    todos: TodoSlice.reducer,
  },
})

// типизация стора
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
