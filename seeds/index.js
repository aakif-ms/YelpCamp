const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch((err) => {
    console.log('Oh no ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp');
    console.log('connected to mongoose');
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '65a25a277a48c212dd325563',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quidem ratione, fugit quam corporis adipisci recusandae labore, consequuntur doloribus aliquam vel, cupiditate nobis minima in dignissimos cumque nemo iure voluptates!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/deabjebs5/image/upload/v1705924940/YelpCamp/zqtfwyapccqdioh9gcio.jpg',
                    filename: 'YelpCamp/zqtfwyapccqdioh9gcio',
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
