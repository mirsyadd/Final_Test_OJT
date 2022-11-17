const fs = require('fs');
const path = require('path');
const {db} = require('../config/Database')
const {v1} = require('uuid')
const uuid = v1()
const {v4} = require('uuid')
const uuidv4 = v4()
const xlsxtojson = require('xlsx-to-json-lc')
const RedisServer = require('../server/RedisServer')
const Response = require('../Helper/Response')

const donwloadTemplate = (req, res) => {
    const filePath = path.join(__dirname, "../assets/template");
    const fileName = "ticket_template.xlsx";
    fs.readFile(`${filePath}/${fileName}`, function(err, data){
        if(err) {
            Response.Failed(res, err)
        } else {
            res.setHeader(
                "Content-Disposition",
                'attachment; filename="' + fileName + '"'
            )
            res.type(
                "appication/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
            res.send(data)
        }
    })
}

const AddExcel = (req, res) => {
    xlsxtojson({
        input: req.files.file.path,
        output: null,
        lowerCaseHeaders: true,
    }, async function (err, result) {
        if (err) {
            console.log(err);
        }
        const finalResult = result
        .filter((item) =>
            item.id_ticket !== '' ||
            item.description !== '' ||
            item.activity_date !== '' ||
            item.total_claim !== '' 
        )
        .map((item) => {
            return {
            id_ticket: item.id_ticket,
            activity_date: item.activity_date,
            total_claim: item.total_claim,
            description: item.description,
            };
        });
        const ResultResponse = {
            redisKey: uuid,
            tableInput: finalResult
        }
        try {
            console.log("store data in redis");
            await RedisServer.set(uuid, JSON.stringify(ResultResponse))
            .then((response) => {
                Response.Success(res, ResultResponse)
            })
            // res.send(JSON.parse(await RedisServer.get(uuid)));
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    })
}

const submitExcel = async (req ,res)=> {
    const redisKey = req.params.id
    const redisdata = await RedisServer.get(redisKey)
    const data = JSON.parse(redisdata)

    for (const item of data) {
        try {
            db.query(`INSERT INTO ticket_list_activity (id, id_ticket, description, activity_date, total_claim) VALUE (?,?,?,?,?)`,
            [ item.id_ticket, item.description, item.activity_date, item.total_claim],
            (err, result) => {
                if (err){
                    console.log(err);
                }
                res.send("Add Excel Success")
            })
        } catch (error) {
            console.log(error);
        }
    }
}

const UploadExcel = (req ,res) => {
    console.log(req);
        xlsxtojson(
            {
                input: req.files.file.path,
                output: null,
                lowerCaseHeaders: true,
            },
            function (err, result) {
                if(err) {
                    console.log(err);
                }
                const finalResult = result
                .filter((item) => 
                    item.id_ticket !== '' || 
                    item.description !== '' ||
                    item.activity_date !== '' ||
                    item.total_claim !== '' 
                    )
                    for (const item of finalResult  ) {
                        console.log(item);
                        db.query(
                            `INSERT INTO ticket_list_activity ( id_ticket, description, activity_date, total_claim) VALUE (?,?,?,?)`,
                            [item.id_ticket, item.description, item.activity_date, item.total_claim],
                            (err, result) => {
                                if(err){console.log(err)}
                            })
                        } 
                    res.send({
                        status: true,
                        message: 'Berhasil ambil data Excel!!',
                        data: finalResult
                })
            }
        )
}

module.exports = {
    AddExcel,
    donwloadTemplate,
    submitExcel, 
    UploadExcel
}