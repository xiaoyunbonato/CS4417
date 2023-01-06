function myMapper() {

    //The mapper function is called with each document, which has the special name 'this'
    //Emit a key-value pair 

    for (hashtag of this.entities.hashtags) {

        //Hashtags are contained in the "text" field of the hashtags object
        
        emit(hashtag.text, 1);
    }
}

function myReducer(key, values) {

    //The reducer is called once for each key, and is passed an array
    //containing all values corresponding to that key.
    // Function sums the 1 associated with each key to count num of occurrences

    //Produce the desired result

    return Array.sum(values);
}

db.tweets.mapReduce(myMapper, myReducer, {
    query: {},
    out: "mroutput"
})
db.mroutput.aggregate({
    $sort: {
        value: -1
    }
})