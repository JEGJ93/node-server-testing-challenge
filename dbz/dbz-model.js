const db = require("../data/config")

function find() {
    return db("dbz")
}

function findById(id) {
    return db("dbz").where({ id }).first()
}

async function create(data) {
    const [id] = await db("dbz").insert(data)
    return findById(id)
}

async function update(id, data) {
    await db("dbz").where({ id }).update(data)
    return findById(id)
}

function remove(id) {
    return db("dbz").where({ id }).del()
}

module.exports = {
    find,
    findById,
    create,
    update,
    remove
}