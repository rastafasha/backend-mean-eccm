const { response } = require('express');
const Direccion = require('../models/direccion');

const getDireccions = async(req, res) => {

    const direccions = await Direccion.find();

    res.json({
        ok: true,
        direccions
    });
};

const getDireccion = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    Direccion.findById(id)
        .exec((err, direccion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar direccion',
                    errors: err
                });
            }
            if (!direccion) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El direccion con el id ' + id + 'no existe',
                    errors: { message: 'No existe un direccion con ese ID' }
                });

            }
            res.status(200).json({
                ok: true,
                direccion: direccion
            });
        });


    // res.json({
    //     ok: true,
    //     categoria
    //     //uid: req.uid
    // });
};

const crearDireccion = async(req, res) => {

    const uid = req.uid;
    const direccion = new Direccion({
        usuario: uid,
        ...req.body
    });

    try {

        const direccionDB = await direccion.save();

        res.json({
            ok: true,
            direccion: direccionDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarDireccion = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const direccion = await Direccion.findById(id);
        if (!direccion) {
            return res.status(500).json({
                ok: false,
                msg: 'direccion no encontrado por el id'
            });
        }

        const cambiosDireccion = {
            ...req.body,
            usuario: uid
        }

        const direccionActualizado = await Direccion.findByIdAndUpdate(id, cambiosDireccion, { new: true });

        res.json({
            ok: true,
            direccionActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarDireccion = async(req, res) => {

    const id = req.params.id;

    try {

        const direccion = await Direccion.findById(id);
        if (!direccion) {
            return res.status(500).json({
                ok: false,
                msg: 'direccion no encontrado por el id'
            });
        }

        await Direccion.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Direccion eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};



module.exports = {
    getDireccions,
    crearDireccion,
    actualizarDireccion,
    borrarDireccion,
    getDireccion,
};