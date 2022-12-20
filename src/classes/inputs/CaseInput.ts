import { OwnerType } from "../../enums/OwnerType";
import { Severity } from "../../enums/Severity";
import { ConnectorInput } from "./ConnectorInput";
import { SettingsInput } from "./SettingsInput";

export class CaseInput {
    assignees: string[] = [];
    connector!: ConnectorInput;
    description!: string;
    owner!: OwnerType;
    settings!: SettingsInput;
    severity?: Severity;
    tags: string[] = [];
    title!: string;
}