import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { getUserProfile } from '../../store/user/user.thunk'

const Profile = () => {
 const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(getUserProfile())
    
  })
  const { userData } = useSelector(state => state.user)
  const name = userData?.username || "SagarSajwan"
  const bio = userData?.bio || "Mastering the art of 3D modeling❤️\nfrom concept to render."
  const avatar = userData?.avatarUrl || "https://imgs.search.brave.com/V0e-l8IvvALnL7MXu6eEC3DJuV1qMmrOR-U37V9FtFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvODQ3Lzg0Nzk2/OS5wbmc"
  const postCount = userData?.posts?.length || 1
  const followers = userData?.followers?.length || 1
  const following = userData?.following?.length || 1
  const gallery = userData?.gallery || Array(8).fill("https://imgs.search.brave.com/K-3FwjZuS31UnN_6qT_DBIJmt6KwX2n9db7jMSPFMLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/bmF0dXJlLWxhbmRp/bmctcGFnZV8yMy0y/MTQ4MTY3MTg1Lmpw/Zz9zZW10PWFpc19o/eWJyaWQ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-200 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl mb-8 p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={avatar}
          alt="Profile"
          className="h-32 w-32 object-cover rounded-full border-4 border-primary shadow-lg"
        />
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">{name}</h2>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Link
                to="/edit-profile"
                className="btn btn-outline btn-primary px-4 py-1 rounded-md font-semibold"
              >
                Edit Profile
              </Link>
              <button className="btn btn-outline btn-error px-4 py-1 rounded-md font-semibold">
                Logout
              </button>
            </div>
          </div>
          <div className="flex gap-8 mt-2">
            <div className="text-center">
              <span className="font-bold text-lg text-primary">{postCount}</span>
              <div className="text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <span className="font-bold text-lg text-primary">{followers}</span>
              <div className="text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <span className="font-bold text-lg text-primary">{following}</span>
              <div className="text-gray-500">Following</div>
            </div>
          </div>
          <p className="whitespace-pre-line text-gray-600 text-base mt-2 font-medium border-l-4 border-primary pl-3">
            {bio}
          </p>
        </div>
      </div>
      {/* Gallery grid */}
      <div className="w-full max-w-3xl p-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`gallery-${i}`}
              className="rounded-xl object-cover h-40 w-full shadow-md transform hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
