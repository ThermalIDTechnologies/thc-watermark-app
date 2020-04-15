import React, { useState } from "react"
import SkeletonLoader from "tiny-skeleton-loader-react"
import {
  ImageUploadContainer,
  ImageUploadProcess,
  UploadedImage,
} from "./../components/styles/StyledImageUploader"
import { useSpring, config } from "react-spring"

import Layout from "../components/layout"

const IndexPage = () => {
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [publicId, setPublicId] = useState("")
  const [version, setVersion] = useState("")

  const uploadImage = async e => {
    const files = e.target.files
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "stickers")
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/crjars/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
      const file = await res.json()
      console.log("TCL: SecondPage -> file", file)
      file.error ? setError(file.error.message) : setImage(file.secure_url)

      error === "" && setPublicId(file.public_id)
      error === "" && setVersion(file.version)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const imgFade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.gentle,
  })

  return (
    <Layout>
      <ImageUploadProcess>
        <li>Upload the image you want to watermark.</li>
        <li>Click on watermarked image to download!</li>
      </ImageUploadProcess>
      <ImageUploadContainer>
        <input
          type="file"
          name="file"
          placeholder="Upload your image"
          onChange={uploadImage}
          style={{ zIndex: `10` }}
        />
        {image === "" && loading === false ? (
          <>
            <UploadedImage
              style={imgFade}
              src="https://res.cloudinary.com/crjars/image/upload/t_thc_bl_watermark.thc_center_watermark/v1586456218/10040300_EmployeesMustWashHandsB4ReturningNotice_Vinyl_3.5x5-01.jpg"
            />
          </>
        ) : loading ? (
          <SkeletonLoader style={imgFade} width="300px" height="300px" />
        ) : (
          <a
            href={`https://res.cloudinary.com/crjars/image/upload/c_scale,fl_attachment,t_thc_bl_watermark.thc_center_watermark,w_800/v${version}/${publicId}.jpg`}
          >
            <UploadedImage
              style={imgFade}
              src={`https://res.cloudinary.com/crjars/image/upload/c_scale,t_thc_bl_watermark.thc_center_watermark,w_800/v${version}/${publicId}.jpg`}
            />
          </a>
        )}
        {error !== "" && <pre style={{ overflowX: "scroll" }}>{error}</pre>}
      </ImageUploadContainer>
    </Layout>
  )
}

export default IndexPage
