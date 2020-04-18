import React, { useState } from "react"
import SkeletonLoader from "tiny-skeleton-loader-react"
import {
  ImageUploadContainer,
  ImageUploadProcess,
  UploadedImage,
  StyledForm
} from "./../components/styles/StyledImageUploader"
import { useSpring, config } from "react-spring"

import Layout from "../components/layout"

const IndexPage = () => {
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [publicId, setPublicId] = useState("")
  const [version, setVersion] = useState("")
  const [transformation, setTransformation] = useState("thc_bl_watermark.thc_center_watermark")

  const uploadImage = async e => {
    const files = e.target.files
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "watermarkImages")
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

  const handleTransformationChange = (changeEvent) => {
    setTransformation(changeEvent.target.value)
  }

  return (
    <Layout>
      <ImageUploadProcess>
        <li>Choose which division you want to watermark your image with (you can change them once the image is uploaded too).</li>
        <li>Upload the image you want to watermark.</li>
        <li>Click on watermarked image to download!</li>
      </ImageUploadProcess>
      <StyledForm>
        <div>
          <label>
            <input type="radio" value="thc_bl_watermark.thc_center_watermark" checked={transformation === "thc_bl_watermark.thc_center_watermark"} onChange={handleTransformationChange} />
            THC Solutions Watermark
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="tidt_bl_watermark.tidt_center_watermark" checked={transformation === "tidt_bl_watermark.tidt_center_watermark"} onChange={handleTransformationChange} />
            Thermal ID Tech Watermark
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="oss_bl_watermark.oss_center_watermark" checked={transformation === "oss_bl_watermark.oss_center_watermark"} onChange={handleTransformationChange} />
            Oil Shop Supply Watermark
          </label>
        </div>
      </StyledForm>
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
              src={`https://res.cloudinary.com/crjars/image/upload/t_${transformation}/v1586456218/10040300_EmployeesMustWashHandsB4ReturningNotice_Vinyl_3.5x5-01.jpg`}
            />
          </>
        ) : loading ? (
          <SkeletonLoader style={imgFade} width="300px" height="300px" />
        ) : (
          <a
            href={`https://res.cloudinary.com/crjars/image/upload/c_scale,fl_attachment,t_${transformation},w_800/v${version}/${publicId}.jpg`}
          >
            <UploadedImage
              style={imgFade}
              src={`https://res.cloudinary.com/crjars/image/upload/c_scale,t_${transformation},w_800/v${version}/${publicId}.jpg`}
            />
          </a>
        )}
        {error !== "" && <pre style={{ overflowX: "scroll" }}>{error}</pre>}
      </ImageUploadContainer>
    </Layout>
  )
}

export default IndexPage
