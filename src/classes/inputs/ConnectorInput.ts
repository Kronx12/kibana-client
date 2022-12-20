import { ConnectorType } from "../../enums/ConnectorType";

export class ConnectorInput {
    fields?: Array<string> | null;
    id!: string;
    name!: string;
    type!: ConnectorType;
}