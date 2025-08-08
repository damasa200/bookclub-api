'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Authors', [
      {
      id: 1,
      name: "Greg Mckeown",
      avatar_url: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/8740670f-be9d-42d7-b033-fd9a044b06ec.__CR0,0,300,300_PT0_SX300_V1___.png",
      bio: "GREG MCKEOWN dá palestras no mundo todo sobre a importância de viver e de liderar como um essencialista. É autor do best-seller Essencialismo e apresentador do podcast What’s Essential.",  
      createdAt: new Date(),
      updatedAt: new Date(),   
    }, 
    {
      id: 2,
      name: "Seth Godin",
      avatar_url: "https://m.media-amazon.com/images/S/aplus-media/vc/c2708183-0e54-4c81-943f-0adcb4e11e1d.__CR0,0,300,300_PT0_SX300_V1___.jpg",
      bio: "Seth Godin (10 de julho de 1960) é autor de livros sobre negócios e orador desde os fins da década de 1990. Seth Godin fundou e foi CEO de uma das primeiras companhias de marketing online, a Yoyodyne, que mais tarde vendeu ao Yahoo!.",  
      createdAt: new Date(),
      updatedAt: new Date(),   
    }, 
    {
      id: 3,
      name: "Brené Brown",
      avatar_url: "https://m.media-amazon.com/images/S/aplus-media/vc/a3248041-056c-4267-8981-412308c367a4.__CR0,0,1080,1080_PT0_SX300_V1___.png",
      bio: "A Dra. Brené Brown, professora e pesquisadora na Universidade de Houston, há 16 anos estuda a coragem, a vulnerabilidade, a vergonha e a empatia.",  
      createdAt: new Date(),
      updatedAt: new Date(),   
    }, 
    {
      id: 4,
      name: "Morgan Housel",
      avatar_url: "https://m.media-amazon.com/images/S/amzn-author-media-prod/rtoaal9u1721n93pmiqkl7s1u1._SY600_.jpg",
      bio: "Morgan Housel é sócio do The Collaborative Fund e ex-colunista do The Motley Fool Stock Advisor e do The Wall Street Journal. Ele é vencedor de dois prêmios de Melhor Negócio da Society of American Business Editors and Writers and Financial Journalism.",  
      createdAt: new Date(),
      updatedAt: new Date(),   
    }, 
      
  ]);   
  }, 

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Authors', null,{})
  }
};
