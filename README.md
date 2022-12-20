# Kibana Client

### This package is used to connect and chat with the Kibana API

**Here is the list of currently implemented endpoints:**

```typescript
// https://www.elastic.co/guide/en/kibana/current/cases-api-add-comment.html
addCommentToCase(caseId: string, commentInput: CommentInput): Promise<Case> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-create.html
createCase(caseInput: CaseInput): Promise<Case> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-delete-cases.html
deleteCases(caseIds: string[]): Promise<boolean> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-delete-comments.html
deleteCommentFromCase(caseId: string, commentId: string): Promise<boolean> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-delete-comments.html
deleteAllCommentsFromCase(caseId: string): Promise<boolean> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-alerts.html
getCaseAlerts(caseId: string): Promise<Alert[]> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-case.html
getCase(caseId: string, includeComments: boolean = true): Promise<Case> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-status.html
getCaseStatus(caseId: string, owners?: OwnerType[]): Promise<CaseStatus> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-cases-by-alert.html
getCasesByAlert(alertId: string, owners?: OwnerType[]): Promise<CaseStatus> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-comments.html
getCaseComment(caseId: string, commentId: string): Promise<Comment> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-comments.html
getReporters(owners?: OwnerType[]): Promise<User[]> {}

// https://www.elastic.co/guide/en/kibana/current/cases-api-get-tag.html
getTags(owners?: OwnerType[]): Promise<string[]> {}
```

### Examples :

```typescript

// Setup client configuration :
const config: KibanaConfig = new KibanaConfig("http://localhost:5601", "elastic", "elastic", "default");
const client: KibanaClient = new KibanaClient(config);

// Exemple case :
const newCase: CaseInput = {
	assignees: [],
	connector: {
		fields: null,
		id: "none",
		name: "none",
		type: ConnectorType.NONE
	},
	description: "No description",
	owner: OwnerType.SECURITY_SOLUTION,
	settings: {
		syncAlerts: true
	},
	severity: Severity.HIGH,
	tags: ["example_tag"],
	title: "Case Title"
};

// Create new case:
await client.createCase(newCase).then(async value => {

	// Delete the case:
	const caseId = value.id;
	await client.deleteCases([case_id]).then((r: boolean) = {
		console.log(`Delete case ${case_id}`);
	}).catch(e => console.log(e));
}).catch(e => console.log(e));
```