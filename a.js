//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

const { RekognitionClient, ListCollectionsCommand } = require("@aws-sdk/client-rekognition");
const {fromIni} = require('@aws-sdk/credential-providers')
// Set the AWS Region.
const REGION = "ap-southeast-1"; //e.g. "us-east-1"
// Set the profile name
const profileName = "default"
// Name the collection
const rekogClient = new RekognitionClient({region: REGION, 
  
});

const listCollection = async () => {
  var max_results = 10
  console.log("Displaying collections:")
  var response = await rekogClient.send(new ListCollectionsCommand({MaxResults: max_results}))
  var collection_count = 0
  var done = false
  while (done == false){
      var collections = response.CollectionIds
      collections.forEach(collection => {
          console.log(collection)
          collection_count += 1
      });
      return collection_count
  }
}

var collect_list =  listCollection()
console.log(collect_list)