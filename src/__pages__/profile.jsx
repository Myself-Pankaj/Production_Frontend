import React from 'react'
import { toast } from 'react-toastify'
import { Button } from '@chakra-ui/react'
import { FaCamera, FaPhone, FaUser } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../__redux__/thunks/authThunk'

const Profile = () => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.auth)
    const [isEditing, setIsEditing] = React.useState(false)
    const [editedProfile, setEditedProfile] = React.useState({})
    const [newAvatar, setNewAvatar] = React.useState(null)
    const fileInputRef = React.useRef(null)

    if (loading) return <div>Loading...</div>
    if (!user) return <div>User not found</div>

    const initialLetter = user?.username ? user?.username.charAt(0).toUpperCase() : '?'

    const handleEdit = () => {
        setIsEditing(true)
        setEditedProfile({
            name: user.username || '',
            phoneNo: user.phoneNumber || ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedProfile((prev) => ({ ...prev, [name]: value }))
    }

    const handleAvatarClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewAvatar(file)
            setEditedProfile((prev) => ({ ...prev, avatar: file }))
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        // Check if there are any changes to the profile data
        const isProfileChanged = user.username !== editedProfile.name || user.phoneNumber !== editedProfile.phoneNo || newAvatar

        if (!isProfileChanged) {
            toast.info('Profile Look good as new')
            setIsEditing(false)
            return
        }
        try {
            const formData = new FormData()
            for (const key in editedProfile) {
                formData.append(key, editedProfile[key])
            }

            const resultAction = await dispatch(update(formData))

            if (update.fulfilled.match(resultAction)) {
                toast.success(resultAction.payload.message)
                setIsEditing(false)
                setNewAvatar(null)
            } else {
                toast.error(resultAction.error.message || 'Failed to update profile')
            }
        } catch (error) {
            toast.error(`Failed to update profile: ${error.message}`)
        }
    }

    return (
        <div className="profile_container">
            <header className="profile_header">
                <h1>Hello {user?.username ? user.username.toUpperCase() : 'User'}</h1>
                <p>Welcome to your profile page. Here you can view and edit your information.</p>
            </header>

            <main className="profile_content">
                <aside className="profile_sidebar">
                    <div className="profile_avatar">
                        {isEditing ? (
                            <div onClick={handleAvatarClick}>
                                {newAvatar ? (
                                    <img
                                        src={URL.createObjectURL(newAvatar)}
                                        alt="New Avatar"
                                    />
                                ) : user?.avatar && user?.avatar?.url ? (
                                    <img
                                        src={user.avatar.url}
                                        alt="Avatar"
                                    />
                                ) : (
                                    <div className="initial">{initialLetter}</div>
                                )}
                                <div className="profile_avatar_overlay">
                                    <FaCamera />
                                </div>
                            </div>
                        ) : user?.avatar && user.avatar.url ? (
                            <img
                                src={user?.avatar?.url}
                                alt="Avatar"
                            />
                        ) : (
                            <div className="profile_initial">{initialLetter}</div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                    <div className="profile_actions">
                        <p className="profile_connect_btn">{user?.isVerified && <span className="profile_verified">Verified User</span>}</p>
                        <p className="profile_message_btn">{user?.role || 'User'}</p>
                    </div>
                </aside>
                <section className="profile_account_info">
                    <h2>My account</h2>
                    <Button
                        className="profile_settings_btn"
                        onClick={isEditing ? handleUpdate : handleEdit}>
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>

                    <div className="profile_user_info">
                        <div className="profile_info_item">
                            <label>
                                <FaUser /> Username
                            </label>
                            {isEditing ? (
                                <input
                                    name="name"
                                    value={editedProfile.name || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user?.username ? user?.username?.toUpperCase() : 'N/A'}</p>
                            )}
                        </div>
                        <div className="profile_info_item">
                            <label>
                                <AiOutlineMail />
                                Email address
                            </label>
                            <p>{user?.email || 'N/A'}</p>
                        </div>
                        <div className="profile_info_item">
                            <label>
                                <FaPhone /> Phone
                            </label>
                            {isEditing ? (
                                <input
                                    name="phoneNo"
                                    value={editedProfile?.phoneNo || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user?.phoneNumber || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Profile
