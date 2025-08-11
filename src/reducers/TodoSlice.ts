import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const Api = 'http://37.27.29.18:8001/api/to-dos'

interface Todo {
  id: string
  name: string
  description: string
  isCompleted: boolean
  images: { imageName: string }[]
}

interface ThunkApiConfig {
  rejectValue: string
}

export const GetData = createAsyncThunk<Todo[], void, ThunkApiConfig>(
  'todos/getData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(Api)
      return data.data
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to fetch todos')
    }
  }
)

export const DeleteData = createAsyncThunk<string, string, ThunkApiConfig>(
  'todos/deleteData',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${Api}?id=${id}`)
      dispatch(GetData())
      return id
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to delete todo')
    }
  }
)

export const AddData = createAsyncThunk<any, Partial<Todo> & { image?: File }, ThunkApiConfig>(
  'todos/addData',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('Name', data.name || '')
      formData.append('Description', data.description || '')
      if (data.image) {
        formData.append('Images', data.image)
      }

      const response = await axios.post(Api, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      dispatch(GetData())
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to add todo')
    }
  }
)

export const EditUser = createAsyncThunk<any, Partial<Todo>, ThunkApiConfig>(
  'todos/editData',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(Api, data)
      dispatch(GetData())
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to edit todo')
    }
  }
)

export const AddDataImg = createAsyncThunk<any, { id: string; image: File }, ThunkApiConfig>(
  'todos/addDataImg',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('Images', data.image)

      const response = await axios.post(`${Api}/${data.id}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      dispatch(GetData())
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to add image')
    }
  }
)

export const completedUser = createAsyncThunk<any, string, ThunkApiConfig>(
  'todos/completedUser',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`http://37.27.29.18:8001/completed?id=${id}`)
      dispatch(GetData())
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to toggle completed')
    }
  }
)

export const TodoSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [] as Todo[],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetData.pending, state => {
        state.loading = true
      })
      .addCase(GetData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(GetData.rejected, state => {
        state.loading = false
      })
  },
})

export default TodoSlice.reducer
