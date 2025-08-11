import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import MySwiperImg from './components/SwiperImg/Swiper'
import {
  AddData,
  AddDataImg,
  completedUser,
  DeleteData,
  EditUser,
  GetData,
} from './reducers/TodoSlice'
import type { AppDispatch, RootState } from './store/store'

interface Todo {
  id: string
  name: string
  description: string
  isCompleted: boolean
  images: { imageName: string }[]
}

interface EditData extends Partial<Todo> {
  image?: File
}

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.todos.data)

  const [editData, setEditData] = useState<EditData | null>(null)
  const [editModal, setEditModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [addModalImg, setAddModalImg] = useState(false)
  const [addImg, setAddImg] = useState<{ id?: string; image?: File }>({})
  const [openUser, setOpenUser] = useState(false)
  const [userById, setUserById] = useState<Todo | null>(null)

  useEffect(() => {
    dispatch(GetData())
  }, [dispatch])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setter: Function) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setter((prev: any) => ({ ...prev, image: file }))
    }
  }

  const renderUserModal = () =>
    openUser && userById && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white p-4 rounded shadow w-full h-full'>
          <ul className='bg-gray-100'>
            <li
              className='p-2 hover:bg-gray-200 cursor-pointer w-[200px] text-center font-bold text-[30px]'
              onClick={() => setOpenUser(false)}
            >
              HOME PAGE
            </li>
          </ul>
          <div className='w-[80%] mx-auto flex flex-col items-center'>
            {userById.images?.[0] && (
              <img
                className='w-[80%] h-[300px] object-cover'
                src={`http://37.27.29.18:8001/images/${userById.images[0].imageName}`}
                alt=''
              />
            )}
            <h1 className='text-center font-bold text-[50px]'>{userById.name}</h1>
            <h1 className='text-center font-bold text-[40px]'>{userById.description}</h1>
          </div>
        </div>
      </div>
    )

  const renderAddImageModal = () =>
    addModalImg && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white p-4 rounded shadow'>
          <h2 className='text-xl font-bold'>Add Image</h2>
          <input type='file' onChange={e => handleFileChange(e, setAddImg)} />
          <div className='mt-4 flex gap-2'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => {
                dispatch(AddDataImg(addImg as any))
                setAddModalImg(false)
              }}
            >
              Save
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded'
              onClick={() => setAddModalImg(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )

  const renderEditModal = () =>
    editModal && editData && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white p-4 rounded shadow'>
          <h2 className='text-xl font-bold'>Edit TODO</h2>
          <input
            type='text'
            placeholder='Name'
            value={editData.name || ''}
            onChange={e => setEditData({ ...editData, name: e.target.value })}
            className='border p-2 rounded w-full'
          />
          <textarea
            placeholder='Description'
            value={editData.description || ''}
            onChange={e => setEditData({ ...editData, description: e.target.value })}
            className='border p-2 rounded w-full'
          />
          <div className='mt-4 flex gap-2'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => {
                dispatch(EditUser(editData))
                setEditModal(false)
              }}
            >
              Save
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded'
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )

  const renderAddModal = () =>
    addModal && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white p-4 rounded shadow'>
          <h2 className='text-xl font-bold'>Add TODO</h2>
          <input type='file' onChange={e => handleFileChange(e, setEditData)} />
          <input
            type='text'
            placeholder='Title'
            value={editData?.name || ''}
            onChange={e => setEditData({ ...editData, name: e.target.value })}
            className='border p-2 rounded w-full'
          />
          <textarea
            placeholder='Description'
            value={editData?.description || ''}
            onChange={e => setEditData({ ...editData, description: e.target.value })}
            className='border p-2 rounded w-full'
          />
          <div className='mt-4 flex gap-2'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => {
                if (editData) {
                  dispatch(AddData(editData))
                  setAddModal(false)
                }
              }}
            >
              Save
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded'
              onClick={() => setAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )

  return (
    <div className='w-[90%] mx-auto'>
      {renderUserModal()}
      {renderAddImageModal()}
      {renderEditModal()}
      {renderAddModal()}

      <h1 className='text-center font-bold text-[50px]'>TODO</h1>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded mb-[50px]'
        onClick={() => {
          setEditData({})
          setAddModal(true)
        }}
      >
        ADD
      </button>

      <div className='flex space-y-4 flex-wrap gap-4'>
        {data.map((item: any) => (
          <div
            key={item.id}
            className='border p-4 rounded shadow-xl hover:shadow-2xl transition w-[450px] h-[600px] flex flex-col justify-between bg-white'
          >
            <MySwiperImg user={item} idUser={item.id} />
            <h2
              onClick={() => {
                setUserById(item)
                setOpenUser(true)
              }}
              className='text-2xl font-bold text-black cursor-pointer'
            >
              NAME: {item.name}
            </h2>
            <p className='text-gray-600'>DESCRIPTION: {item.description}</p>
            <p
              className={`${
                item.isCompleted ? 'bg-green-500' : 'bg-red-500'
              } text-white p-2 rounded`}
            >
              {item.isCompleted ? 'Completed' : 'Not Completed'}
            </p>

            <div className='flex flex-col gap-2'>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded'
                onClick={() => dispatch(DeleteData(item.id))}
              >
                DELETE
              </button>
              <button
                className='bg-yellow-500 text-white px-4 py-2 rounded'
                onClick={() => {
                  setEditData(item)
                  setEditModal(true)
                }}
              >
                EDIT
              </button>
              <button
                onClick={() => {
                  setAddModalImg(true)
                  setAddImg({ id: item.id })
                }}
                className='bg-green-500 text-white px-4 py-2 rounded'
              >
                ADD IMG
              </button>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  onChange={() => dispatch(completedUser(item.id))}
                  checked={item.isCompleted}
                />
                Mark Completed
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
