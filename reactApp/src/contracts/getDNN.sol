//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Structs.sol";

library getDNN {
  function getUserArticles(mapping(uint => Article) storage articles, mapping(address => User) storage users, address _userId) public view returns ( Article[] memory )
  {
    Article[] memory list = new Article[](users[_userId].articleIds.length);
    for(uint i = 0;i<users[_userId].articleIds.length;i++)
    {
      list[i] = articles[users[_userId].articleIds[i]];
    }
    return list;
  }
  
  //-
  function getSummaries(mapping(uint => Summary) storage summaries, mapping(address => User) storage users,address _userId) public view returns (Summary[] memory)
  {
    // return users[_userId].summaryIds;
    Summary[] memory list = new Summary[](users[_userId].summaryIds.length);
    for(uint i = 0;i<users[_userId].summaryIds.length;i++)
    {
      list[i] = summaries[users[_userId].summaryIds[i]];
    }
    return list;
  }

  function getSummariesA(mapping(uint => Article) storage articles, mapping(uint => Summary) storage summaries ,uint _articleId) public view returns (Summary[] memory)
  {
    Summary[] memory list = new Summary[](articles[_articleId].summaryIds.length);
    for(uint i = 0;i<articles[_articleId].summaryIds.length;i++)
    {
      list[i] = summaries[articles[_articleId].summaryIds[i]];
    }
    return list;
  }

  function getFiles(mapping(uint => Article) storage articles, mapping(uint => Summary) storage summaries ,int8 _action, uint _Id) public view returns (File[] memory)
  {
    if(_action == 0)
      return articles[_Id].files;
    else
      return summaries[_Id].files;
  }

  //-
  function getComments(mapping(uint => Comment) storage comments ,mapping(address => User) storage users,address _userId) public view returns (Comment[] memory)
  {
    // return users[_userId].commentIds;
    Comment[] memory list = new Comment[](users[_userId].commentIds.length);
    for(uint i = 0;i<users[_userId].commentIds.length;i++)
    {
       list[i] = comments[users[_userId].commentIds[i]];
    }
    return list;
  }

//-
 function getComments(mapping(uint => Article) storage articles, mapping(uint => Summary) storage summaries,mapping(uint => Comment) storage comments ,int8 _action, uint _Id) public view returns (Comment[] memory)
  {

    uint[] memory commentIds;
    if(_action == 0)
      commentIds = articles[_Id].commentIds;
    else
      commentIds = summaries[_Id].commentIds;

    Comment[] memory list = new Comment[](commentIds.length);
    for(uint i = 0;i<commentIds.length;i++)
    {
      list[i] = comments[commentIds[i]];
    }
    
    return list;
  }

//-
 function getUserVotes(mapping(address => User) storage users,mapping(uint => Vote) storage votes, address _userId) public view returns(VoteReturn[] memory)
  {
    VoteReturn[] memory list = new VoteReturn[](users[_userId].voteIds.length);
    
    for (uint i = 0; i < users[_userId].voteIds.length; i++) {
      list[i].voteObject = votes[users[_userId].voteIds[i]].voteObject;
      list[i].voteState = votes[users[_userId].voteIds[i]].votes[msg.sender];
      
      if(votes[users[_userId].voteIds[i]].voteObject == 0)
      {
        list[i].id = abi.encodePacked(votes[users[_userId].voteIds[i]].ifUserPresent);
      }
      else
      {
        list[i].id = abi.encodePacked(votes[users[_userId].voteIds[i]].id);
      }
    }
    return list;
  }

  function getUserStat(mapping(address => User) storage users, address _userId) public view returns(uint ,uint, uint ,uint){
    User memory user = users[_userId];
    uint articleCount = user.articleIds.length;
    uint summaryCount = user.summaryIds.length;
    uint trueArticleCount = user.trueArticleIds.length;
    uint fakeArticleCount = user.fakeArticleIds.length;
    return (articleCount, summaryCount, trueArticleCount,fakeArticleCount);
  }

}