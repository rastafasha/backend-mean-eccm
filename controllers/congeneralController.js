const { response } = require('express');
const Congeneral = require('../models/congeneral');

const getCongenerals = async(req, res) => {

    const congenerals = await Congeneral.find().populate('titulo logo favicon');

    res.json({
        ok: true,
        congenerals
    });
};

const getCongeneral = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    Congeneral.findById(id)
        .exec((err, congeneral) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Congeneral',
                    errors: err
                });
            }
            if (!congeneral) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El Congeneral con el id ' + id + 'no existe',
                    errors: { message: 'No existe un Congeneral con ese ID' }
                });

            }
            res.status(200).json({
                ok: true,
                congeneral: congeneral
            });
        });


    // res.json({
    //     ok: true,
    //     categoria
    //     //uid: req.uid
    // });
};

const crearCongeneral = async(req, res) => {

    const uid = req.uid;
    const congeneral = new Congeneral({
        usuario: uid,
        ...req.body
    });

    try {

        const congeneralDB = await congeneral.save();

        res.json({
            ok: true,
            congeneral: congeneralDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarCongeneral = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const congeneral = await Congeneral.findById(id);
        if (!congeneral) {
            return res.status(500).json({
                ok: false,
                msg: 'Congeneral no encontrado por el id'
            });
        }

        const cambiosCongeneral = {
            ...req.body,
            usuario: uid
        }

        const congeneralActualizado = await Congeneral.findByIdAndUpdate(id, cambiosCongeneral, { new: true });

        res.json({
            ok: true,
            congeneralActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarCongeneral = async(req, res) => {

    const id = req.params.id;

    try {

        const congeneral = await Congeneral.findById(id);
        if (!congeneral) {
            return res.status(500).json({
                ok: false,
                msg: 'congeneral no encontrado por el id'
            });
        }

        await Congeneral.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Congeneral eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};



function slider(req, res) {
    var data = req.body;

    var id = req.params['id'];
    var banner = req.params['banner'];
    console.log(id);
    var img_banner = req.files.imagen;

    if (img_banner == null) {
        Slider.findByIdAndUpdate({ _id: id }, { titulo_uno: data.titulo_uno, titulo_dos: data.titulo_dos, subtitulo: data.subtitulo, estado: data.estado }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Ocurrió un error en el servidor.' });
            } else {
                if (data) {
                    res.status(200).send({ data: data });
                } else {
                    res.status(500).send({ message: 'No se actualizó la configuración, vuelva a intentar nuevamente.' });
                }
            }
        })
    } else if (img_banner) {

        fs.stat('./uploads/configuraciones/' + banner, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/' + banner, (err) => {
                    if (err) throw err;
                });
            } else {
                console.log(banner);

            }
        });

        var banner_path = req.files.imagen.path;
        var name = banner_path.split('\\');
        var banner_banner = name[2];

        Slider.findByIdAndUpdate({ _id: id }, { titulo_uno: data.titulo_uno, titulo_dos: data.titulo_dos, subtitulo: data.subtitulo, estado: data.estado, imagen: banner_banner }, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Ocurrió un error en el servidor.' });
            } else {
                if (data) {
                    res.status(200).send({ data: data });
                } else {
                    res.status(500).send({ message: 'No se actualizó la configuración, vuelva a intentar nuevamente.' });
                }
            }
        })
    }
}


function getSlider(req, res) {
    Slider.find().exec((err, data) => {
        if (data) {
            res.status(200).send({ data: data });
        }
    });
}

function getSliderOne(req, res) {
    var id = req.params['id'];
    Slider.findOne({ _id: id }).exec((err, data) => {
        if (data) {
            res.status(200).send({ data: data });
        }
    });
}


module.exports = {
    getCongenerals,
    crearCongeneral,
    actualizarCongeneral,
    borrarCongeneral,
    getCongeneral,
    slider,
    getSlider,
    getSliderOne
};