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
	
	// await client.findCases({
	// 	perPage: 100,
	// 	page: 1
	// }).then((cases: Case[]) => {
	// 	console.log(cases);
	// }).catch(e => console.log(e));

	// await client.findConnectors().then(r => console.log(r)).catch(e => console.log(e));
});