const { response } = require('express');
const Venta = require('../models/venta');

const getVentas = async(req, res) => {

    const ventas = await Venta.find().populate('imagen producto');

    res.json({
        ok: true,
        ventas
    });
};

const getVenta = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    Venta.findById(id)
        .exec((err, venta) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Venta',
                    errors: err
                });
            }
            if (!venta) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Venta con el id ' + id + 'no existe',
                    errors: { message: 'No existe un Venta con ese ID' }
                });

            }
            res.status(200).json({
                ok: true,
                venta: venta
            });
        });


    // res.json({
    //     ok: true,
    //     categoria
    //     //uid: req.uid
    // });
};

const crearVenta = async(req, res) => {

    const uid = req.uid;
    const venta = new Venta({
        usuario: uid,
        ...req.body
    });

    try {

        const ventaDB = await venta.save();

        res.json({
            ok: true,
            venta: ventaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarVenta = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const venta = await Venta.findById(id);
        if (!venta) {
            return res.status(500).json({
                ok: false,
                msg: 'venta no encontrado por el id'
            });
        }

        const cambiosVenta = {
            ...req.body,
            usuario: uid
        }

        const ventaActualizado = await Venta.findByIdAndUpdate(id, cambiosVenta, { new: true });

        res.json({
            ok: true,
            ventaActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarVenta = async(req, res) => {

    const id = req.params.id;

    try {

        const galeria = await Venta.findById(id);
        if (!galeria) {
            return res.status(500).json({
                ok: false,
                msg: 'Venta no encontrado por el id'
            });
        }

        await Venta.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Venta eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};





module.exports = {
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta,
    getVenta,
};