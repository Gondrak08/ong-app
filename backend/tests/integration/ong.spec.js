const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach( async ()=>{
       await connection.migrate.rollback();
       await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
    })

    it('shoude be able to create a new ONG', async ()=>{
        const response =  await request(app).post('/ongs').send({
            name: "CHAPADA",
            email: "contato@contato.com.br",
            whatsapp: "55000000000",
            city: "Salvador",
            uf: "BA"
        });
            console.log(response.body);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});