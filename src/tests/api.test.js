const { decodeBase64 } = require('bcryptjs');
const request = require('supertest')
const app = require('../index')

let id = 0

describe('API test suite', () => {
  describe('Generic tests', () =>{
    it('tests GET / endpoint', async () => {
      const response = await request(app).get('/')
      expect(response.text).toEqual('Hello World !')
      expect(response.statusCode).toBe(200)
    })

    it('tests GET /unknown endpoint', async () => {
      const response = await request(app).get('/unknown')
      expect(response.body).toEqual({"msg":"Not found"})
      expect(response.statusCode).toBe(404)
    })
  })

  describe('User tests', () => {
    it('tests GET /users endpoint', async () => {
      const response = await request(app).get('/users')
      expect(response.body.length).toBe(3)
      expect(response.body).toEqual([{"id":1,"username":"toto"},{"id":2,"username":"tata"},{"id":3,"username":"titi"}])
      expect(response.statusCode).toBe(200)
    })

    it('tests GET /user/:id endpoint', async () => {
      const response = await request(app).get('/user/1')
      expect(response.body).toEqual({"id":1,"username":"toto"})
      expect(response.statusCode).toBe(200)
    })

    it('tests GET /user/:id/animals endpoint', async () => {
      const response = await request(app).get('/user/1/animals')
      expect(response.body).toEqual([{"id":1,"name":"a","owner_id":1,"type":1},{"id":2,"name":"b","owner_id":1,"type":1},{"id":3,"name":"c","owner_id":1,"type":2}])
      expect(response.statusCode).toBe(200)
    })

    it('test POST /user endpoint', async () => {
      const response = await request(app).post('/user').send({"username":"tutu"})
      //expect(response.body.username).toEqual('tutu')
      expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number), username: 'tutu' }))
      expect(response.statusCode).toBe(201)
      
      id = response.body.id

      const responseGet = await request(app).get(`/user/${id}`)
      expect(responseGet.body).toEqual({id, "username":"tutu"})
      expect(responseGet.statusCode).toBe(200)
    })

    it('test PUT /user/:id endpoint', async () => {
      const response = await request(app).put(`/user/${id}`).send({"username":"tyty"})
      expect(response.body).toEqual([1])
      expect(response.statusCode).toBe(200)

      const responseGet = await request(app).get(`/user/${id}`)
      expect(responseGet.body).toEqual({id, "username":"tyty"})
      expect(responseGet.statusCode).toBe(200)
    })

    it('test DELETE /user/:id endpoint', async () => {
      const response = await request(app).delete(`/user/${id}`)
      expect(response.statusCode).toBe(200)

      const responseGet = await request(app).get(`/user/${id}`)
      expect(responseGet.statusCode).toBe(204)
    })
  })

  describe('Animal tests', () => {
    it('tests GET /animals endpoint', async () => {
      const response = await request(app).get('/animals')
      expect(response.body.length).toBe(6)
      expect(response.body).toEqual([{"id":1,"name":"a","owner_id":1,"type":1},{"id":2,"name":"b","owner_id":1,"type":1},{"id":3,"name":"c","owner_id":1,"type":2},{"id":4,"name":"d","owner_id":2,"type":3},{"id":5,"name":"e","owner_id":2,"type":3},{"id":6,"name":"f","owner_id":3,"type":4}])
      expect(response.statusCode).toBe(200)
    })

    it('tests GET /animal/:id endpoint', async () => {
      const response = await request(app).get('/animal/1')
      expect(response.body).toEqual({"id":1,"name":"a","owner_id":1,"type":1})
      expect(response.statusCode).toBe(200)
    })

    it('tests GET /animal/types endpoint', async () => {
      const response = await request(app).get('/animal/types')
      expect(response.body).toEqual([{"id":1,"type":"dog"},{"id":2,"type":"cat"},{"id":3,"type":"hamster"},{"id":4,"type":"horse"}])
      expect(response.statusCode).toBe(200)
    })

    it('tests GET /animal/type/:id endpoint', async () => {
      const response = await request(app).get('/animal/type/1')
      expect(response.body).toEqual([{"id":1,"name":"a","owner_id":1,"type":1},{"id":2,"name":"b","owner_id":1,"type":1}])
      expect(response.statusCode).toBe(200)
    })

    it('test POST /animal endpoint', async () => {
      const response = await request(app).post('/animal').send({"name":"g","owner_id":1,"type":1})
      expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number), name: 'g', owner_id: 1, type: 1 }))
      expect(response.statusCode).toBe(201)
      
      id = response.body.id

      const responseGet = await request(app).get(`/animal/${id}`)
      expect(responseGet.body).toEqual({id, "name":"g","owner_id":1,"type":1})
      expect(responseGet.statusCode).toBe(200)
    })

    it('test PUT /animal/:id endpoint', async () => {
      const response = await request(app).put(`/animal/${id}`).send({"name":"h"})
      expect(response.body).toEqual([1])
      expect(response.statusCode).toBe(200)

      const responseGet = await request(app).get(`/animal/${id}`)
      expect(responseGet.body).toEqual({id, "name":"h","owner_id":1,"type":1})
      expect(responseGet.statusCode).toBe(200)
    })

    it('test DELETE /animal/:id endpoint', async () => {
      const response = await request(app).delete(`/animal/${id}`)
      expect(response.statusCode).toBe(200)

      const responseGet = await request(app).get(`/animal/${id}`)
      expect(responseGet.statusCode).toBe(204)
    })

    it('test POST /animal endpoint with wrong type', async () => {
      const response = await request(app).post('/animal').send({"name":"g","owner_id":1,"type":5})
      expect(response.body).toEqual({"error":"Type not found"})
      expect(response.statusCode).toBe(400)
    })

    it('test POST /animal endpoint with wrong owner', async () => {
      const response = await request(app).post('/animal').send({"name":"g","owner_id":5,"type":1})
      expect(response.body).toEqual({"error":"User not found"})
      expect(response.statusCode).toBe(400)
    })

    it('test PUT /animal endpoint with wrong type', async () => {
      const response = await request(app).put('/animal/1').send({"name":"g","owner_id":1,"type":5})
      expect(response.body).toEqual({"error":"Type not found"})
      expect(response.statusCode).toBe(400)
    })

    it('test PUT /animal endpoint with wrong owner', async () => {
      const response = await request(app).put('/animal/1').send({"name":"g","owner_id":5,"type":1})
      expect(response.body).toEqual({"error":"User not found"})
      expect(response.statusCode).toBe(400)
    })
  })
})
