const { response } = require('express');
const Color = require('../models/color');

const getColors = (req, res) => {

    var id = req.params['id'];
    Color.find({ producto: id }, (err, data_color) => {
        if (!err) {
            if (data_color) {
                res.status(200).send({ colores: data_color });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });
};

// const getColor = async(req, res) => {

//     const id = req.params.id;
//     const uid = req.uid;

//     Color.findById(id)
//         .exec((err, color) => {
//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: 'Error al buscar color',
//                     errors: err
//                 });
//             }
//             if (!color) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'El color con el id ' + id + 'no existe',
//                     errors: { message: 'No existe un color con ese ID' }
//                 });

//             }
//             res.status(200).json({
//                 ok: true,
//                 color: color
//             });
//         });


//     // res.json({
//     //     ok: true,
//     //     color
//     //     //uid: req.uid
//     // });
// };

const crearColor = (req, res) => {

    let data = req.body;

    var color = new Color;
    color.titulo = data.titulo;
    color.producto = data.producto;
    color.color = data.color;
    color.save((err, color_data) => {
        if (!err) {
            if (color_data) {
                res.status(200).send({ color: color_data });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });


};

const actualizarColor = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const color = await Color.findById(id);
        if (!color) {
            return res.status(500).json({
                ok: false,
                msg: 'color no encontrado por el id'
            });
        }

        const cambiosColor = {
            ...req.body,
            usuario: uid
        }

        const colorActualizado = await Color.findByIdAndUpdate(id, cambiosColor, { new: true });

        res.json({
            ok: true,
            colorActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarColor = async(req, res) => {

    const id = req.params.id;

    try {

        const color = await Color.findById(id);
        if (!color) {
            return res.status(500).json({
                ok: false,
                msg: 'Color no encontrado por el id'
            });
        }

        await Color.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Color eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};



module.exports = {
    getColors,
    crearColor,
    actualizarColor,
    borrarColor,
    // getColor,
};