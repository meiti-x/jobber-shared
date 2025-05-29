import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"

export function upload(file: string, publicID?: string, isOverwrite?: boolean, invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, {
      public_id: publicID,
      overwrite: isOverwrite,
      invalidate,
      resource_type: 'auto' // zip and image
    },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error)
        resolve(result)
      })
  })

}


export function uploadVideo(file: string, publicID?: string, isOverwrite?: boolean, invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, {
      public_id: publicID,
      overwrite: isOverwrite,
      invalidate,
      chunk_size: 50000,
      resource_type: 'video' // zip and image
    },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error)
        resolve(result)
      })
  })

}