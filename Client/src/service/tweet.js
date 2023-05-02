export default class TweetService {
  constructor(http){
    this.http = http;
  }
   // 네트워크를 통해 데이터 가져오기

  async getTweets(username) {
    // fetch 를 통해 /tweets?username=:username
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET'
    })

  }

  async postTweet(text) {
    // fetch를 통해 /tweets post로 입력한 데이터를 전송
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({text, username: '김사과', name:'apple'})
    })
  }

  async deleteTweet(tweetId) {
    // this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE'
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({text})
    })
    // const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    // if (!tweet) {
    //   throw new Error('tweet not found!');
    // }
    // tweet.text = text;
    // return tweet;
  }
}
