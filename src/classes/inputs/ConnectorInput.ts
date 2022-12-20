import { ConnectorType } from "../../enums/ConnectorType";

export class ConnectorInput {
    fields?: string[] | null;
    id!: string;
    name!: string;
    type!: ConnectorType;
}