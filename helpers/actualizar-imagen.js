const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Marca = require('../models/marca');
const Congeneral = require('../models/congeneral');
const Producto = require('../models/producto');
const Promocion = require('../models/promocion');
const Galeria = require('../models/galeria');
const Ingreso = require('../models/ingreso');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'productos':
            const producto = await Producto.findById(id);
            if (!producto) {
                console.log('No es un producto por id');
                return false;
            }
            pathViejo = `./uploads/productos/${producto.img}`;

            borrarImagen(pathViejo);

            producto.img = nombreArchivo;
            await producto.save();
            return true;
            break;

        case 'promocions':
            const promocion = await Promocion.findById(id);
            if (!promocion) {
                console.log('No es un promocion por id');
                return false;
            }
            pathViejo = `./uploads/promocions/${promocion.img}`;

            borrarImagen(pathViejo);

            promocion.img = nombreArchivo;
            await promocion.save();
            return true;
            break;

        case 'congenerals':
            const congeneral = await Congeneral.findById(id);
            if (!congeneral) {
                console.log('No es un hospital por id');
                return false;
            }
            pathViejo = `./uploads/congenerals/${congeneral.img}`;

            borrarImagen(pathViejo);

            congeneral.img = nombreArchivo;
            await congeneral.save();
            return true;
            break;

        case 'marcas':
            const marca = await Marca.findById(id);
            if (!marca) {
                console.log('No es un hospital por id');
                return false;
            }
            pathViejo = `./uploads/marcas/${marca.img}`;

            borrarImagen(pathViejo);

            marca.img = nombreArchivo;
            await marca.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

        case 'galerias':
            const galeria = await Galeria.findById(id);
            if (!galeria) {
                console.log('No es un galeria por id');
                return false;
            }
            pathViejo = `./uploads/galerias/${galeria.img}`;

            borrarImagen(pathViejo);

            galeria.img = nombreArchivo;
            await galeria.save();
            return true;
            break;

        case 'ingresos':
            const ingreso = await Ingreso.findById(id);
            if (!ingreso) {
                console.log('No es un ingreso por id');
                return false;
            }
            pathViejo = `./uploads/ingresos/${ingreso.img}`;

            borrarImagen(pathViejo);

            ingreso.img = nombreArchivo;
            await ingreso.save();
            return true;
            break;
    }

};

module.exports = {
    actualizarImagen
};