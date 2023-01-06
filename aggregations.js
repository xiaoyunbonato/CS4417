// 3) [10pts] Produce a list of users, together with the total number of times they tweeted, sorted in decreasing order.

db.tweets.aggregate([{
    $group: {
        _id: "$user.screen_name",
        "total_tweets": {
            $sum: 1
        }
    }
},
{
    $sort: {
        "total_tweets": -1
    }
}
])

// 4) [10pts] Produce a list of place names, together with the total number of tweets from that place name, sorted in decreasing order.

db.tweets.aggregate([{
    $group: {
        _id: "$place.name",
        "tweet_count": {
            $sum: 1
        }
    }
},
{
    $sort: {
        "tweet_count": -1
    }
}
])

// 5) [15pts] Produce a list of users, together with the total number of replies to that user, sorted in decreasing order.

db.tweets.aggregate([{
    $group: {
        _id: "$in_reply_to_screen_name",
        "num_replies": {
            $sum: 1
        }
    }
},
{
    $sort: {
        "num_replies": -1
    }
}
])

// 6) [15pts] Produce a list of users, together with the total number of hashtags used by that user, sorted in decreasing order.

db.tweets.aggregate([{
    $unwind: "$entities.hashtags"
},
{
    $group: {
        _id: "$user.screen_name",
        "num_hashtags": {
            $sum: 1
        }
    }
},
{
    $sort: {
        "num_hashtags": -1
    }
}
])