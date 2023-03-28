const { default: mongoose } = require('mongoose')
const mongooose = require('mongoose')
const mongoUrI = 'mongodb://localhost:27017/iNotebok'


const connectTOMongo = () => {
    mongoose.connect(mongoUrI, () => console.log('connected to mongoose to successfully'))
}

module.exports = connectTOMongo;


