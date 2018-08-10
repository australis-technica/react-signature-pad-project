import { dataUrlToBuffer } from "../../img"
import { ImageDto } from "./types";
/** 
 * ImageDto with img: string to ImageDto with img as Buffer
 */
export function ensureBuffer(imageDto: ImageDto): ImageDto {
    const { img, ...dto } = imageDto;
    if (typeof img === "string") {
        return {
            ...dto,
            img: dataUrlToBuffer(img)
        }
    }
    return imageDto;
}