const express = require('express');
const os = require('os');
//const bodyParser = require('body-parser');

const app = express();
const port = 82; // Le port sur lequel votre serveur écoutera

//middleware 
//app.use(bodyParser.json()); // décode le body d'une requête
//app.use(bodyParser.urlencoded({ extended: true }));

// Route d'exemple GET
app.get('/', (req, res) => {
    //res.send('<h1><strong>Not Found</strong></h1><br>The requested URL was not found on this server.<br><hr>Apache/2.4.56 (Debian) Server at 192.168.65.9 Port 81');
    const donneeDuCorps = req.query.login;
    
    if (donneeDuCorps != '')
    {
        console.log(donneeDuCorps);
        res.send("<p>Donées reçues et traitées !</p>");
    }
    else
    {
        res.send('<html><head><title>Formulaire de Connexion</title></head><body><form action="" method="get"><label for="login">Login :</label><input type="text" id="login" name="login" required><input type="submit" value="Envoyer"></form></body></html>');
    }
});

// Route d'exemple POST
//app.post('/', (req, res) => {
//    res.send("<p>Donées reçues et traitées !</p>");
//});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur est en écoute sur ${os.networkInterfaces()['ens18'][0].address}:${port}`);
});


// Gestionnaire d'erreurs global
process.on('uncaughtException', (err) => {
    console.error(`Une erreur non capturée s'est produite : ${err.message}`);
    process.exit(1); // 1 signifie une sortie avec une erreur
  });