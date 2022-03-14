const { response } = require('express');
const Hospital = require('../models/hospital');
const Marca = require('../models/marca');
const Usuario = require('../models/usuario');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    /*const usuarios = await Usuario.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex });*/

    const [usuarios, hospitales, marcas] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Marca.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        marcas,
        hospitales

    })
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'marcas':
            data = await Marca.find({ nombre: regex })
                .populate('nombre img descripcion');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla debe ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

    const [usuarios, marcas, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Marca.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        marcas,
        hospitales

    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}