import toBlob from "./data-url-to-blob";
import stringToBytes from "./string-to-bytes";

function tryToBlob(imageSrc: string) {
    try {   
        return toBlob(imageSrc);
    } catch {
        return {
            size: 0
        };
    }
}

export default function dataUrlSize(imageSrc: string) {
    const bytes = stringToBytes(imageSrc);
    const file = tryToBlob(imageSrc);
    var sizeKB = file.size / 1000;
    var sizeMB = file.size / 1000000;
    return {
        bytesLength: bytes.length,
        fileSize: file.size,
        sizeKB,
        sizeMB
    }
}