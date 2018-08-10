export default function dataUrlToBuffer(dataUrl: string) {
    // data:"image/png;base64,""image/?;base64,"
    return new Buffer(dataUrl.split(",")[1], "base64");
}