package com.iuh.nhom6.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;


/**
 * AWSCloudUtil
 */
public class AWSCloudUtil {

    private AWSCredentials awsCredentials(String accessKey, String secretKey) {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        return awsCredentials;
    }

    private AmazonS3 awsS3ClientBuilder(String accessKey, String secretKey) {
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials(accessKey, secretKey)))
                .withRegion(Regions.AP_SOUTHEAST_1)
                .build();
        return s3Client;
    }

    public void uploadFileToS3(String fileName, byte[] fileBytes, String accessKey, String secretKey, String bucket) {
        AmazonS3 s3Client = awsS3ClientBuilder(accessKey, secretKey);
        try {
            InputStream inputStream = new ByteArrayInputStream(fileBytes);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(fileBytes.length);
        s3Client.putObject(bucket, fileName, inputStream, metadata);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public S3ObjectInputStream downloadFileFromS3(String fileName, String accessKey, String secretKey, String bucket) {
        AmazonS3 s3Client = awsS3ClientBuilder(accessKey, secretKey);
        S3Object s3Object = s3Client.getObject(bucket, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        return inputStream;
    }
}