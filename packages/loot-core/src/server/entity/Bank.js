// import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

// @Entity()
// export class Bank {
    
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string
    
//     @Column()
//     active: boolean

// };



var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Bank", // Will use table name `bank` as default behaviour.
    tableName: "banks", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        active: {
            type: "boolean",
        },
    }
})