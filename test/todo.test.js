const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

let mongoose = require("mongoose");
let Todo = require("../model/Todo");

//styling method
chai.should();

//middleware
chai.use(chaiHttp);

describe("Todo APIs", () => {
  describe("Test Get route", () => {
    it("Should return all todos", (done) => {
      chai
        .request(server)
        .get("/todo")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.not.be.eql(0);
          done();
        });
    });
  });

  describe("Test Get/:id route", () => {
    it("Should return a todo by id", (done) => {
      const todoId = "60868cbc402b560908914f44";
      chai
        .request(server)
        .get(`/todo/${todoId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("todo");
          res.body.should.have.property("todo").property("text");
          res.body.should.have.property("todo").property("completed");
          res.body.should.have.property("todo").property("_id");
          done();
        });
    });
  });

  describe("Test Post route", () => {
    it("Should post a todo", (done) => {
      let todo = {
        text: "todo 2",
        completed: "false",
      };
      chai
        .request(server)
        .post("/todo")
        .send(todo)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("todo");
          res.body.should.have.property("todo").property("text");
          res.body.should.have.property("todo").property("completed");
          res.body.should.have.property("todo").property("_id");
          done();
        });
    });
  });
  describe("Test Patch route", () => {
    it("Should update a todo", (done) => {
      let todo = {
        text: "todo 1",
        completed: "false",
      };
      const todoId = "60868cbc402b560908914f44";
      chai
        .request(server)
        .patch(`/todo/${todoId}`)
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("todo");
          res.body.should.have.property("todo").property("text");
          res.body.should.have.property("todo").property("completed");
          res.body.should.have.property("todo").property("_id");
          done();
        });
    });
  });
});
