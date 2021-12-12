// https://betterprogramming.pub/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/stadtLandFlussLetterGen'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: '/dist/stadtLandFlussLetterGen'});
});

app.listen(process.env.PORT || 8080);