'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
      author_id: 1,
      category_id: 1,
      name: "sem esforço",
      cover_url: "https://m.media-amazon.com/images/I/71yqe0RX3VL._SY466_.jpg",
      release_date: "2021-07-23",
      pages: 272,
      synopsis: "Nem todas as coisas difíceis na vida podem ser facilitadas. Mas é possível tornar mais fácil aquilo que é mais importante.",
      highlighted: false,  
      createdAt: new Date(),
      updatedAt: new Date(),   
    }, 
    {
      author_id: 2,
      category_id: 2,
      name: "isso é marketing",
      cover_url: "https://m.media-amazon.com/images/I/71rrbVMJEcL._SY466_.jpg",
      release_date: "2019-06-17",
      pages: 282,
      synopsis: "No centro da sua abordagem está uma grande ideia: grandes profissionais de marketing não usam os consumidores para resolver o problema da empresa.",
      highlighted: false,  
      createdAt: new Date(),
      updatedAt: new Date(),   
    },      
    {
      author_id: 3,
      category_id: 7,
      name: "A coragem de ser imperfeito",
      cover_url: "https://m.media-amazon.com/images/I/61rRRbfINJL._SY425_.jpg",
      release_date: "2016-09-16",
      pages: 208,
      synopsis: "Brené Brown ousou tocar em assuntos que costumam ser evitados por causarem grande desconforto. Sua palestra a respeito de vulnerabilidade, medo, vergonha e imperfeição já teve mais de 25 milhões de visualizações.",
      highlighted: false,  
      createdAt: new Date(),
      updatedAt: new Date(),   
    },  
    {
      author_id: 4,
      category_id: 6,
      name: "A psicologia financeira",
      cover_url: "https://m.media-amazon.com/images/I/41htlT5B29S._SY445_SX342_ControlCacheEqualizer_.jpg",
      release_date: "2021-05-15",
      pages: 304,
      synopsis: "O livro de educação financeira mais comentado dos últimos anos, com mais de 1 milhão de exemplares vendidos no mundo todo!",
      highlighted: false,  
      createdAt: new Date(),
      updatedAt: new Date(),   
    },       
      
  ]);   
  }, 

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null,{})
  }
};
