const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6295b8b84f34f1e3308032c6',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dfbjc632v/image/upload/v1654113118/YelpCamp/bawculfchwod4bkpln1y.jpg',
          filename: 'YelpCamp/bawculfchwod4bkpln1y',
        },
        {
          url: 'https://res.cloudinary.com/dfbjc632v/image/upload/v1654113120/YelpCamp/d77rrctcpiz3kvcric0r.jpg',
          filename: 'YelpCamp/d77rrctcpiz3kvcric0r',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum a asperiores rerum iusto dolor ipsam iure totam laboriosam reiciendis impedit voluptatibus molestiae, nisi obcaecati officiis molestias, unde in, dolorem tempora?',
      price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
