process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app')
const knex = require('../knex')

var allPuppies = null;

beforeEach((done) => {
    knex.migrate.latest()
        .then(() => {
            knex.seed.run()
                .then(() => {
                    knex('puppies')
                        .then((puppies) => {
                            allPuppies = puppies;
                            done();
                        });
                });
        });
});

afterEach((done) => {
    knex.migrate.rollback()
        .then(() => {
            done();
        })
})

describe('GET /puppies', () => {
    it('gets all puppies', done => {
        request(app)
            .get('/puppies')
            .expect('Content-type', /json/)
            .end((err, res) => {
                expect(res.body.length).to.equal(allPuppies.length)
                done();
            })
    });
});

describe('GET /puppies/:id', () => {
    it('gets a single puppy', done => {
        request(app)
            .get('/puppies/1')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.id).to.equal(1)
                expect(res.body.name).to.equal('Maggie')
                expect(res.body.ageInMonths).to.equal(24)
                done();
            })
    });
});

describe('POST /puppies', () => {

    const newPuppy = {
        id: 4,
        name: 'Olive',
        age_in_months: 13,
        breed: 'Great Perinese',
        img_url: 'https://google.com'
    }

    const puppyIncorrectTypes = {
        id: 6,
        name: 4,
        age_in_months: 'nine',
        breed: 0,
        img_url: {}
    }

    it('inserts a new puppy', done => {
        request(app)
            .post('/puppies')
            .send(newPuppy)
            .end((err, res) => {
                knex('puppies').then(puppies => {
                    console.log(puppies);
                    expect(puppies).to.have.lengthOf(allPuppies.length + 1);
                    expect(puppies).to.deep.include(newPuppy)
                    done()
                });
            })
    })
    xit('returns 400 error if the data types are incorrect', done => {
        request(app)
            .put('/puppies/3')
            .type('form')
            .send(puppyIncorrectTypes)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                done();
            })
    })
});
