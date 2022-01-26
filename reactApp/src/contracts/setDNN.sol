//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Structs.sol";

library setDNN{
  
  function login(mapping(address => User) storage users, uint voteCount,mapping(uint => Vote) storage votes, string memory _name, string memory _email, string memory _about, string memory _profilePhotoUrl) public {
    
    require(msg.sender!=address(0), "address empty");
    require(bytes(_name).length>0, "name is Null");
    require(bytes(_email).length>0, "email is Null");

    users[msg.sender].userId=msg.sender;
    users[msg.sender].name = _name;
    users[msg.sender].email = _email;
    users[msg.sender].about = _about;
    users[msg.sender].profilePhotoUrl = _profilePhotoUrl;
    users[msg.sender].voteId = voteCount;
    votes[voteCount].ifUserPresent = msg.sender;

  }

  // 0 email 1 about 2 profile photo
  function changeAboutEmailPhoto(mapping(address => User) storage users, int8 _action, string memory _aboutEmailPhoto) public
  {
    require(msg.sender != address(0), "Address empty");
    require(users[msg.sender].userId != address(0), "User not registered");

    if(_action == 0)
    {
      users[msg.sender].email = _aboutEmailPhoto;
    }
    else if(_action == 1)
    {
      users[msg.sender].about = _aboutEmailPhoto;
    }
    else
    {
      users[msg.sender].profilePhotoUrl = _aboutEmailPhoto;

    }

  }

  function ownerUpgradePosition(address owner,mapping(address => User) storage users, int8 _position, address _candidate) public {
    require(owner == msg.sender,'Not the Owner');
    require(_candidate!=address(0));
    require(users[_candidate].userId!=address(0), 'User not registered');
    
    users[_candidate].privilege = _position;
  }

  //-
  function uploadArticle(mapping(uint => Vote) storage votes, mapping(address => User) storage users,mapping(uint => Article) storage articles, uint articleCount,uint voteCount, string memory _articleTopic, string memory _articleDescription) public
  {
    require(msg.sender != address(0), "Address empty");
    require(users[msg.sender].userId != address(0), "User not registered");
    require(users[msg.sender].privilege > 2, "Uploading unauthorised");
    require(bytes(_articleTopic).length > 0, "topic is null");
    require(bytes(_articleDescription).length > 0, "description is null");
    
    articles[articleCount].articleId = articleCount;
    articles[articleCount].articleTopic = _articleTopic;
    articles[articleCount].articleDescription = _articleDescription;
    articles[articleCount].uploadTime = block.timestamp;
    articles[articleCount].auther = msg.sender;
    articles[articleCount].voteId = voteCount;
    votes[voteCount].voteObject=1;
    votes[voteCount].id=articleCount;
    
    users[msg.sender].articleIds.push(articles[articleCount].articleId);
    
  }

  //-
  function createSummary(mapping(uint => Vote) storage votes, mapping(address => User) storage users,mapping(uint => Article) storage articles , uint summaryCount,mapping(uint => Summary) storage summaries, uint voteCount, string memory _description, uint _articleId, uint _motion) public
  {
    require(msg.sender != address(0), "User not registered");
    require(articles[_articleId].auther != msg.sender);
    require(bytes(_description).length > 0, "description is null");
    require(users[msg.sender].privilege > 1, "Summarising unauthorised");

    summaries[summaryCount].summaryId = summaryCount;
    summaries[summaryCount].articleId = _articleId;
    summaries[summaryCount].description = _description;
    summaries[summaryCount].auther = msg.sender;
    summaries[summaryCount].voteId = voteCount;
    votes[voteCount].voteObject = 2;
    votes[voteCount].id=summaryCount;
    summaries[summaryCount].uploadTime = block.timestamp;
    summaries[summaryCount].motion = _motion;

    articles[_articleId].summaryIds.push(summaryCount);
    users[msg.sender].summaryIds.push(summaryCount);

  }

  function uploadMedia(mapping(address => User) storage users,mapping(uint => Article) storage articles,mapping(uint => Summary) storage summaries,int8 _action, uint _Id, string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public
  {
    require(users[msg.sender].privilege > 2, "Uploading unauthorised");
    require(msg.sender == articles[_Id].auther, "User is not auther of the article");
    require(bytes(_fileHash).length > 0, "File hash is empty");
    require(bytes(_fileType).length > 0, "File type is empty");
    require(bytes(_fileName).length > 0, "File name is empty");
    require(bytes(_fileDescription).length > 0, "file description is empty");
    require(_fileSize > 0, "file size is zero");
    
    if(_action == 0)
      articles[_Id].files.push(File( _Id, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp, msg.sender));
    else
      summaries[_Id].files.push(File( _Id, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp, msg.sender));
  }

  //0 article 1 summary
  function commentArticle(mapping(address => User) storage users,mapping(uint => Article) storage articles, uint articleCount,mapping(uint => Comment) storage comments, uint commentCount, uint summaryCount, uint voteCount,mapping(uint => Summary) storage summaries, int8 _action, uint _Id, string memory _message ) public 
  {
    require(bytes(_message).length > 0, "message is empty");
    require(users[msg.sender].userId != address(0), "User not registered");
    
    if(_action == 0)
    {
      require(_Id<articleCount);
      articles[_Id].commentIds.push(commentCount);
    }
    else{
      require(_Id<summaryCount);
      summaries[_Id].commentIds.push(commentCount);
    }

    users[msg.sender].commentIds.push(commentCount);
    comments[commentCount].commentId = commentCount;
    comments[commentCount].articleId = _Id;
    comments[commentCount].message = _message;
    comments[commentCount].auther = msg.sender;
    comments[commentCount].voteId = voteCount;
    
  }
  
  function insertSet(uint[] storage array, uint element) internal
  {
    uint flag;
    for (uint index = 0; index < array.length; index++) {
      if(array[index] == element)
      {
        flag = 1;
        break;
      }
    }
    if(flag == 0)
    {
      array.push(element);
    }
  }

  function removeSet(uint[] storage array, uint element) internal
  {
    for (uint index = 0; index < array.length; index++) {
      if(array[index] == element)
      {
        array[index] = array[array.length-1];
        array.pop();
        break;
      }
    }
  }

  // update the privilege of the user when there is any vote increase
  function internalPrivilegeUpdate(mapping(address => User) storage users, mapping(uint => Vote) storage votes, uint _voteId) internal
  {
    int voteCount = votes[_voteId].voteCount + int(users[votes[_voteId].ifUserPresent].trueArticleIds.length) - int(users[votes[_voteId].ifUserPresent].fakeArticleIds.length);
    
    if(voteCount >= 20) //5000
      users[votes[_voteId].ifUserPresent].privilege = 3;
    else if(voteCount >= 10) //1000
      users[votes[_voteId].ifUserPresent].privilege = 2;
    else if(voteCount >= 2) //200
      users[votes[_voteId].ifUserPresent].privilege = 1;
    else
      users[votes[_voteId].ifUserPresent].privilege = 0;
  }

  function articleUserUpvote(mapping(address => User) storage users, mapping(uint => Vote) storage votes, mapping(uint => Article) storage articles ,uint _voteId,int increment) internal {
    //1 user = 4  article vote
      users[articles[votes[_voteId].id].auther].articleVote+increment;
      if(users[ articles[votes[_voteId].id].auther].articleVote == 4)
      {
        users[articles[votes[_voteId].id].auther].articleVote = 0;
        votes[users[ articles[votes[_voteId].id].auther].voteId].voteCount++;
      }
      else if(users[ articles[votes[_voteId].id].auther].articleVote<0)
      {
        users[ articles[votes[_voteId].id].auther].articleVote += 4;
        votes[users[ articles[votes[_voteId].id].auther].voteId].voteCount--;
      }
  }


  function summaryUserUpvote(mapping(address => User) storage users, mapping(uint => Vote) storage votes, Summary memory summary ,int increment) internal {
      //1 user = 8 summary vote
      users[summary.auther].summaryVote+increment;
      if(users[summary.auther].summaryVote == 8)
      {
        users[summary.auther].summaryVote = 0;
        votes[users[summary.auther].voteId].voteCount++;
      }
      else if(users[summary.auther].summaryVote<0)
      {
        users[summary.auther].summaryVote += 8;
        votes[users[summary.auther].voteId].voteCount--;
      }
  }

  function commentUserUpvote(mapping(address => User) storage users, mapping(uint => Vote) storage votes,mapping(uint => Comment) storage comments ,uint _voteId ,int increment) internal {
    //1 user = 16 comment vote
      users[comments[votes[_voteId].id].auther].commentVote+increment;
      if(users[comments[votes[_voteId].id].auther].commentVote == 16)
      {
        users[comments[votes[_voteId].id].auther].commentVote = 0;
        votes[users[comments[votes[_voteId].id].auther].voteId].voteCount++;
      }
      else if(users[comments[votes[_voteId].id].auther].commentVote<0)
      {
        users[comments[votes[_voteId].id].auther].commentVote += 16;
        votes[users[comments[votes[_voteId].id].auther].voteId].voteCount--;
      }
  }

  // utility function to perform updation of privilege and true and fake article id of the user using above functions
  function updatePrivilegeOrPosNegVotes(mapping(uint => Comment) storage comments, mapping(address => User) storage users, mapping(uint => Vote) storage votes,mapping(uint => Summary) storage summaries, mapping(uint => Article) storage articles, uint _voteId,int8 voteState, int increment) internal
  {
    votes[_voteId].votes[msg.sender] = voteState;
    votes[_voteId].voteCount = votes[_voteId].voteCount + increment;
    
    // if the upvoted object is user
    if(votes[_voteId].ifUserPresent != address(0))
    {
      internalPrivilegeUpdate(users, votes, _voteId);
    } 
    // if the upvoted object is article
    else if(votes[_voteId].voteObject == 1)
    { 
      articleUserUpvote(users, votes, articles, _voteId, increment);
    }
    // if the upvoted object is summary
    else if(votes[_voteId].voteObject == 2)
    { 
      Summary memory summary = summaries[votes[_voteId].id];
      
      summaryUserUpvote(users, votes, summary, increment);

      //then calculate the votes;
      if(summary.motion == 2)
        articles[summary.articleId].noOfPositiveSummariesVotes = articles[summary.articleId].noOfPositiveSummariesVotes + increment;
      else if(summary.motion == 0)
        articles[summary.articleId].noOfNegativeSummariesVotes = articles[summary.articleId].noOfNegativeSummariesVotes + increment;
      
      int posVote = articles[summary.articleId].noOfPositiveSummariesVotes;
      int negVote = articles[summary.articleId].noOfNegativeSummariesVotes;
      User storage user = users[articles[summary.articleId].auther];
      
      // update the true and fake article ids of user
      if(posVote - negVote >= 0)
      {
        insertSet(user.trueArticleIds, summary.articleId);
        removeSet(user.fakeArticleIds, summary.articleId);
        internalPrivilegeUpdate(users, votes, user.voteId);
      }
      else
      {
        insertSet(user.fakeArticleIds, summary.articleId);
        removeSet(user.trueArticleIds, summary.articleId);
        internalPrivilegeUpdate(users, votes, user.voteId);
      }
    }
    //if the upvoted object is comment
    else if(votes[_voteId].voteObject == 1)
    { 
      commentUserUpvote(users, votes, comments, _voteId, increment);
      
    }
  }

  //-
  function upvote(mapping(uint => Comment) storage comments, mapping(address => User) storage users, mapping(uint => Vote) storage votes,mapping(uint => Summary) storage summaries, mapping(uint => Article) storage articles, uint _voteId, bool _vote) public
  {
    require(_voteId >= 0);
    require(users[msg.sender].userId != address(0), "User not registered");
    require(users[msg.sender].privilege > 0, "User not Authorised to vote");

    if(votes[_voteId].votes[msg.sender] == 0 && _vote == true)
    {
      updatePrivilegeOrPosNegVotes(comments, users, votes, summaries, articles, _voteId, 1, 1);
      users[msg.sender].voteIds.push(_voteId);
    }
    else if(votes[_voteId].votes[msg.sender] == 0 && _vote == false)
    {
      updatePrivilegeOrPosNegVotes(comments, users, votes, summaries, articles, _voteId,-1, -1);
      users[msg.sender].voteIds.push(_voteId);
    }
    else if(votes[_voteId].votes[msg.sender] == -1 && _vote == true)
    {
      updatePrivilegeOrPosNegVotes(comments, users, votes, summaries, articles, _voteId,0, 1);
      removeSet(users[msg.sender].voteIds, _voteId);
    }
    else if(votes[_voteId].votes[msg.sender] == 1 && _vote == false)
    {
      updatePrivilegeOrPosNegVotes(comments, users, votes, summaries, articles, _voteId,0, -1);
      removeSet(users[msg.sender].voteIds, _voteId);
    }

  }
}