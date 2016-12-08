exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('puppies').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('puppies').insert({
                    id: 1,
                    name: 'Maggie',
                    age_in_months: 24,
                    breed: 'mut',
                    image_url: 'https://scontent.xx.fbcdn.net/t31.0-8/15196099_10154759405293288_705300365996575061_o.jpg'
                }),
                knex('puppies').insert({
                    id: 2,
                    name: 'Desi',
                    age_in_months: 108,
                    breed: 'Golden Doodle',
                    image_url: 'https://scontent.xx.fbcdn.net/v/t1.0-9/12472469_10154051988023288_1555468931939698917_n.jpg?oh=459a129beca4bdbe1b5af08e1a9c17c1&oe=58C4BAB3'
                })
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('puppies_id_seq', (SELECT MAX(id) FROM puppies));")
        });
};
