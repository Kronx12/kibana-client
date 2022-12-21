import { ConnectorType } from "../enums/ConnectorType";

export class CaseConnector {
    id!: string;
    name!: string;
    type!: ConnectorType;
    fields!: {
        issueType: string; // TODO Enum ?
        parent: any; // TODO Class / Connector ?
        priority: string; // TODO Enum ?
    } | null
}
