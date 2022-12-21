import { ConnectorType } from "../enums/ConnectorType";

export class Connector {
    id?: string;
    actionTypeId?: ConnectorType;
    name?: string;
    isMissingSecrets?: boolean;
    config?: {
        apiUrl?: string;
        projectKey?: string;
    };
    isPreconfigured?: boolean;
    isDeprecated?: boolean;
    referencedByCount?: number;
}
