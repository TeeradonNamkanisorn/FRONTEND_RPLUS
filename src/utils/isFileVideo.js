export function isFileVideo(file) {
    return file && file['type'].split('/')[0] === 'video';
}