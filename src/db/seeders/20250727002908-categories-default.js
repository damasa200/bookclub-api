'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [

      {
      name: "Negócios",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: "Marketing",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    { 
      name: "Culinária",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {  
      name:"Comunicação",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    { 
      name: "Autodesenvolvimento",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    { 
      name: "Finanças",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    { 
      name: "Pisicologia",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    { 
      name: "Saúde",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    { 
      name: "Romance",
      highlighted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },   
  ]);   
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Categories', null,{});
  }
};
