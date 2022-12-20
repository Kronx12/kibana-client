import { KibanaConfig } from '../classes/KibanaConfig';
import { KibanaClient } from '../classes/KibanaClient';
import { CaseInput } from '../classes/inputs/CaseInput';
import { OwnerType } from '../enums/OwnerType';
import { Severity } from '../enums/Severity';
import { ConnectorType } from '../enums/ConnectorType';
import { Case } from '../classes/Case';
import { CommentInput } from '../classes/inputs/CommentInput';
import { CommentType } from '../enums/CommentType';
import { Comment } from '../classes/Comment';

jest.setTimeout(999999)

// Exemple: 
test('KibanaClient', async () => {
	// let config: KibanaConfig = new KibanaConfig("", "", "", "")
	// let client: KibanaClient = new KibanaClient(config);
	
	// // await client.getCase("a028f400-7fb5-11ed-bebb-c745640a722d").then((cases: Case) => {
	// // 	console.log(cases);
	// // })

	// let new_case: CaseInput = {
	// 	assignees: [],
	// 	connector: {
	// 		fields: null,
	// 		id: "none",
	// 		name: "none",
	// 		type: ConnectorType.NONE
	// 	},
	// 	description: "No description",
	// 	owner: OwnerType.SECURITY_SOLUTION,
	// 	settings: {
	// 		syncAlerts: true
	// 	},
	// 	severity: Severity.LOW,
	// 	tags: ["TAGS00"],
	// 	title: "case title"
	// };

	// let new_comment: CommentInput = {
	// 	alertId: ["Alert_idA"],
	// 	index: ["Alert_indexA"],
	// 	type: CommentType.ALERT,
	// 	owner: OwnerType.SECURITY_SOLUTION,
	// 	rule: {
	// 		id: "rule_id",
	// 		name: "rule_name"
	// 	}
	// }

	// await client.createCase(new_case).then(async value => {
	// 	let case_id = value.id;
	// 	await client.addCommentToCase(case_id, new_comment).then(async (c: Case) => {
	// 		console.log(c);
	// 		await client.deleteAllCommentsFromCase(case_id).then(async (r: boolean) => {
	// 			console.log(`Delete all comments ${r}`);
	// 			await client.getCase(case_id).then((c2: Case) => {
	// 				console.log(c2);
	// 			}).catch(e => console.log(e));
	// 		}).catch(e => console.log(e));
	// 	}).catch(e => console.log(e));
	// 	await client.deleteCases([case_id]).then((r: boolean) => {
	// 		console.log(`Delete case ${case_id} ${r}`);
	// 	}).catch(e => console.log(e));
	// }).catch(e => console.log(e))
});