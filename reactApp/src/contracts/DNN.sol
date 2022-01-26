//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Structs.sol";
import "./setDNN.sol";
import "./getDNN.sol";

contract DNN {

    //////////////////////////EVENTS///////////////////////////////
    event UserCreated(address userId, string name, string email);

    event FileUploaded(
        uint256 articleId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        address uploader
    );

    event CommentCreated(
        uint256 commentId,
        uint256 articleId,
        address auther,
        string message,
        uint256 voteId
    );

    event SummaryCreated(
        uint articleId,
        uint256 summaryId,
        string description,
        address auther,
        uint256 uploadTime,
        uint voteId
    );

    event ArticleUploaded(
        uint256 articleId,
        string articleTopic,
        string articleDescription,
        uint256 uploadTime,
        address auther,
        uint voteId
    );

    event Upvoted(int256 voteCount);
    //////////////////////////EVENTS ENDS///////////////////////////////

    //////////////////////////STATES///////////////////////////////

    address public owner;
    uint256 public articleCount;
    uint256 public commentCount;
    uint256 public summaryCount;
    uint256 public voteCount;

    mapping(uint256 => Article) public articles;
    mapping(uint256 => Comment) public comments;
    mapping(uint256 => Summary) public summaries;
    mapping(address => User) public users;
    mapping(uint256 => Vote) public votes;

    constructor() {
        owner = msg.sender;
    }

    //////////////////////////STATES ENDS///////////////////////////////


    //////////////////////////METHODS///////////////////////////////

    function login(
        string memory _name,
        string memory _email,
        string memory _about,
        string memory _profilePhotoUrl
    ) public {
        setDNN.login(
            users,
            voteCount,
            votes,
            _name,
            _email,
            _about,
            _profilePhotoUrl
        );
        voteCount++;
        emit UserCreated(msg.sender, _name, _email);
    }

    //- 0 email 1 about 2 profile photo
    function changeAboutEmailPhoto(int8 _action, string memory _aboutEmailPhoto)
        public
    {
        setDNN.changeAboutEmailPhoto(users, _action, _aboutEmailPhoto);
    }

    function ownerUpgradePosition(int8 _position, address _candidate) public {
        return setDNN.ownerUpgradePosition(owner, users, _position, _candidate);
    }

    //-
    function uploadArticle(
        string memory _articleTopic,
        string memory _articleDescription
    ) public {
        setDNN.uploadArticle(
            votes,
            users,
            articles,
            articleCount,
            voteCount,
            _articleTopic,
            _articleDescription
        );
        voteCount++;
        articleCount++;
        emit ArticleUploaded(
            articleCount - 1,
            _articleTopic,
            _articleDescription,
            block.timestamp,
            msg.sender,
            voteCount-1
        );
    }

    //-
    function additionalNewInfo(string memory _newInfo, uint256 _articleId)
        public
    {
        articles[_articleId].additionalNewInfo = _newInfo;
    }

    //-
    function createSummary(
        string memory _description,
        uint256 _articleId,
        uint256 _motion
    ) public {
        setDNN.createSummary(
            votes,
            users,
            articles,
            summaryCount,
            summaries,
            voteCount,
            _description,
            _articleId,
            _motion
        );
        voteCount++;
        summaryCount++;
        emit SummaryCreated(
            _articleId,
            summaryCount - 1,
            _description,
            msg.sender,
            block.timestamp,
            voteCount-1
        );
    }

    function uploadMedia(
        int8 _action,
        uint256 _Id,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription
    ) public {
        return
            setDNN.uploadMedia(
                users,
                articles,
                summaries,
                _action,
                _Id,
                _fileHash,
                _fileSize,
                _fileType,
                _fileName,
                _fileDescription
            );
    }

    //0 article 1 summary
    function commentArticle(
        int8 _action,
        uint256 _Id,
        string memory _message
    ) public {
        setDNN.commentArticle(
            users,
            articles,
            articleCount,
            comments,
            commentCount,
            summaryCount,
            voteCount,
            summaries,
            _action,
            _Id,
            _message
        );
        votes[voteCount].voteObject = 3;
        votes[voteCount].id = commentCount;
        voteCount++;
        commentCount++;
        emit CommentCreated(
            commentCount - 1,
            _Id,
            msg.sender,
            _message,
            voteCount - 1
        );
    }

    //- 4 actions
    function upvote(uint256 _voteId, bool _vote) public {
        setDNN.upvote(
            comments,
            users,
            votes,
            summaries,
            articles,
            _voteId,
            _vote
        );
        emit Upvoted(votes[_voteId].voteCount);
    }

    function whetherVoted(uint256 _voteId) public view returns (int8) {
        return votes[_voteId].votes[msg.sender];
    }

    function getUserArticles(address _userId)
        public
        view
        returns (Article[] memory)
    {
        return getDNN.getUserArticles(articles, users, _userId);
    }

    function getSummaries(address _userId)
        public
        view
        returns (Summary[] memory)
    {
        return getDNN.getSummaries(summaries, users, _userId);
    }

    function getSummariesA(uint256 _articleId)
        public
        view
        returns (Summary[] memory)
    {
        return getDNN.getSummariesA(articles, summaries, _articleId);
    }

    function getFiles(int8 _action, uint256 _Id)
        public
        view
        returns (File[] memory)
    {
        return getDNN.getFiles(articles, summaries, _action, _Id);
    }

    //- return change
    function getComments(address _userId)
        public
        view
        returns (Comment[] memory)
    {
        return getDNN.getComments(comments, users, _userId);
    }

    //- return change
    function getComments(int8 _action, uint256 _Id)
        public
        view
        returns (Comment[] memory)
    {
        return getDNN.getComments(articles, summaries, comments, _action, _Id);
    }

    //-
    function getUserVotes(address _userId)
        public
        view
        returns (VoteReturn[] memory)
    {
        return getDNN.getUserVotes(users, votes, _userId);
    }

    function getUserStat(address _userId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return getDNN.getUserStat(users, _userId);
    }

    //////////////////////////METHODS ENDS///////////////////////////////
}
