//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

struct Vote {
    mapping(address => int8) votes;
    int voteCount;
    address ifUserPresent;
    uint voteObject; //- 0 user 1 article 2 summary 3 comment
    uint id; //- corresponding object id
}

struct User {
    address userId;
    string name;
    string email;
    string about; //-
    string profilePhotoUrl; //-
    int8 privilege;
    uint voteId;
    uint[] trueArticleIds; //-
    uint[] fakeArticleIds; //-
    int articleVote;
    int summaryVote;
    int commentVote;
    //of user
    uint[] articleIds;
    uint[] voteIds; //-
    uint[] commentIds;
    uint[] summaryIds;
}

struct File {
    uint articleId;
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
    address uploader;
}

struct Comment {
    uint commentId;
    uint articleId;
    address auther;
    string message;
    uint voteId;
}

struct Summary {
    uint summaryId;
    uint articleId;
    string description;
    uint voteId;
    address auther;
    uint uploadTime;
    uint motion; // 0 against 1 neutral 2 support
    File[] files;
    uint[] commentIds;
}

struct Article {
    uint articleId;
    string articleTopic;
    string articleDescription;
    string additionalNewInfo; //-
    int noOfPositiveSummariesVotes; //-
    int noOfNegativeSummariesVotes; //-
    uint voteId;
    uint uploadTime;
    address auther;
    uint[] summaryIds;
    File[] files;
    uint[] commentIds;
}

 struct VoteReturn{
    uint voteObject;
    int8 voteState;
    bytes id;
  }