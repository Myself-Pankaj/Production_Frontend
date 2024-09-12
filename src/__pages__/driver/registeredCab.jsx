/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useGetDriverCabQuery, useUpdateCabMutation } from '../../__redux__/api/cabApi'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import { toast } from 'react-toastify'
import Carousel from '../../__components__/carousel/Carousel'

const RegisteredCab = () => {
    const { data: driverCabData, isLoading: cabLoading, isError: cabError } = useGetDriverCabQuery()
    const [updateCab, { isLoading: isUpdating }] = useUpdateCabMutation()

    const cabData = driverCabData ? driverCabData[0] : null

    const [isEditing, setIsEditing] = useState(false)
    const [editedCab, setEditedCab] = useState({})
    const [frontImage, setFrontImage] = useState(null)
    const [additionalImages, setAdditionalImages] = useState([])
    const fileInputFrontRef = React.useRef(null)
    const fileInputAdditionalRef = React.useRef(null)

    useEffect(() => {
        if (cabData) {
            setEditedCab({
                modelName: cabData.modelName || '',
                cabNumber: cabData.cabNumber || '',
                capacity: cabData.capacity || '',
                feature: cabData.feature || ''
            })
        }
    }, [cabData])

    if (cabLoading)
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        )
    if (!cabData)
        return (
            <MessageDisplay
                message="Unbale to fetch cab details. kindly try after some time."
                type="error"
            />
        )
    if (cabError)
        return (
            <MessageDisplay
                message="Opps ! Something went wrong."
                type="error"
            />
        )

    const handleEdit = () => setIsEditing(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedCab((prev) => ({ ...prev, [name]: value }))
    }

    const handleFrontImageChange = (e) => {
        setFrontImage(e.target.files[0])
    }

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setAdditionalImages((prev) => [...prev, ...files])
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const isDataChanged =
            cabData.modelName !== editedCab.modelName ||
            cabData.cabNumber !== editedCab.cabNumber ||
            cabData.capacity !== editedCab.capacity ||
            cabData.feature !== editedCab.feature ||
            frontImage ||
            additionalImages.length > 0

        if (!isDataChanged) {
            toast.info('No changes found in cab details.')
            setIsEditing(false)
            return
        }

        try {
            const formData = new FormData()
            for (const key in editedCab) {
                formData.append(key, editedCab[key])
            }

            if (frontImage) {
                formData.append('photos', frontImage) // Add the front image first
            }

            additionalImages.forEach((photo) => formData.append('photos', photo)) // Add additional images

            const resultAction = await updateCab({ id: cabData._id, newData: formData })

            if (resultAction.data.success) {
                toast.success(resultAction.data.message)
                setIsEditing(false)
                setFrontImage(null)
                setAdditionalImages([])
            } else {
                toast.error('Failed to update cab.')
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="c_d_cab_container">
            <header className="c_d_cab_header">
                <h1>Cab Details</h1>
            </header>

            <main className="c_d_cab_content">
                <aside className="c_d_cab_sidebar">
                    {isEditing ? (
                        <>
                            <div>
                                <label>Front Image</label>
                                <input
                                    type="file"
                                    ref={fileInputFrontRef}
                                    onChange={handleFrontImageChange}
                                    accept="image/*"
                                />
                                {frontImage && (
                                    <img
                                        src={URL.createObjectURL(frontImage)}
                                        alt="Front Cab"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                )}
                            </div>
                            <div>
                                <label>Additional Images</label>
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputAdditionalRef}
                                    onChange={handleAdditionalImagesChange}
                                    accept="image/*"
                                />
                                {additionalImages.length > 0 &&
                                    additionalImages.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(photo)}
                                            alt={`Additional ${index + 1}`}
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    ))}
                            </div>
                        </>
                    ) : (
                        <Carousel images={cabData.photos} />
                    )}
                </aside>

                <section className="c_d_cab_info">
                    <h2>Cab Details</h2>
                    {!isUpdating ? (
                        <button
                            onClick={isEditing ? handleUpdate : handleEdit}
                            disabled={isUpdating}
                            className="c_d_cab_edit_btn">
                            {isEditing ? 'Save Changes' : 'Edit Cab'}
                        </button>
                    ) : (
                        <button className="c_d_cab_edit_btn">Processing...</button>
                    )}

                    <div className="c_d_cab_info_item">
                        <label>Model Name</label>
                        {isEditing ? (
                            <input
                                name="modelName"
                                value={editedCab.modelName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{cabData.modelName}</p>
                        )}
                    </div>

                    <div className="c_d_cab_info_item">
                        <label>Cab Number</label>
                        {isEditing ? (
                            <input
                                name="cabNumber"
                                value={editedCab.cabNumber}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{cabData.cabNumber}</p>
                        )}
                    </div>

                    <div className="c_d_cab_info_item">
                        <label>Capacity</label>
                        {isEditing ? (
                            <input
                                name="capacity"
                                value={editedCab.capacity}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{cabData.capacity}</p>
                        )}
                    </div>

                    <div className="c_d_cab_info_item">
                        <label>Features</label>
                        {isEditing ? (
                            <input
                                name="feature"
                                value={editedCab.feature}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{cabData.feature}</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default RegisteredCab
