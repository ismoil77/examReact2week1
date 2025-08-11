import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
let Api = 'http://37.27.29.18:8001/api/to-dos'
export const GetData = createAsyncThunk('todos/getData', async () => {
  const {data} = await axios.get(Api)
  try {
    console.log(data.data);
    
	return data.data
  } catch (error) {
	console.error(error);
		
  }
})

export const DeleteData = createAsyncThunk('todos/deleteData', async (id: string,{ dispatch, rejectWithValue }) => {
  await axios.delete(`${Api}?id=${id}`)
dispatch(GetData())
  return id
})

export const AddData = createAsyncThunk('todos/addData', async (data: any,{dispatch}) => {
  let formData = new FormData()
  formData.append('Name', data.name)
  formData.append('Description', data.description)
  if (data.image) {
    formData.append('Images', data.image)
  }
  const response = await axios.post(Api, formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  dispatch(GetData())
  return response.data
})

export const EditUser = createAsyncThunk('todos/editData', async (data: any,{dispatch}) => {
  console.log(data);

  const response = await axios.put(`${Api}`, data)
  
  dispatch(GetData())
  return response.data
})


export const AddDataImg = createAsyncThunk('todos/addDataImg', async (data: any,{dispatch}) => {
    let formData = new FormData()
    formData.append('Images', data.image)
    const response = await axios.post(`http://37.27.29.18:8001/api/to-dos/${data.id}/images`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    dispatch(GetData())
    return response.data
})

export const completedUser = createAsyncThunk('todos/completedUser', async (id: any,{dispatch}) => {
  const response = await axios.put(`http://37.27.29.18:8001/completed?id=${id}`)
  dispatch(GetData())
  return response.data
})
export const TodoSlice = createSlice({
  name: 'todos',
  initialState: {
	data: [],
	loading: false
  },
  reducers: {
   
  },
  extraReducers:(builder)=>{
	builder
		.addCase(GetData.pending, (state) => {
			state.loading = true
		})
		.addCase(GetData.fulfilled, (state, action) => {
			state.loading = false
			state.data = action.payload
		})
		.addCase(GetData.rejected, (state) => {
			state.loading = false
		})
  }
})


export default TodoSlice.reducer
