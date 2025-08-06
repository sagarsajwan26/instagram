import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addPost } from '../../store/post/post.thunk'
const UploadReel = () => {
  const [caption, setCaption] = useState('')
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [play, setPlay] = useState({})
  const [loading, setLoading] = useState(false)
  const videoRef = useRef({})

const dispatch= useDispatch()
const navigate= useNavigate()

  useEffect(()=>{
    return ()=>images.forEach(i=> URL.revokeObjectURL(i.URL))
  },[images])

  const handleImages = (e) => {
    const file = e.target.files
    setFiles(file)
    const fileArray = Array.from(file)
    const imagesUrls = fileArray.map((item, idx) => ({
      type: item.type.split('/')[0],
      url: URL.createObjectURL(item),
      id: `${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
    }))
    setImages(imagesUrls)
  }


  const togglePlay = (id) => {
    const video = videoRef.current[id]
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
    setPlay((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let form = new FormData()
    form.append('caption', caption)
    const fileData = Array.from(files)

    fileData.forEach((i) => form.append('posts', i))

    try {
      await dispatch(addPost(form)).unwrap().then((res)=>{
        console.log(res);
        
      })
      navigate('/')
    } catch (error) {
      console.error('Failed to add post: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 via-pink-500 via-purple-600 to-blue-600 p-6">
      <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-8 drop-shadow-2xl rounded-lg" />
      <h1 className="text-white text-3xl font-extrabold mb-6 text-center drop-shadow-md">
        Share moments with others
      </h1>

      <blockquote className="text-center italic text-white bg-white/20 rounded-2xl px-8 py-4 shadow-lg mb-8 max-w-xl select-none">
        “Every picture tells a story. Upload yours and inspire!”
      </blockquote>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-base-100/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          id="caption"
          placeholder="Write your caption..."
          className="input input-bordered resize-none h-28 rounded-2xl p-5 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-600 transition-shadow duration-300 shadow-inner"
        />

        <label
          htmlFor="images"
          className="btn btn-primary flex items-center gap-3 cursor-pointer w-max mx-auto md:mx-0"
        >
          <span className="text-2xl">➕</span>
          <span>Add Images & Videos</span>
        </label>
        <input onChange={handleImages} hidden multiple type="file" id="images" accept="image/*,video/*" />

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-5">
            {images.map(({ url, type, id }) =>
              type === 'image' ? (
                <img
                  key={id}
                  src={url}
                  alt={type ==='image'? "preview" :"uploaded media"}
                  loading='lazy'
                  className="rounded-2xl shadow-lg object-cover h-36 w-full cursor-pointer hover:scale-105 transform transition-transform duration-300"
                  draggable={false}
                />
              ) : (
                <video
                  key={id}
                  src={url}
                  ref={(el) => (videoRef.current[id] = el)}
                  muted
                  loop
                  className="rounded-2xl shadow-lg object-cover h-36 w-full cursor-pointer hover:brightness-110 transition duration-300"
                  onClick={() => togglePlay(id)}
                  playsInline
                />
              )
            )}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary self-end mt-6 px-10 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default UploadReel
