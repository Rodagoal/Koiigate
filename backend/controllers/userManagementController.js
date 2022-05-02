const express = require('express');
const bcrypt = require('bcrypt');
const dbconnect = require('../config/dbConnection.js');
const { application, response } = require('express');
const salty = 10;

const ingresaTutor = async (req, res) => {
    const { nombretut, password, confpassword, nombrealu, apellidoalu, nacimiento, schoolmester, foto } = req.body;
    if(!nombretut || !password || !confpassword || !nombrealu || !apellidoalu || !nacimiento || !schoolmester || !foto){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    const fullname = nombrealu+" "+apellidoalu;
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    if(isPassValid(password)){
        dbconnect.query('SELECT * FROM nombres_tutor_hijos', (error, resp, fields) => {
            if(error)
                console.log(error)
            else{
                let newtut = nombretut;
                let newal = fullname;
                for(let i = 0; i<resp.length; i++){
                if(resp[i].usuario == newtut){
                    if(resp[i].nombre == newal)
                        return res.status(409).send({ success: false, message: 'No se pueden duplicar registros del padre con el mismo estudiante'})
                    }
                }
                dbconnect.query('SELECT idAlumno FROM alumno', (e, r, fields) => {
                    if(e)
                        console.log(e)
                    const newaid = (r.length)+1;
                    dbconnect.query('INSERT INTO alumno(idAlumno, nombre, fechaNacimiento, anioEscolar, fotografia) VALUES (?, ?, ?, ?, ?)', [newaid, fullname, nacimiento, schoolmester, foto], (err, resonse, fields) => {
                        if(err)
                            console.log(err)
                        else{
                            dbconnect.query('SELECT idTutor FROM tutor', (er, re, fields) => {
                                if(er)
                                    console.log(er)
                                const newtid = (re.length)+1;
                                bcrypt.hash(password, salty, function(err, hash) {
                                    dbconnect.query('INSERT INTO tutor(idTutor, usuario, contrasenia) VALUES (?, ?, ?)', [newtid, nombretut, hash], (error, response, fields) => {
                                        if(error)
                                            console.log(error)
                                        else{
                                            resonse.message = "Se ha creado un nuevo tutor!";
                                            dbconnect.query('INSERT INTO `tutor-alumno`(idTutor, idAlumno) VALUES (?, ?)', [newtid, newaid], (err, respo, fields) => {
                                                if(err)
                                                    console.log(erro)
                                                else{
                                                    respo.message = "Se ha creado un nuevo tutor e ingresado un nuevo alumno!";
                                                    return res.status(200).json(respo)
                                                }
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
            }
        })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}

const ingresaAdmin = async (req, res) => {
    const { nombread, apellidoad, password, confpassword } = req.body;
    if(!nombread || !apellidoad || !password || !confpassword){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    const fullname = nombread+" "+apellidoad;
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    dbconnect.query ('SELECT * FROM admin', (error, response, fields) => {
        if(error)
            console.log(error)
        else{
            for(let i = 0; i<response.length; i++){
            if(response[i].usuario == fullname){
                bcrypt.compare(password, response[i].contrasenia, (er, result) => {
                if(er)
                    console.log(er);
                if(result)
                    return res.status(409).send({ success: false, message: 'Registro de administrador ya existente'})
                })
            }
            }
        }
    })
    if(isPassValid(password)){
        dbconnect.query('SELECT idAdministrador FROM admin', (err, resonse, fields) =>{
        if(err) 
            console.log(err)
        else{
                let newaid = 0;
                for(let i = 0; i<resonse.length; i++){
                    newaid = resonse[i].idAdministrador;
                }
                newaid++;
                bcrypt.hash(password, salty, function(er, hash) {
                dbconnect.query('INSERT INTO admin(idAdministrador, usuario, contrasenia) VALUES (?, ?, "'+hash+'")', [newaid, fullname], (er, resose, field) => {
                    if(er)
                        console.log(er)
                    else{
                            resose.message = "Se ha creado un nuevo administrador!";
                            return res.status(200).json(resose);
                        }
                    })
                })
                dbconnect.query('SELECT idAlumno FROM alumno', (e, r, fields) => {
                    if(e)
                        console.log(e)
                    else{
                        for(let i = 0; i<r.length; i++){
                            dbconnect.query('INSERT INTO `alumno-administrador`(idAdministrador, idAlumno, idCuestionario, fecha, progreso) VALUES (?, ?, 0, 1000-01-01, " ")', [newaid, r[i].idAlumno], (err, re, fields) => {
                                if(err)
                                    console.log(err)
                            })
                        }
                    }
                })
            }
        })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}

//metele de parametro al boton de update (val.id) 
const editaTutor = async (req, res) => {
    const { idtut, nombretut, password, confpassword, nombrealu, apellidoalu, nacimiento, schoolmester, foto } = req.body;
    if(!nombretut || !password || !confpassword || !nombrealu || !apellidoalu || !nacimiento || !schoolmester || !foto){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    const fullname = nombrealu+" "+apellidoalu;
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    if(isPassValid(password)){
        bcrypt.hash(password, salty, function(err, hash) {
        dbconnect.query('UPDATE tutor SET usuario = ?, contrasenia = ? WHERE idTutor = ?', [nombretut, hash, idtut], (e, r, fields) => {
            if(e)
                console.log(e)
            else{
                dbconnect.query('SELECT idAlumno FROM `tutor-alumno` WHERE idTutor = ?', [idtut], (er, re, fields) => {
                    if(er)
                        console.log(er)
                    else{
                    dbconnect.query('UPDATE alumno SET nombre = ?, fechaNacimiento = ?, anioEscolar = ?, fotografia = ? WHERE idAlumno = ?', [fullname, nacimiento, schoolmester, foto, re[0].idAlumno], (err, reso, fields) => {
                        if(err)
                            console.log(err)
                        else{
                        reso.message = "Se ha actualizado la información!"
                        return res.status(200).json(reso)
                        }
                    })
                    }
                })
            }
        })
    })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}

//metele de parametro al boton de update (val.id) 
const editaAdmin = async (req, res) => {
    const { idadmin, nombread, apellidoad, password, confpassword } = req.body;
    if(!nombread || !apellidoad || !password || !confpassword){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    const fullname = nombread+" "+apellidoad;
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    if(isPassValid(password)){
        bcrypt.hash(password, salty, function(e, hash) {
            dbconnect.query('UPDATE admin SET usuario = ?, contrasenia = ? WHERE idAdministrador = ?', [fullname, hash, idadmin], (er, re, fields) => {
                if(er)
                    console.log(er)
                else{
                    re.message = "Se ha actualizado la información!"
                    return res.status(200).json(re)
                }
            })
        })

    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}


const borraTutor = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT idAlumno FROM `tutor-alumno` WHERE idTutor = ?', [id], (error, re, fields) => {
        if(error)
            console.log(error)
        else{
            dbconnect.query('DELETE FROM tutor WHERE idTutor = ?', [id], (er, resp, fields) => {
                if(er)
                    console.log(er)
                else{
                    dbconnect.query('DELETE FROM alumno WHERE idAlumno = ?', [re[0].idAlumno], (err, resonse, fields) => {
                        if(err)
                            console.log(err)
                        else{
                            dbconnect.query('SELECT * FROM tutor', (erro, reso, fields) => {
                                if(erro)
                                    console.log(erro)
                                else{
                                    for(let i = 1; i<=reso.length; i++){
                                        dbconnect.query('UPDATE tutor SET idTutor = '+i+' WHERE idTutor = '+reso[i-1].idTutor, (err, reson, fields) => {
                                            if(err)
                                                console.log(err)
                                            })
                                        }
                                    }
                                    dbconnect.query('SELECT * FROM alumno', (erro, reso, fields) => {
                                        if(erro)
                                            console.log(erro)
                                        else{
                                            for(let i = 1; i<=reso.length; i++){
                                                dbconnect.query('UPDATE alumno SET idAlumno = '+i+' WHERE idAlumno = '+reso[i-1].idAlumno, (err, reson, fields) => {
                                                    if(err)
                                                        console.log(err)
                                                })
                                            }
                                        }
                                    })
                                    resonse.message = "Tutor/Alumno borrado exitosamente!";
                                    return res.status(200).json(resonse)
                                }
                            )}
                    })
                }
            })
        }
    })
}

const borraAdmin = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('DELETE FROM admin WHERE idAdministrador = ?', [id], (error, response, fields) => {
    if(error)
        console.log(error)
    else{
        response.message = "Administrador borrado exitosamente!"
        dbconnect.query('SELECT * FROM admin', (erro, resonse, fields) => {
            if(erro)
                console.log(erro)
            else{
                for(let i = 1; i<=resonse.length; i++){
                    dbconnect.query('UPDATE admin SET idAdministrador = '+i+' WHERE idAdministrador = '+resonse[i-1].idAdministrador, (err, resose, fields) => {
                        if(err)
                            console.log(err)
                    })
                }
            }
        })
        return res.status(200).json(response)
    }
    })
}

function isPassValid(str) {
    return /^(?=.*[0-9])(?=.*[#"!/()=?¿¡{}_$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(str);
}

module.exports = { ingresaTutor, ingresaAdmin, editaTutor, editaAdmin, borraTutor, borraAdmin }