import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import * as fs from 'fs'

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }

    public async uploadImage (filePath: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(filePath, { folder: 'avatars' }, (err, result) => {
                fs.unlinkSync(filePath)

                if(err) return reject(err)
                    resolve(result)
            })
        })
    }
}
