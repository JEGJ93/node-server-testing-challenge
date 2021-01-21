
exports.seed = async function(knex) {
  await knex("dbz").truncate()
  await knex("dbz").insert([
    { name: "goku"},
    { name: "vegeta"},
    { name: "gohan"},
    { name: "trunks"},
    { name: "piccolo"},
    { name: "goten"},

  ])
};
