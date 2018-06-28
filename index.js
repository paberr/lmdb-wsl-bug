const JDB = require('@nimiq/jungle-db');

const db = new JDB.JungleDB('./database', 1);
const st = db.createObjectStore('testTable');
st.createIndex('prop');

(async function() {
	await db.connect();

	const tx = st.transaction();
	tx.putSync('test', { 'prop': 'dff', 'code': 1234 });
	await tx.commit();

	const results = await st.values(JDB.Query.and(JDB.Query.ge('prop', 'dff'), JDB.Query.min('prop')));
	console.log(results);
})();
