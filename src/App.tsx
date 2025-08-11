import { useEffect, useState } from 'react'
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
import type { AppDispatch } from './store' // <-- import your AppDispatch type
function App() {
	const dispatch = useDispatch<AppDispatch>() // <-- type your dispatch
	const data = useSelector((state: any) => state.todos.data)

	const [editData, setEditData] = useState<{
		id: string
		title: string
		description: string
	} | null>(null)
	const [editModal, setEditModal] = useState(false)
	const [addModal, setAddModal] = useState(false)
	const [addModalImg, setAddModalImg] = useState(false)
	const [addImg, setAddImg] = useState(false)
	const [openUser, setOpenUser] = useState(false)
	const [userById, setUserById] = useState<any>({})
	useEffect(() => {
		dispatch(GetData())
	}, [dispatch])

	return (
		<>
			<div className='w-[90%] mx-auto '>
				{openUser && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 '>
						<div className='bg-white p-4 rounded shadow w-[100%] h-[100%]'>
							<ul className='w-[100%] bg-gray-100'>
								<li
									className='p-2 hover:bg-gray-200 cursor-pointer w-[200px] text-center font-bold text-[30px]'
									onClick={() => setOpenUser(false)}
								>
									HOME PAGE
								</li>
							</ul>
							<div className='w-[80%] mx-auto flex flex-col justify-center items-center'>
								<img
									className='w-[80%] h-[300px] object-cover'
									src={`http://37.27.29.18:8001/images/${userById?.images[0].imageName}`}
									alt=''
								/>

								<h1 className='text-center font-bold text-[50px]'>
									{userById?.name}
								</h1>
								<h1 className='text-center font-bold text-[40px]'>
									{userById?.description}
								</h1>
							</div>
						</div>
					</div>
				)}
				{addModalImg && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
						<div className='bg-white p-4 rounded shadow'>
							<h2 className='text-xl font-bold'>Add Image</h2>
							<input
								type='file'
								onChange={e => {
									if (e.target.files) {
										const file = e.target.files[0]
										setAddImg({ ...addImg, image: file })
									}
								}}
							/>
							<button
								className='bg-blue-500 text-white px-4 py-2 rounded'
								onClick={() => {
									dispatch(AddDataImg(addImg))
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
				)}

				{editModal && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
						<div className='bg-white p-4 rounded shadow'>
							<h2 className='text-xl font-bold'>Edit TODO</h2>
							<input
								type='text'
								placeholder='name'
								value={editData?.name}
								onChange={e =>
									setEditData({ ...editData, name: e.target.value })
								}
								className='border p-2 rounded w-full'
							/>
							<textarea
								placeholder='Description'
								value={editData?.description}
								onChange={e =>
									setEditData({ ...editData, description: e.target.value })
								}
								className='border p-2 rounded w-full'
							/>
							<button
								className='bg-blue-500 text-white px-4 py-2 rounded'
								onClick={() => {
									if (editData) {
										dispatch(EditUser(editData))
										setEditModal(false)
									}
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
				)}
				{addModal && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
						<div className='bg-white p-4 rounded shadow'>
							<h2 className='text-xl font-bold'>Add TODO</h2>
							<input
								type='file'
								onChange={e => {
									if (e.target.files) {
										const file = e.target.files[0]
										setEditData({ ...editData, image: file })
									}
								}}
							/>
							<input
								type='text'
								placeholder='Title'
								value={editData?.name}
								onChange={e =>
									setEditData({ ...editData, name: e.target.value })
								}
								className='border p-2 rounded w-full'
							/>
							<textarea
								placeholder='Description'
								value={editData?.description}
								onChange={e =>
									setEditData({ ...editData, description: e.target.value })
								}
								className='border p-2 rounded w-full'
							/>
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
				)}
				<h1 className=' text-center font-bold text-[50px]'>TODO</h1>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded mb-[50px]'
					onClick={() => setAddModal(true)}
				>
					ADD
				</button>
				<div className='flex space-y-4 flex-wrap'>
					{data.map((item: any) => (
						<div className='border p-4 rounded shadow-xl hover:shadow-2xl transition hover:-translate-2 w-[450px] h-[600px] flex flex-col justify-between bg-white'>
							<div className=''>
								<MySwiperImg user={item} idUser={item.id} />
							</div>
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
								className={`bg-${
									item.isCompleted ? 'green' : 'red'
								}-500 text-white p-2 rounded`}
							>
								{item.isCompleted ? 'Completed' : 'Not Completed'}
							</p>

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
							<input
								type='checkbox'
								onChange={() => dispatch(completedUser(item.id))}
								checked={item.isCompleted}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default App
