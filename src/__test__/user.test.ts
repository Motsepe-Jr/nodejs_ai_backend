import supertest from "supertest"
import createServer from "../utils/server";
import { signJwt } from "../utils/jwt.utils";
import mongoose from "mongoose";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const userPayload = {
    _id: userId,
    email: "billy@gmail.com",
    name: "123456"
}

export const reportCrimeLoad = {
    crimeType:  "Robbery",
    notes: "It was bad",
    time: "Evening",
    date: "23 May",
    location: "Johannesburg street"
} 

describe('user', () => {

    describe('get user route', () => {
        describe('given the user does not exist', () => {
            it("should return a 403", async () => {
                await supertest(app).get("/api/me").expect(403)
            })

        })

        // describe('given the user does exist', () => {
        //     it("should return a 200", async () => {
        //         const jwt = signJwt(userPayload) 
        //         const {statusCode, body} = await supertest(app).get("/api/me").set('Authorization', `Bearer ${jwt}`)
        //         expect(statusCode).toBe(200)
        //     })

        // })
    })

    describe('create report crime', () => {

        describe('given the user is not logged in', () => {

            it("should return a 403", async () => {
                await supertest(app).post("/api/reportCrime").expect(403)
            })

        })
        // describe('given the user is logged in', () => {
        //     it("should return a 200", async () => {
        //         const jwt = signJwt(userPayload) 
        //         const {statusCode, body} = await supertest(app).post("/api/reportCrime").set('Authorization', `Bearer ${jwt}`)
        //         .send(reportCrimeLoad)
        //         expect(statusCode).toBe(200)
        //     })

        // })
    })
})