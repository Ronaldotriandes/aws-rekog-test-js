const Aws = require('aws-sdk')

Aws.config.update({
    accessKeyId: 'AKIAQQTOVZE5HZPTVJ3Q',
    secretAccessKey: '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',
    region:'ap-southeast-1'
})

const params = {
    Image :{
        S3Object :{
            Bucket : 'dev-fortius',
            Name: 'file-recognition/6452af8e156e56.jpg'
        }
    },
    MaxLabels: 5,
    MinConfidence: 80
};

const recog = new Aws.Rekognition();


recog.detectLabels(params, function (err, data) {
    if(err) console.log(err, err.stack)
    else console.log(data)
})