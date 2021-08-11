// Puerto del servidor
process.env.PORT = process.env.PORT || 3008;

//Entorno, desarrollo, produccion
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.CADUCIDAD_TOKEN = '8h';

// SEED
process.env.SEED = process.env.SEED || 'eventoSena';


//en /senamecuida se debe colocar el nombre de la base de datos que importamos 
process.env.URLDB='mongodb://localhost/senamecuida'

process.env.SECRET="fabrica2020"


