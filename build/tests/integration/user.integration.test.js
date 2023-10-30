import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import supertest from "supertest";
import { App } from "../../app.js";
import { UserStore } from "../../controllers/users/handlers/user.store.js";
import { StatusCode } from "@panenco/papi";
describe("Integration tests", ()=>{
    describe("User Tests", ()=>{
        let request;
        beforeEach(()=>{
            UserStore.users = [];
            const app = new App();
            request = supertest(app.host);
        });
        it("should CRUD users", async ()=>{
            // Unauthorized without "api-key"
            await request.get(`/api/users`).expect(StatusCode.unauthorized);
            const creds = {
                email: "test-user+1@panenco.com",
                password: "real secret stuff"
            };
            // Successfully create new user
            const { body: createResponse } = await request.post(`/api/users`).send({
                name: "test",
                ...creds
            }).expect(StatusCode.created);
            expect(UserStore.users.some((x)=>x.email === createResponse.email)).true;
            // Get the token
            const { body: loginResponse } = await request.post(`/api/auth/tokens`).send(creds).expect(StatusCode.ok);
            const token = loginResponse.token;
            // Get the newly created user
            const { body: getResponse } = await request.get(`/api/users/${createResponse.id}`).set('x-auth', token).expect(StatusCode.ok);
            expect(getResponse.name).equal("test");
            // Successfully update user
            const { body: updateResponse } = await request.patch(`/api/users/${createResponse.id}`).set('x-auth', token).send({
                email: "test-user+updated@panenco.com"
            }).expect(StatusCode.ok);
            expect(updateResponse.name).equal("test");
            expect(updateResponse.email).equal("test-user+updated@panenco.com");
            expect(updateResponse.password).undefined; // middleware transformed the object to not include the password
            // Get all users
            const { body: getListRes } = await request.get(`/api/users`).set('x-auth', token).expect(StatusCode.ok);
            const { items, count } = getListRes;
            expect(items.length).equal(1);
            expect(count).equal(1);
            // Delete the newly created user
            await request.delete(`/api/users/${createResponse.id}`).set('x-auth', token).expect(204);
            // Get all users again after deleted the only user
            const { body: getNoneResponse } = await request.get(`/api/users`).set('x-auth', token).expect(StatusCode.ok);
            expect(getNoneResponse.items.length).equal(0);
            expect(getNoneResponse.count).equal(0);
        });
    });
});

//# sourceMappingURL=user.integration.test.js.map