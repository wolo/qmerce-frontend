"use strict";
const should = require('chai').should();
const rest = require('../frontend');
const frontend = rest("url", {user: "user", password: "pass"});

describe('frontend methods', function() {
  for(let method of 'createCart|validateCartAddress|getServiceStatus'.split('|')) {
    it(method + ' exists', function() {
      frontend.should.have.property(method);
    });
  }
});

describe('frontend objects', function() {
  for(let method of 'cart|customer|product|productAttribute'.split('|')) {
    let o = frontend[method]('dummyId');
    it(method + ' exists and has property "get"', function() {
      o.should.have.property('get');
    });
  }
});
