//dbPassword = 'mongodb+srv://zain57ul:Zainul10@cluster0.46kp4.mongodb.net/mylab?retryWrites=true&w=majority';
//dbPassword = `mongodb://JonathanPervaiz:DaudJony23@cluster0-shard-00-00.1cg6u.mongodb.net:27017,cluster0-shard-00-01.1cg6u.mongodb.net:27017,cluster0-shard-00-02.1cg6u.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-w3i5k9-shard-0&authSource=admin&retryWrites=true&w=majority`
dbPassword = `mongodb://admin:admin123@cluster0-shard-00-00.rkros.mongodb.net:27017,cluster0-shard-00-01.rkros.mongodb.net:27017,cluster0-shard-00-02.rkros.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-jhpdq4-shard-0&authSource=admin&retryWrites=true&w=majority`

module.exports = {
    mongoURI: dbPassword
};