const pool = require("../../config/database");

module.exports = {
    create:(data,callBack) => {
        pool.query(
            `insert into registration(firstname, lastname, email, gender, password, number)values(?,?,?,?,?,?)`,
            [
                data.firstname,
                data.lastname,
                data.email,
                data.gender,
                data.password,
                data.number
            ],
            (error,results,fields)=> {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            `select id,firstname,lastname,email,gender,number from registration`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    getUserById:(id,callBack) => {
        pool.query(
            `select id,firstname,lastname,email,gender,number from registration where id= ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update registration set firstname=?, lastname=?, gender=?, email=?, password=?, number=?  where id=?`,
            [
                data.firstname,
                data.lastname,
                data.email,
                data.gender,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registration where id= ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};