const express = require('express'),
    request = require('supertest'),
    app = require('../server.js'); // référence à votre fichier server.js

console.log('coucou supertest')


// // ==================== Test de l'API utilisateur ==================== 


// describe('GET / users', function() {
//     it('répondre avec json contenant une liste de tous les utilisateurs', function(done) {
//         request(app)
//             .get('/ users')
//             .set('Accept', 'application / json')
//             .expect('Content-Type', / json /)
//             .expect(200, fait);
//     });
// });

// describe('wishes RESTful API', () => {

//     it('should return wishes', (done) => {

//         request(app)

//         .get('/login/123456/wishes/')

//         .set('Accept', 'application/json')
//             .field('Content-Type', 'multipart/form-data')
//             .field('name', 'moni')
//             .attach('photo1', '/public/images/profil.jpg')
//             .expect(200, [{
//                 id: 'abcdef',
//                 title: 'Holidays'
//             }], done);
//     });
// });