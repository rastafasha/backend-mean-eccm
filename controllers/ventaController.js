const { response } = require('express');
const Venta = require('../models/venta');
var Detalle = require('../models/detalle');
var Cancelacion = require('../models/cancelacion');

const getVentas = async(req, res) => {

    const ventas = await Venta.find();

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
        // console.log(error);
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


function evaluar_cancelacion(req, res) {
    const id = req.params.id;
    // var id = req.params['id'];
    Cancelacion.find({ venta: id }, (err, solicitud) => {
        if (solicitud.length != 0) {
            res.status(200).send({ data: true });
        } else {
            res.status(200).send({ data: false });
        }
    })

}


function data_detalle(req, res) {
    var id = req.params['id'];
    Venta.findById({ _id: id }).populate('user').exec((err, data_venta) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (data_venta) {


                Detalle.find({ venta: data_venta._id }).populate('producto').exec((err, data_detalle) => {
                    if (!err) {
                        if (data_detalle) {
                            res.status(200).send({
                                venta: data_venta,
                                detalle: data_detalle
                            });
                        } else {
                            res.status(500).send({ error: err });
                        }
                    } else {
                        res.status(500).send({ error: err });
                    }
                });
            }
        }
    });
}

function finalizar(req, res) {
    var id = req.params['id'];
    Venta.findByIdAndUpdate({ _id: id }, { estado: 'Finalizado' }, (err, venta_data) => {
        if (venta_data) {
            res.status(200).send({ venta: venta_data });
        } else {
            res.status(500).send({ error: err });
        }
    })
}



function cancelar(req, res) {
    var data = req.body;

    var cancelacion = new Cancelacion();
    cancelacion.mensaje = data.mensaje,
        cancelacion.estado = 'En espera',
        cancelacion.user = data.user,
        cancelacion.venta = data.venta,

        cancelacion.save((err, data_soli) => {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                if (data_soli) {
                    Venta.findByIdAndUpdate({ _id: data.venta }, { estado: 'Cancelado' }, (err, venta_data) => {
                        if (venta_data) {
                            res.status(200).send({ venta: venta_data });
                        } else {
                            res.status(500).send({ error: err });
                        }
                    })
                }
            }
        });
}

function listar_cancelaciones(req, res) {
    var wr = req.params['wr'];

    if (wr) {
        Cancelacion.find({ estado: wr }).populate('user').populate('venta').sort({ createdAt: -1 }).exec((err, data_cancelaciones) => {
            if (data_cancelaciones) {
                res.status(200).send({ cancelaciones: data_cancelaciones });
            }
        });
    } else {
        Cancelacion.find().populate('user').populate('venta').sort({ createdAt: -1 }).exec((err, data_cancelaciones) => {
            if (data_cancelaciones) {
                res.status(200).send({ cancelaciones: data_cancelaciones });
            }
        });
    }
}

function evaluar_orden_coment(req, res) {
    var user = req.params['user'];
    var producto = req.params['producto'];

    Detalle.find({ user: user, producto: producto }).exec((err, data) => {

        if (data.length != 0) {
            res.status(200).send({ data: true });
        } else {
            res.status(200).send({ data: false });
        }
    });
}

function get_solicitud(req, res) {
    var id = req.params['id'];
    Cancelacion.findById({ _id: id }).populate('user').populate('venta').exec((err, data_cancelacion) => {
        if (data_cancelacion) {
            res.status(200).send({ cancelacion: data_cancelacion });
        }
    });
}

function obtener_data_cancelacion(req, res) {
    var id = req.params['id'];

    Cancelacion.findOne({ venta: id }).populate('user').populate('venta').exec((err, data_cancelacion) => {
        if (!err) {
            if (data_cancelacion) {
                console.log(data_cancelacion);
                res.status(200).send({ cancelacion: data_cancelacion });
            } else {

                res.status(500).send({ cancelacion: false });
            }
        } else {
            // console.log(err);
            res.status(500).send({ error: err });
        }
    });
}

function reembolsar(req, res) {
    var id = req.params['id'];
    var idticket = req.params['idticket'];
    Venta.findByIdAndUpdate({ _id: id }, { estado: 'Reembolsado' }, (err, venta_data) => {
        if (venta_data) {
            Cancelacion.findByIdAndUpdate({ _id: idticket }, { estado: 'Reembolsado' }, (err, venta_data) => {
                if (venta_data) {
                    res.status(200).send({ venta_data: venta_data });
                } else {
                    res.status(500).send({ error: err });
                }
            })
        } else {
            res.status(500).send({ error: err });
        }
    })
}

function denegar(req, res) {
    var id = req.params['id'];
    var idticket = req.params['idticket'];
    Venta.findByIdAndUpdate({ _id: id }, { estado: 'Venta en proceso' }, (err, venta_data) => {
        if (venta_data) {
            Cancelacion.findByIdAndUpdate({ _id: idticket }, { estado: 'Denegado' }, (err, venta_data) => {
                if (venta_data) {
                    res.status(200).send({ venta_data: venta_data });
                } else {
                    res.status(500).send({ error: err });
                }
            })
        } else {
            res.status(500).send({ error: err });
        }
    })
}


function init_data_admin(req, res) {
    Venta.find().sort({ createdAt: -1 }).populate('user').exec((err, data) => {
        if (data) {
            res.status(200).send({ data: data });
        }
    });
}

function listar_admin(req, res) {
    var tipo = req.params['tipo'];
    var search = req.params['search'];
    var orden = req.params['orden'];

    if (tipo == 'null' && search == 'null') {
        // console.log(orden);

        if (orden == 'fecha+') {
            Venta.find().sort({ createdAt: -1 }).populate('user').exec((err, data) => {
                if (data) {
                    res.status(200).send({ data: data });
                }
            });
        } else if (orden == 'fecha-') {
            Venta.find().sort({ createdAt: 1 }).populate('user').exec((err, data) => {
                if (data) {
                    res.status(200).send({ data: data });
                }
            });
        } else if (orden == 'pagado+') {
            Venta.find().sort({ total_pagado: -1 }).populate('user').exec((err, data) => {
                if (data) {
                    res.status(200).send({ data: data });
                }
            });
        } else if (orden == 'pagado-') {
            Venta.find().sort({ total_pagado: 1 }).populate('user').exec((err, data) => {
                if (data) {
                    res.status(200).send({ data: data });
                }
            });
        } else if (orden == 'null') {
            Venta.find().sort({ createdAt: -1 }).populate('user').exec((err, data) => {
                if (data) {
                    res.status(200).send({ data: data });
                }
            });
        }
    } else {
        console.log('filtro');
        if (tipo == 'fecha') {
            let data = search.split('-');
            var dia;
            var mes;
            if (data[1] == 0) {
                dia = ''
            } else {
                dia = data[1];
            }
            if (data[2] == 0) {
                mes = ''
            } else {
                mes = data[2];
            }
            if (orden == 'fecha+') {
                Venta.find({ year: data[0], day: new RegExp(dia, 'i'), month: new RegExp(mes, 'i') }).populate('user').sort({ createdAt: -1 }).exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            } else if (orden == 'fecha-') {
                Venta.find({ year: data[0], day: new RegExp(dia, 'i'), month: new RegExp(mes, 'i') }).populate('user').sort({ createdAt: 1 }).exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            }
            if (orden == 'pagado+') {
                Venta.find({ year: data[0], day: new RegExp(dia, 'i'), month: new RegExp(mes, 'i') }).populate('user').sort({ total_pagado: -1 }).exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            }
            if (orden == 'pagado-') {
                Venta.find({ year: data[0], day: new RegExp(dia, 'i'), month: new RegExp(mes, 'i') }).populate('user').sort({ total_pagado: 1 }).exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            }

        } else if (tipo == 'estado') {
            if (orden == 'fecha+') {
                Venta.find({ estado: search }).sort({ createdAt: -1 }).populate('user').exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            } else if (orden == 'fecha-') {
                Venta.find({ estado: search }).sort({ createdAt: 1 }).populate('user').exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            }
            if (orden == 'pagado+') {
                Venta.find({ estado: search }).sort({ total_pagado: -1 }).populate('user').exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            }
            if (orden == 'pagado-') {
                Venta.find({ estado: search }).sort({ total_pagado: 1 }).populate('user').exec((err, data) => {
                    if (data) {
                        res.status(200).send({ data: data });
                    }
                });
            }
        } else if (tipo == 'codigo') {
            Venta.find({ _id: search }).populate('user').exec((err, data) => {
                res.status(200).send({ data: data });
            });
        }
    }
}

function set_track(req, res) {
    var id = req.params['id'];
    var data = req.body;
    Venta.findByIdAndUpdate({ _id: id }, { tracking_number: data.tracking_number, estado: 'Enviado' }, (err, venta_data) => {
        if (venta_data) {
            res.status(200).send({ venta: venta_data });
        } else {
            res.status(500).send({ error: err });
        }
    })
}

function update_enviado(req, res) {
    var id = req.params['id'];
    Venta.findByIdAndUpdate({ _id: id }, { estado: 'Enviado' }, (err, venta_data) => {
        if (venta_data) {
            res.status(200).send({ venta: venta_data });
        } else {
            res.status(500).send({ error: err });
        }
    })
}

function listar_ventas_dashboard(req, res) {
    Venta.find().exec((err, data) => {
        if (data) {
            // console.log(data);
            res.status(200).send({ data: data });
        }
    });
}

function detalles_hoy(req, res) {
    var mydate = new Date();

    Detalle.find().sort({ _id: -1 }).populate('producto').limit(10).exec((err, data) => {
        if (data) {
            res.status(200).send({ data: data });
        }
    });
}


module.exports = {
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta,
    getVenta,
    data_detalle,
    finalizar,
    init_data_admin,
    evaluar_cancelacion,
    cancelar,
    listar_cancelaciones,
    get_solicitud,
    reembolsar,
    obtener_data_cancelacion,
    evaluar_orden_coment,
    denegar,
    listar_admin,
    set_track,
    update_enviado,
    listar_ventas_dashboard,
    detalles_hoy
};