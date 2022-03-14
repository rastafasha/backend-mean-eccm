const { response } = require('express');
const Carrito = require('../models/carrito');

const getCarritos = async(req, res) => {

    const carritos = await Carrito.find().populate(' producto');

    res.json({
        ok: true,
        carritos
    });
};

const getCarrito = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    Carrito.findById(id)
        .exec((err, carrito) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar carrito',
                    errors: err
                });
            }
            if (!carrito) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El carrito con el id ' + id + 'no existe',
                    errors: { message: 'No existe un carrito con ese ID' }
                });

            }
            res.status(200).json({
                ok: true,
                carrito: carrito
            });
        });


    // res.json({
    //     ok: true,
    //     color
    //     //uid: req.uid
    // });
};

const crearCarrito = async(req, res) => {

    const uid = req.uid;
    const color = new Carrito({
        usuario: uid,
        ...req.body
    });

    try {

        const carritoDB = await carrito.save();

        res.json({
            ok: true,
            carrito: carritoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarCarrito = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const carrito = await Carrito.findById(id);
        if (!carrito) {
            return res.status(500).json({
                ok: false,
                msg: 'carrito no encontrado por el id'
            });
        }

        const cambiosCarrito = {
            ...req.body,
            usuario: uid
        }

        const carritoActualizado = await Carrito.findByIdAndUpdate(id, cambiosCarrito, { new: true });

        res.json({
            ok: true,
            carritoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarCarrito = async(req, res) => {

    const id = req.params.id;

    try {

        const carrito = await Carrito.findById(id);
        if (!carrito) {
            return res.status(500).json({
                ok: false,
                msg: 'carrito no encontrado por el id'
            });
        }

        await Carrito.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'carrito eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};



function previewCarrito(req, res) {
    var id = req.params['id'];

    Carrito.find({ user: id }).populate('producto').sort({ createdAt: -1 }).exec((err, carrito_data) => {
        if (!err) {
            if (carrito_data) {
                res.status(200).send({ carrito: carrito_data });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });
}

function removeCarrito(req, res) {
    var id = req.params['id'];
    Carrito.findByIdAndRemove({ _id: id }, (err, carrito_data) => {
        if (!err) {
            if (carrito_data) {
                res.status(200).send({ carrito: carrito_data });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });
}



module.exports = {
    getCarritos,
    crearCarrito,
    actualizarCarrito,
    borrarCarrito,
    getCarrito,
    previewCarrito,
    removeCarrito
};