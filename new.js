// Import the necessary AWS SDK clients and commands
const { RekognitionClient, CreateCollectionCommand, ListCollectionsCommand, ListFacesCommand, IndexFacesCommand, DeleteFacesCommand, SearchFacesByImageCommand, } = require ("@aws-sdk/client-rekognition");
const fs = require('fs')
// Configure AWS SDK with your credentials and region
const client = new RekognitionClient({
    region: 'ap-southeast-1', // e.g., 'us-east-1'
    credentials: {
        accessKeyId: 'AKIAQQTOVZE5HZPTVJ3Q',
        secretAccessKey: '7zcmxhfbhOkd7giWs4iOXdRzECscxDvaKk7yzUEs',
    },
});

const store = async () => {
    const img = fs.readFileSync('./wis.jpeg');

    try {
        const input = { // IndexFacesRequest
            CollectionId: "face-rekog-apps", // required
            Image: { // Image
              Bytes: img, // e.g. Buffer.from("") or new TextEncoder().encode("")
            },
            ExternalImageId: "iniwisnu.jpg",
          };
        const com = new IndexFacesCommand(input)
        const response = await client.send(com);
        console.log('Collection created successfully:', response);
    } catch (error) {
        console.log(error, 'errorrr')
    }
}
// Function to create a collection
const getFace = async (collectionId) => {
    try {
        const command = new ListFacesCommand({
            CollectionId:collectionId,
            MaxResults: 4096, // Adjust MaxResults as needed
        });        
        const response = await client.send(command);
        console.log('Collection created successfully:', response);
    } catch (error) {
        console.error('Error creating collection:', error);
    }
};

const createCollection = async (collectionId) => {
    try {
        const command = new CreateCollectionCommand({
            CollectionId: collectionId,
        });        
        const response = await client.send(command);
        console.log('Collection created successfully:', response);
    } catch (error) {
        console.error('Error creating collection:', error);
    }
};

const deleteFace = async (collectionId) => {
    try {
        const command = new DeleteFacesCommand({
            CollectionId:collectionId,
            FaceIds : ['83760340-ab53-4fb7-8d48-e556a5bc92cc']
        });        
        const response = await client.send(command);
        console.log('Collection created successfully:', response);
    } catch (error) {
        console.error('Error creating collection:', error);
    }
};
const getColl = async (collectionId) => {
  try {
      const command = new ListCollectionsCommand({
      });        
      const response = await client.send(command);
      console.log('Collection created successfully:', response);
  } catch (error) {
      console.error('Error creating collection:', error);
  }
};


const findImg = async (collectionId) => {
    try {
        const img = fs.readFileSync('./wis.jpeg');
        console.log(img)
        const command = new SearchFacesByImageCommand({
            CollectionId: collectionId,
            Image: {
                Bytes: img,
              },
        });        
        const response = await client.send(command);
        console.log('Collection created successfully:', response?.FaceMatches);
        const employeeFaceIds = new Set(['8f6f6670-75bf-4a0d-83df-2e24533c178b']);
        console.log(JSON.stringify(response.FaceMatches))
        const sim = 80
        const matchingFace = response.FaceMatches.filter(item =>
         item.Similarity >= sim && employeeFaceIds.has(item.Face.FaceId),
        ).reduce(
          (max, item) =>
            item.Similarity > (max?.Similarity || 0) ? item : max,
          null,
        );
        console.log(matchingFace)
    } catch (error) {
        console.error('Error creating collection:', error);
    }
  };
// Replace 'your-collection-id' with a unique collection ID
findImg('9d15cdc7-0d6f-46f2-ad44-d2bdef5e7916');
// ind()

/** 
* Paste one or more documents here
*/