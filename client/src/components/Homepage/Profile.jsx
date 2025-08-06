import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { getUserPosts } from '../../store/post/post.thunk'
import { HiCamera, HiPlus } from 'react-icons/hi' 

const Profile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserPosts())
  }, [dispatch])

  const { userData } = useSelector(state => state.user)
  const { loginUserPosts } = useSelector(state => state.post)

  const name = userData?.username || "SagarSajwan"
  const bio = userData?.bio?.trim() ? userData.bio : 'Bio'
  const avatar = userData?.avatarUrl.trim() ?  userData?.avatarUrl : "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n"
  const postCount = userData?.posts?.length || 0
  const followers = userData?.followers?.length || 0
  const following = userData?.following?.length || 0
  const gallery = loginUserPosts || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-200 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl mb-8 p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar Section */}
        <div className="relative">
          <img
            src={avatar}
            
            className="h-32 w-32 object-cover rounded-full border-4 border-primary shadow-lg"
            draggable={false}
          />
          <Link 
            to="/edit-profile"
            aria-label="Edit Profile Picture"
            className="absolute bottom-0 right-0 bg-primary rounded-full p-2 shadow-lg hover:bg-primary-focus transition"
          >
            <HiCamera className="text-white w-6 h-6" />
          </Link>
        </div>

        {/* User Info */}
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

          <div className="flex gap-8 mt-2 justify-center md:justify-start">
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

      {/* Gallery Section */}
      <div className="w-full max-w-3xl p-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gallery.length > 0 ? (
            gallery.map(post => (
              <img
                key={post._id}
                src={post.imageUrl}
                alt="User post"
                className="rounded-lg shadow-lg object-cover h-36 w-full cursor-pointer hover:scale-105 transform transition-transform duration-300"
                draggable={false}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center space-y-4 py-10">
              <p className="text-center text-2xl font-bold text-gray-500">No Posts Yet</p>
              <Link
                to="/upload"
                className="btn btn-primary gap-2 flex items-center"
                aria-label="Create a new Post"
              >
                <HiPlus className="w-6 h-6" />
                Create a new Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
