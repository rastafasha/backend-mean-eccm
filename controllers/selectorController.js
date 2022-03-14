const { response } = require('express');
const Selector = require('../models/selector');

const getSelectors = async(req, res) => {

    const selectors = await Selector.find().populate('titulo estado producto');

    res.json({
        ok: true,
        selectors
    });
};

const getSelector = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    Selector.findById(id)
        .exec((err, selector) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Selector',
                    errors: err
                });
            }
            if (!selector) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Selector con el id ' + id + 'no existe',
                    errors: { message: 'No existe un Selector con ese ID' }
                });

            }
            res.status(200).json({
                ok: true,
                selector: selector
            });
        });


    // res.json({
    //     ok: true,
    //     color
    //     //uid: req.uid
    // });
};

const crearSelector = async(req, res) => {

    const uid = req.uid;
    const selector = new Selector({
        usuario: uid,
        ...req.body
    });

    try {

        const selectorDB = await selector.save();

        res.json({
            ok: true,
            selector: selectorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarSelector = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const selector = await Selector.findById(id);
        if (!selector) {
            return res.status(500).json({
                ok: false,
                msg: 'selector no encontrado por el id'
            });
        }

        const cambiosSelector = {
            ...req.body,
            usuario: uid
        }

        const selectorActualizado = await Selector.findByIdAndUpdate(id, cambiosSelector, { new: true });

        res.json({
            ok: true,
            selectorActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarSelector = async(req, res) => {

    const id = req.params.id;

    try {

        const selector = await Selector.findById(id);
        if (!selector) {
            return res.status(500).json({
                ok: false,
                msg: 'Selector no encontrado por el id'
            });
        }

        await Selector.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Selector eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};



module.exports = {
    getSelectors,
    crearSelector,
    actualizarSelector,
    borrarSelector,
    getSelector,
};