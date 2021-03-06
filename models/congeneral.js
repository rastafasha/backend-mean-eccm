var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CongeneralSchema = Schema({
    titulo: { type: String, required: true },
    logo: { type: String, required: false },
    favicon: { type: String, required: false },
    cr: { type: String, required: true },
    telefono_uno: { type: String, required: true },
    telefono_dos: { type: String, required: true },
    email_uno: { type: String, required: true },
    email_dos: { type: String, required: true },
    direccion: { type: String, required: true },
    horarios: { type: String, required: true },
    iframe_mapa: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    youtube: { type: String, required: false },
    twitter: { type: String, required: false },
    language: { type: String, required: false },
});

module.exports = mongoose.model('congeneral', CongeneralSchema);