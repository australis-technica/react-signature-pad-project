import dataUrlToBuffer from "@australis/data-url-to-buffer";
import { ImageDto } from "./types";
/** */
export function ensureBuffer(imageDto: ImageDto) {
    const { img, ...dto } = imageDto;
    if (typeof img === "string") {
        return {
            ...dto,
            img: dataUrlToBuffer(img)
        }
    }
    return imageDto;
}