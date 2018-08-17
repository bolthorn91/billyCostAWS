
module.exports = {
    createCookie: createCookie,
    checkAuth: checkAuth,
}

function createCookie(req, res) {
    if (req.session.views) {
        req.session.views++
        const sessionID = req.session.id
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>vista: ' + req.session.views + ' veces</p>')
        res.write('<p>expira en: ' + (req.session.cookie.maxAge / 1000) + 'segundos</p>'
            + '<p> el id de la sesion es' + sessionID + '</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('Se acaba de lanzar una cookie')
    }
}


function checkAuth(req, res, next) {
    console.log('checkAuth ' + req.url);

    // no muestra /secure si no tiene una session autenticada
    if (req.url === '/session' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }

    next();
}