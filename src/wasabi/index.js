import RNFetchBlob from 'rn-fetch-blob';
import {generateRandomNumberString} from '../common/Common';
import {destinationBucketName, s3} from '../config/config';
import {decode} from 'base64-arraybuffer';

const generateFileType = fileType => {
  if (fileType === 'image/png') {
    return '.png';
  } else if (fileType === 'image/jpeg') {
    return '.jpeg';
  } else if (fileType === 'image/jpg') {
    return '.jpg';
  } else if (fileType === 'video/mp4') {
    return '.mp4';
  }
};

export const fileUpload = async selectedFile => {
  const fileUri = selectedFile.uri;
  const fileData = await RNFetchBlob.fs.readFile(fileUri, 'base64');
  const arrayBuffer = decode(fileData);

  const params = {
    Bucket:
      destinationBucketName +
      (selectedFile?.type === 'image/png' ||
      selectedFile?.type === 'image/jpeg' ||
      selectedFile?.type === 'image/jpg'
        ? '/test-img'
        : '/test-videos'),
    Key:
      new Date().getTime().toString() +
      generateRandomNumberString(5) +
      generateFileType(selectedFile?.type),
    Body: arrayBuffer,
    ContentType: selectedFile.type,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error('Error uploading to Wasabi:', error);
  }
};

export const fileDelete = async (link, type) => {
  var objectKey =
    type === 'image'
      ? link.split('/test-img/')[1]
      : link.split('/test-videos/')[1];

  const params = {
    Bucket:
      destinationBucketName + (type === 'image' ? '/test-img' : '/test-videos'),
    Key: objectKey,
  };

  try {
    await s3.deleteObject(params).promise();
    return `Image "${objectKey}" deleted successfully!`;
  } catch (error) {
    console.error(`Error deleting image "${objectKey}":`, error);
    throw error;
  }
};

export const fileUpdate = async (link, type, selectedFile) => {
  const fileUri = selectedFile.uri;
  const fileData = await RNFetchBlob.fs.readFile(fileUri, 'base64');
  const arrayBuffer = decode(fileData);

  let objectKey =
    type === 'image'
      ? link?.split('/test-img/')[1]
      : link?.split('/test-videos/')[1];

  const params = {
    Bucket:
      destinationBucketName + (type === 'image' ? '/test-img' : '/test-videos'),
    Key: objectKey,
    Body: arrayBuffer,
    ContentType: selectedFile.type,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error('Error uploading to Wasabi:', error);
  }
};
