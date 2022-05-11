//dbPassword = 'mongodb+srv://JonathanPervaiz:DaudJony23@cluster0.1cg6u.mongodb.net/Cluster0?retryWrites=true&w=majority&ssl=true';
dbPassword = `mongodb://JonathanPervaiz:DaudJony23@cluster0-shard-00-00.1cg6u.mongodb.net:27017,cluster0-shard-00-01.1cg6u.mongodb.net:27017,cluster0-shard-00-02.1cg6u.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-w3i5k9-shard-0&authSource=admin&retryWrites=true&w=majority`
module.exports = {
    mongoURI: dbPassword
};
