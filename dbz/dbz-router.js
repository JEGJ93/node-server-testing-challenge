const express = require("express")
const DBZ = require("./dbz-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        res.json(await DBZ.find())
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const dbz = await DBZ.findById(req.params.id)
        if (!dbz) {
            return res.status(404).json({
                message: "DBZ Character Not Found",
            })
        }
        res.json(dbz)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const dbz = await DBZ.create(req.body)
        res.status(201).json(dbz)
    } catch(err) {
        next(err)
    }
})

// router.delete("/:id", async (req, res, next) => {
//     try {
//         const dbz = await DBZ.remove(req.params.id)
//         if (!dbz) {
//             return res.status(404).json({
//                 message: "DBZ Character Removed",
//             })
//         }
//         res.json(dbz)
//     } catch(err) {
//         next(err)
//     }
// })

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    DBZ.remove(id)
    .then(count => {
        if (count) {
            res.json({ removed: count })
        } else {
            res.status(404).json({ message: "Could not find character with given id"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to delete"})
    })
})

module.exports = router